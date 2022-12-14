const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
class MyPromise {
  status = PENDING
  value = null
  reason = null
  // 存储成功回调函数
  onFulfilledCallbacks = []
  // 存储失败回调函数
  onRejectedCallbacks = []
  constructor(executor) {
    // executor 是一个执行器，进入会立即执行
    // 并传入resolve和reject方法
    try {
      executor(this.resolve, this.reject)
    } catch (error) {
      // 如果有错误，就直接执行 reject
      this.reject(error)
    }
  }
  // 为啥要用箭头函数 看这里的注意https://es6.ruanyifeng.com/#docs/class#%E6%B3%A8%E6%84%8F%E7%82%B9
  resolve = (value) => {
    if (this.status === PENDING) {
      this.status = FULFILLED
      this.value = value
      // resolve里面将所有成功的回调拿出来执行
      while (this.onFulfilledCallbacks.length) {
        // Array.shift() 取出数组第一个元素，然后（）调用，shift不是纯函数，取出后，数组将失去该元素，直到数组为空
        this.onFulfilledCallbacks.shift()(value)
      }
    }
  }
  reject = (reason) => {
    if (this.status === PENDING) {
      this.status = REJECTED
      this.reason = reason
      while (this.onRejectedCallbacks.length) {
        this.onRejectedCallbacks.shift()(reason)
      }
    }
  }
  then(onFulfilled, onRejected) {
    // 如果不传，就使用默认函数
    onFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : (value) => value
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (reason) => {
            throw reason
          }
    const promise2 = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        // 创建一个微任务等待 promise2 完成初始化
        queueMicrotask(() => {
          try {
            const x = onFulfilled(this.value)
            // 传入 resolvePromise 集中处理
            this.resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      } else if (this.status === REJECTED) {
        queueMicrotask(() => {
          try {
            const x = onRejected(this.reason)
            this.resolvePromise(promise2, x, resovle, reject)
          } catch (error) {
            reject(error)
          }
        })
      } else if (this.status === PENDING) {
        // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
        // 等到执行成功失败函数的时候再传递
        this.onFulfilledCallbacks.push(() => {
          queueMicrotask(() => {
            try {
              const x = onFulfilled(this.value)
              this.resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          })
        })
        this.onRejectedCallbacks.push(() => {
          queueMicrotask(() => {
            try {
              const x = onRejected(this.reason)
              this.resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          })
        })
      }
    })
    return promise2
  }
  catch(onRejected) {
    this.then(null, onRejected)
  }
  finally(callback) {
    return this.then(
      (value) => MyPromise.resolve(callback()).then(() => value),
      (reason) =>
        MyPromise.resolve(callback()).then(() => {
          throw reason
        })
    )
  }
  resolvePromise(promise2, x, resolve, reject) {
    // 如果相等了，说明return的是自己，抛出类型错误并返回
    if (promise2 === x) {
      return reject(
        new TypeError('Chaining cycle detected for promise #<Promise>')
      )
    }
    // 判断x是不是 MyPromise 实例对象
    if (x instanceof this.constructor) {
      // 执行 x，调用 then 方法，目的是将其状态变为 fulfilled 或者 rejected
      // x.then(value => resolve(value), reason => reject(reason))
      // 简化之后
      x.then(resolve, reject)
    } else {
      // 普通值
      resolve(x)
    }
  }
  // resolve 静态方法
  static resolve(parameter) {
    // 如果传入 MyPromise 就直接返回
    if (parameter instanceof MyPromise) {
      return parameter
    }

    // 转成常规方式
    return new MyPromise((resolve) => {
      resolve(parameter)
    })
  }

  // reject 静态方法
  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason)
    })
  }
  static all(promises) {
    return new MyPromise((resovle, reject) => {
      promises = Array.isArray(promises) ? promises : []
      let len = promises.length
      let res = []
      if (len === 0) resolve(res)
      let idx = 0
      for (let i = 0; i < len; i++) {
        promises[i].then(
          (value) => {
            res[i] = value
            idx++
            if (idx === len) {
              resovle(res)
            }
          },
          (reason) => {
            reject(reason)
          }
        )
      }
    })
  }
  static race(promises) {
    return new MyPromise((resolve, reject) => {
      promises = Array.isArray(promises) ? promises : []
      let len = promises.length
      for (let i = 0; i < len; i++) {
        promises[i].then(
          (value) => {
            resolve(value)
          },
          (reason) => {
            reject(reason)
          }
        )
      }
    })
  }
  static allSettled(promises) {
    return new MyPromise((resolve, reject) => {
      promises = Array.isArray(promises) ? promises : []
      let len = promises.length
      let res = []
      function compute() {
        if (--len === 0) {
          resolve(res)
        }
      }
      function resolvePromise(index, promise) {
        if (promise instanceof MyPromise) {
          promise.then(
            (value) => {
              res[index] = { status: 'fulfilled', value }
              compute()
            },
            (reason) => {
              res[index] = { status: 'rejected', reason }
              compute()
            }
          )
        } else {
          res[index] = { status: 'fulfilled', value: promise }
          compute()
        }
      }
      for (let i = 0; i < len; i++) {
        resolvePromise(i, promises[i])
      }
    })
  }
  static any(promises) {
    return new MyPromise((resolve, reject) => {
      promises = Array.isArray(promises) ? promises : []
      let len = promises.length
      let errs = []
      if (len === 0)
        return reject(new AggregateError('All promises were rejected'))
      for (let i = 0; i < len; i++) {
        promises[i].then(
          (value) => {
            resolve(value)
          },
          (reason) => {
            len--
            errs.push(reason)
            if (len === 0) reject(new AggregateError(errs))
          }
        )
      }
    })
  }
}

let p1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    // reject(4)
    resolve(1)
  }, 500)
})
let p2 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    // reject(3)
    resolve(2)
  }, 1000)
})

MyPromise.all([p1, p2])
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })

MyPromise.any([p1, p2])
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err.errors)
  })

MyPromise.allSettled([p1, p2]).then((res) => {
  console.log(res)
})
