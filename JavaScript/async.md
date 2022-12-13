### 实现原理
就是将Generator函数和自动执行器，包装在一个函数里
```js
async function fn(args) {
  // ...
}
// 等同于
function fn(args) {
  return spawn(function* () {
    // ...
  })
}

function spawn(genF) {
  return new Promise((resolve, reject) => {
    const gen = genF()
    function step(nextF) {
      let next
      try {
        next = nextF()
      } catch(e) {
        return reject(e)
      }
      if (next.done) {
        return resolve(next.value)
      }
      Promise.resolve(next.value).then((res) => {
        step(() => gen.next(res))
      }, (err) => {
        step(() => gen.throw(err))
      })
    }
    step(() => gen.next(undefined))
  })
}
```
