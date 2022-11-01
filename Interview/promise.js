// 假设请求API为
function request(params) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(params), 1000);
  });
}

// 最多处理3个请求的调度器
function Scheduler (limit = 3) {
  const pending = []
  let count = 0
  const run = () => {
    if (!pending.length || count >= limit) return
    const [param, resolve, reject] = pending.shift()
    count++
    request(param).then(resolve).catch(reject).finally(() => {
      count--
      run()
    })
  }
  return (param) => {
    return new Promise((resolve, reject) => {
      pending.push([param, resolve, reject])
      run()
    })
  }
};

const createPromise = Scheduler();
createPromise(1).then((res) => console.log(res));
createPromise(2).then((res) => console.log(res));
createPromise(3).then((res) => console.log(res));
createPromise(4).then((res) => console.log(res));
createPromise(5).then((res) => console.log(res));

// 预期，等1秒后输出1 2 3 ，再等一秒输出4 5

function Scheduler2 (params, limit) {
  let results = []
  let sequence  = [...params]
  const promises = sequence.splice(0, limit).map((param, idx) => {
    return request(param).then(res => {
      console.log(res)
      results[idx] = res
      return idx
    })
  })
  return sequence.reduce((p, cur, idx) => {
    return p.then(() =>  Promise.race(promises)).then(lastIdx => {
      promises[lastIdx] = request(cur).then(res => {
        console.log(res)
        results[idx + limit] = res
        return lastIdx
      })
    }).catch(err => {
      reject(err)
    })
  }, Promise.resolve()).then(() => {
    return Promise.all(promises)
  }).then(() => {
    return results
  })
}
Scheduler2([1, 2, 3, 4, 5], 3).then(res => {
  console.log(res)
})

class Scheduler3 {
  limit = 2
  runningTasks = []
  waitTasks = []
  constructor(limit = 2) {
    this.limit = limit
  }
  add (promiseCreator) { 
    if (this.runningTasks.length >= this.limit) {
      this.waitTasks.push(promiseCreator)
    } else {
      this.run(promiseCreator)
    }
  }
  run (promiseCreator) {
    const idx = this.runningTasks.push(promiseCreator)
    promiseCreator().then(res => {
      this.runningTasks.splice(idx, 1)
      if (this.waitTasks.length) {
        this.run(this.waitTasks.shift())
      }
    })
  }
}
   
const timeout = time => new Promise(resolve => {
  setTimeout(resolve, time);
})
  
const scheduler = new Scheduler3();
  
const addTask = (time,order) => {
  scheduler.add(() => timeout(time).then(()=>console.log(order)))
}

addTask(1000, '1');
addTask(500, '2');
addTask(300, '3');
addTask(400, '4');

// output: 2 3 1 4

// ### 使用Promise实现每隔1秒输出1,2,3

[1, 2, 3].reduce((p, cur) => {
  return p.then(() => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(console.log(cur)), 1000)
    })
  })
}, Promise.resolve())

// 8.2 使用Promise实现红绿灯交替重复亮

function red () {
  console.log('red')
}
function yellow () {
  console.log('yellow')
}
function green () {
  console.log('green')
}

function light (cb, time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cb())
    }, time)
  })
}

function step () {
  light(red, 3000).then(() => light(yellow, 2000)).then(() => light(green, 1000)).then(() => {
    step()
  })
}
step()

// 实现mergePromise函数
const time = (timer) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, timer)
  })
}
const ajax1 = () => time(2000).then(() => {
  console.log(1);
  return 1
})
const ajax2 = () => time(1000).then(() => {
  console.log(2);
  return 2
})
const ajax3 = () => time(1000).then(() => {
  console.log(3);
  return 3
})

function mergePromise (promises) {
  let results = []
  // 在这里写代码
  return promises.reduce((p, cur) => {
    return p.then(cur).then(res => {
      results.push(res)
      return results
    })
  }, Promise.resolve())
}

mergePromise([ajax1, ajax2, ajax3]).then(data => {
  console.log("done");
  console.log(data); // data 为 [1, 2, 3]
});

// 要求分别输出
// 1
// 2
// 3
// done
// [1, 2, 3]

// 实现一个promiseTimeout，第一个参数为promise第二参数number类型
// 1. 若promise在第二个参数给定的时间内处于pending状态，则返回一个rejected的promise，其peason为new Error('promise time out')
// 2. 若promise在第二个参数给定的时间内处于非pending状态，则返回该promise
function promiseTimeout (promise, time) {
  const timeout = (time) => new Promise((r, reject) => setTimeout(reject, time, new Error('promise time out')))
  return Promise.race([promise, timeout(time)])
}
const promise = (time) => new Promise((r) => {
  setTimeout(() => {
    r('success')
  }, time)
})
promiseTimeout(promise(500), 300).then(res => {
  console.log(res)
})