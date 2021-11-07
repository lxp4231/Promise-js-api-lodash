class Promise {
  constructor(executor) {
    this.status = 'pending'
    this.data = null
    this.resolvedCallbacks = []
    this.rejectedCallbacks = []

    const resolve = value => {
      setTimeout(() => {
        if (this.status == 'pending') {
          this.status = 'fulfilled'
          this.data = value
          for (var onResolved of this.resolvedCallbacks) {
            onResolved(this.data)
          }
        }
      })
    }

    const reject = reason => {
      setTimeout(() => {
        if (this.status == 'pending') {
          this.status = 'rejected'
          this.data = reason
          for (var onRejected of this.rejectedCallbacks) {
            onRejected(this.data)
          }
        }
      })
    }

    try {
      executor(resolve, reject)
    } catch(e) {
      reject(e)
    }

  }

  then(onResolved, onRejected) {
    if (typeof onResolved != 'function') {
      onResolved = value => value
    }
    if (typeof onRejected != 'function') {
      onRejected = reason => {throw reason}
    }

    var dfd = {}
    dfd.promise = new Promise((resolve, reject) => {
      dfd.resolve = resolve
      dfd.reject = reject
    })

    if (this.status == 'pending') {
      this.resolvedCallbacks.push(value => {
        try {
          var x = onResolved(value)
          ResolvePromise(dfd.promise, x, dfd.resolve, dfd.reject)
        } catch(e) {
          dfd.reject(e)
        }
      })
      this.rejectedCallbacks.push(reason => {
        try {
          var x = onRejected(reason)
          ResolvePromise(dfd.promise, x, dfd.resolve, dfd.reject)
        } catch(e) {
          dfd.reject(e)
        }
      })
    } else {
      if (this.status == 'fulfilled') {
        setTimeout(() => {
          try {
            var x = onResolved(this.data)
            ResolvePromise(dfd.promise, x, dfd.resolve, dfd.reject)
          } catch(e) {
            dfd.reject(e)
          }
        })
      }
      if (this.status == 'rejected') {
        setTimeout(() => {
          try {
            var x = onRejected(this.data)
            ResolvePromise(dfd.promise, x, dfd.resolve, dfd.reject)
          } catch(e) {
            dfd.reject(e)
          }
        })
      }
    }

    return dfd.promise
  }
}

function ResolvePromise(promise2, x, resolve, reject) {
  var then
  var thenCalledOrThrow = false

  if (promise2 === x) { // 对应标准2.3.1节
    return reject(new TypeError('Chaining cycle detected for promise!'))
  }

  if (x instanceof Promise) { // 对应标准2.3.2节
    // 如果x的状态还没有确定，那么它是有可能被一个thenable决定最终状态和值的
    // 所以这里需要做一下处理，而不能一概的以为它会被一个“正常”的值resolve
    if (x.status === 'pending') {
      x.then(function(value) {
        ResolvePromise(promise2, value, resolve, reject)
      }, reject)
    } else { // 但如果这个Promise的状态已经确定了，那么它肯定有一个“正常”的值，而不是一个thenable，所以这里直接取它的状态
      x.then(resolve, reject)
    }
    return
  }

  if ((x !== null) && ((typeof x === 'object') || (typeof x === 'function'))) { // 2.3.3
    try {

      // 2.3.3.1 因为x.then有可能是一个getter，这种情况下多次读取就有可能产生副作用
      // 即要判断它的类型，又要调用它，这就是两次读取
      then = x.then
      if (typeof then === 'function') { // 2.3.3.3
        then.call(x, function rs(y) { // 2.3.3.3.1
          if (thenCalledOrThrow) return // 2.3.3.3.3 即这三处谁选执行就以谁的结果为准
          thenCalledOrThrow = true
          return ResolvePromise(promise2, y, resolve, reject) // 2.3.3.3.1
        }, function rj(r) { // 2.3.3.3.2
          if (thenCalledOrThrow) return // 2.3.3.3.3 即这三处谁选执行就以谁的结果为准
          thenCalledOrThrow = true
          return reject(r)
        })
      } else { // 2.3.3.4
        resolve(x)
      }
    } catch (e) { // 2.3.3.2
      if (thenCalledOrThrow) return // 2.3.3.3.3 即这三处谁选执行就以谁的结果为准
      thenCalledOrThrow = true
      return reject(e)
    }
  } else { // 2.3.4
    resolve(x)
  }
}

function ResolvePromise2(promise, x, resolve, reject) {
  if (x === promise) {
    reject(new TypeError('cycle'))
    return
  }

  if (x instanceof Promise) {
    x.then(resolve, reject)
    return
  }

  if ((x && typeof x == 'object' || typeof x == 'function')) {
    try {
      var then = x.then
      if (typeof then === 'function') {
          then.call(x, y => {
            ResolvePromise(promise, y, resolve, reject)
          }, reason => {
            reject(reason)
          })
        } else {
          resolve(x)
        }
    } catch(e) {
      reject(e)
    }
  } else {
    resolve(x)
  }
}

exports.resolve = function (value) {
  return new Promise(resolve => {
    resolve(value)
  })
}
exports.reject = function (value) {
  return new Promise((_, reject) => {
    reject(value)
  })
}
exports.deferred = function () {
  var dfd = {}
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}
