const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  static = PENDING
  value = null
  reason = null
  onFulfilledCallbacks = []
  onRejectedCallbacks = []
  constructor(executor) {
    try {
      executor(this.resolve, this.reject)
    } catch (error) {
      this.reject(error)
    }
  }
  resolve = (value) => {
    if (this.static === PENDING) {
      this.static = FULFILLED;
      this.value = value;
      while (this.onFulfilledCallbacks.length > 0) {
        this.onFulfilledCallbacks.pop()(value);
      }
    }
  }
  reject = (reason) => {
    if (this.static === PENDING) {
      this.static = REJECTED;
      this.reason = reason
      while (this.onRejectedCallbacks.length > 0) {
        this.onRejectedCallbacks.pop()(reason)
      }
    }
  }
  then = (onFulfilled, onRejected) => {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
    onRejected = typeof onRejected === 'function' ? onRejected : (reason) => { throw reason }

    const promise2 = new MyPromise((resolve, reject) => {
      if (this.static === FULFILLED) {
        queueMicrotask(() => {
          try {
            const x = onFulfilled(this.value);
            this.resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      } else if (this.static === REJECTED) {
        queueMicrotask(() => {
          try {
            const x = onRejected(this.reason)
            this.resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      } else {
        this.onFulfilledCallbacks.push(() => {
          queueMicrotask(() => {
            try {
              const x = onFulfilled(this.value);
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
  resolvePromise (promise2, x, resolve, reject) {
    if (x === promise2) {
      throw Error('xunhuan')
    }

    if (x instanceof this.constuctor) {
      x.then(resolve, reject)
    } else {
      resolve(x)
    }
  }
  catch (onRejected) {
    this.then(null, onRejected)
  }
  finally (callback) {
    const P = this.constuctor
    return this.then((value) => P.resolve(callback).then(() => value), (reason) => P.reject(callback).then(() => {
      throw reason;
    }))
  }
  static resolve (parameter) {
    if (parameter instanceof MyPromise) {
      return parameter
    }
    return new MyPromise((resolve) => {
      resolve(parameter)
    })
  }
  static reject (parameter) {
    return new MyPromise((_, reject) => {
      reject(parameter)
    })
  }
  static all (promises) {
    return new MyPromise((resolve, reject) => {
      promises = Array.isArray(promises) ? promises : [];
      const len = promises.length;
      let res = []
      if (len === 0) return res;
      let idx = 0;
      for (let i = 0; i < len; i++) {
        promises[i].then(value => {
          res[i] = value;
          idx++;
          if (idx === len) {
            resolve(res)
            return
          }
        }, err => {
          reject(err)
          return 
        })
      }
    })
  }
  static race (promises) {
    return new MyPromise((resovle, reject) => {
      promises = Array.isArray(promises) ? promises : []
      const len = promises.length;
      for (let i = 0; i < len; i++) {
        promises[i].then(resovle, reject)
      }
    })
  }
  static allSettled (promises) {
    return new MyPromise((resolve, reject) => {
      promises = Array.isArray(promises) ? promises : []
      const len = promises.length;
      let res = []
      if (len === 0) return res;
      let idx = 0
      for (let i = 0; i < len; i++) {
        promises[i].then(value => {
          res[i] = {
            status: 'fufilled',
            value
          }
          idx++
          if (idx = len) {
            resolve(res)
          }
        }, err => {
          res[i] = {
            status: 'rejected',
            value: err
          }
          idx++
          if (idx = len) {
            resolve(res)
          }
        })
      }
    })
  }
}