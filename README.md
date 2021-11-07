## 1.JS部分手写实现

### Map

```javascript
function MyMap() {
  this._keys = []
  this._values = []
}

MyMap.prototype.forEach = function (iterator) {
  for (var i = 0; i < this._keys.length; i++) {
    var val = this._values[i]
    var key = this._keys[i]
    iterator(val, key)
  }
}

// 获取一个key在_keys中的下标，需要正确处理NaN
MyMap.prototype._keyIndex = function (key) {
  if (key !== key) {
    // 当key是NaN时
    return this._keys.findIndex(it => it !== it)
  } else {
    return this._keys.indexOf(key)
  }
}

MyMap.prototype.set = function (key, value) {
  if (this.has(key)) {
    // 如果映射的key已经存在
    var idx = this._keyIndex(key)
    this._values[idx] = value
  } else {
    // 映射的key不存在
    this._keys.push(key)
    this._values.push(value)
  }
  return this
}

MyMap.prototype.get = function (key) {
  var idx = this._keyIndex(key)
  if (idx >= 0) {
    return this._values[idx]
  }
}
MyMap.prototype.has = function (key) {
  return this._keys.includes(key)
}

MyMap.prototype.delete = function (key) {
  var idx = this._keyIndex(key)
  if (idx >= 0) {
    this._keys.splice(idx, 1)
    this._values.splice(idx, 1)
    return true
  }
  return false
}
MyMap.prototype.clear = function () {
  this._keys.length = 0
  this._values.length = 0
}

Object.defineProperty(MyMap.prototype, "size", {
  get: function () {
    return this._keys.length
  },
})

var ele = new MyMap()
ele.set(2, 2)
ele.set(3, 5)
ele.set(4, 6)
ele.forEach((it, key) => {
  console.log(key)
})
console.log(ele.has(2))

```

### set

```js
function MySet(inits) {
  this.elements = []
  for (var i = 0; i < inits.length; i++) {
    this.add(inits[i])
  }
}
MySet.prototype = {
  constructor: MySet,
  add: function (val) {
    if (!this.has(val)) {
      this.elements.push(val)
    }
    return this
  },
  delete: function (val) {
    if (val !== val) {
      var idx = this.elements.findIndex(it => it !== it)
      if (idx >= 0) {
        this.elements.splice(idx, 1)
        return true
      }
      return false
    }
    var idx = this.elements.indexOf(val)
    if (idx >= 0) {
      this.elements.splice(idx, 1)
      return true
    }
    return false
  },
  has: function (val) {
    return this.elements.includes(val)
  },
  clear: function () {
    this.elements = []
  },
  get size() {
    return this.elements.length
  },
}
```

### set(class类实现)

```js
class MySet {
  constructor(init) {
    this.arr = []
    for (var i = 0; i < init.length; i++) {
      this.add(init[i])
    }
  }
  add(val) {
    if (!this.has(val)) {
      this.arr.push(val)
    }
    return this
  }
  delete(val) {
    if (val != val) {
      var index = this.element.findIndex(it => it !== it)
      if (index >= 0) {
        this.element.splice(index, 1)
        return true
      } else {
        return false
      }
    } else {
      var index = this.element.indexOf(val)
      if (index >= 0) {
        this.element.splice(index, 1)
        return true
      } else {
        return false
      }
    }
  }
  has(val) {
    return this.arr.includes(val)
  }
  clear() {
    this.arr = []
  }
  size() {
    return this.arr.length
  }
}
var ele = new MySet([1, 2, 5, 6, 8, 8, 8])
ele.add(2)
console.log(ele)
```

### filter

```js
Array.prototype._filter = function (fn) {
  let arr = []
  for (let i = 0; i < this.length; i++) {
    fn(this[i]) && arr.push(this[i])
  }
  return arr
}
let arr = [2, 3, 4, 5, 6]
console.log(
  arr._filter(function (it, index, self) {
    return it > 2
  })
)
```

### every

```js
Array.prototype._every = function (fn) {
  for (let i = 0; i < this.length; i++) {
    if (!fn(this[i])) {
      return false
    }
  }
  return true
}
let arr = [2, 3, 4, 5, 6]
console.log(
  arr._every(function (it, index, self) {
    return it > 1
  })
)
```

### some

```js
Array.prototype._some = function (fn) {
  for (let i = 0; i < this.length; i++) {
    if (fn(this[i])) {
      return true
    }
  }
  return false
}
let arr = [2, 3, 4, 5, 6]
console.log(
  arr._some(function (it, index, self) {
    return it < 1
  })
)
```

### find

```js
Array.prototype._find = function (fn) {
  // for (let i = 0; i < this.length; i++) {
  //     if (fn(this[i])) {
  //         return this[i]
  //     }
  // }
  // return undefined
  Array.prototype.find = function (fn) {
    for (let i = 0; i < this.length; i++) {
      if (fn(this[i])) return this[i]
    }
  }
}
let arr = [2, 3, 4, 5, 6]
console.log(
  arr._find(function (it, index, self) {
    return it < 1
  })
)
```

### forEach

```js
Array.prototype_forEach = function (fn) {
  for (let i = 0; i < this.length; i++) {
    fn(this[i], i, this)
  }
}
let arr = [2, 3, 4, 5, 6]
arr.forEach(it => {
  console.log(it)
})
```

### reduce

```js
Array.prototype._reduce = function (fn, prev) {
  for (let i = 0; i < this.length; i++) {
    //如果prev未传初始值，默认第一个元素
    if (typeof prev === "undefined") {
      prev = fn(this[i], this[i + 1], i, this)
      i++
      // console.log(i);
    } else {
      // console.log(i);
      prev = fn(prev, this[i], i, this)
    }
  }
  return prev
}
let arr = [2, 3, 4, 5, 6]
console.log(
  arr._reduce((a, b) => {
    return a + b
  })
)
```

### instanceof

```js
function instance_of(lhs, rhs) {
  while (lhs) {
    lhs = lhs.__proto__
    if (lhs === rhs.prototype) return true
  }
  return false
}
let a = {}
console.log(instance_of(a, Object))
```

### Object.creat

```js
Object.prototype._creat = function (proto) {
  function Fn() {}
  Fn.prototype = proto
  Fn.prototype.constructor = Fn
  return new Fn()
}
let a = {
  name: "qwe",
}
let aa = Object._creat(a)
console.log(aa.name)
```

### call

```js
Function.prototype.call2 = function (context, ...args) {
  // context:obj
  context = context === undefined || context === null ? window : context
  context.__fn = this
  //通过隐式绑定的方式调用函数
  let result = context.__fn(...args)
  //删除添加的属性
  delete context.__fn
  //返回函数调用的返回值
  return result
}
```

### apply

```js
Function.prototype.apply2 = function (context, args) {
  context = context === undefined || context === null ? window : context
  context.__fn = this
  let result = context.__fn(...args)
  delete context.__fn
  return result
}
```

### bind

```js
Function.prototype.bind2 = function (context, ...args1) {
  context = context === undefined || context === null ? window : context
  let _this = this
  return function (...args2) {
    context.__fn = _this
    let result = context.__fn(...[...args1, ...args2])
    delete context.__fn
    return result
  }
}
var year = 2021
function getDate(month, day, time) {
  return this.year + "-" + month + "-" + day
}
let obj = {
  year: 2022,
}
console.log(getDate.call2(obj, 3, 20))
```

### new 实现

```javascript
//法1
function myNew() {
  let obj = new Object() //
  let Constructor = [].shift.call(arguments)
  let result = Constructor.apply(obj, arguments)
  obj.__proto__ = Constructor.prototype
  return typeof result === "object" ? result : obj
}

//法2
function objectFactory(fn, ...args) {
  if (typeof fn !== "function") {
    throw "第一个参数必须是函数"
  }
  // 创建一个对象
  const obj = {}
  // 让该对象可以访问构造函数原型链上的属性
  obj.__proto__ = fn.prototype
  // 获取构造函数运行返回的结果
  console.log(constructor)
  let res = fn.apply(obj, args)
  // 当res为引用类型（复杂对象）则直接返回该结果; 否则返回obj，也就是构造函数中的this
  return typeof res === "object" ? res || obj : obj
}
```

### 深拷贝

```js
 var obj = {
            id: 1,
            name: 'andy',
            msg: {
                age: 18
            },
            color: ['pink', 'red']
        };
        var o = {};
        // 封装函数 
        function deepCopy(newobj, oldobj) {
            for (var k in oldobj) {
                // 判断我们的属性值属于那种数据类型
                // 1. 获取属性值  oldobj[k]
                var item = oldobj[k];
                // 2. 判断这个值是否是数组
                if (item instanceof Array) {
                    newobj[k] = [];
                    deepCopy(newobj[k], item)
                } else if (item instanceof Object) {
                    // 3. 判断这个值是否是对象
                    newobj[k] = {};
                    deepCopy(newobj[k], item)
                } else {
                    // 4. 属于简单数据类型
                    newobj[k] = item;
                }

            }
        }
        deepCopy(o, obj);
        // console.log(o);
```

### 继承(ES6)

```js
  继承(ES6)
        class Phone {
            constructor(brand, price) {
                this.brand = brand
                this.price = price
            }
            _call() {
                console.log('I am father');
            }
        }

        class Smartphone extends Phone {
            constructor(brand, price, color, size) {
                super(brand, price)
                this.color = color
                this.size = size
            }
            _sing() {
                console.log('I can sing');
            }
            _call() {
                console.log('I am son');
            }
            get _price() {
                console.log('获取了this属性');
            }
            set playgame(n) {
                console.log('设置了this属性');
            }
        }
        let xiaomi = new Smartphone('xiaomi', 1999, '黑色', 6.0)
        xiaomi.playgame = 'red'
        xiaomi._price

```

### Promise 封装Ajax

```js
promise实现
        function sendAjax(url) {
            return new Promise(function(resolve, reject) {
                //创建XMLHttpReauest对象
                let xhr = new XMLHttpRequest()
                    //初始化
                xhr.open('GET', url) // true异步，false同步
                    //发送请求
                xhr.send()
                    //绑定事件，处理响应结果
                xhr.onreadystatechange = function() {
                    if (xhr.readystate === 4) {
                        if (xhr.status >= 200 && xhr.status < 300) {
                            //成功
                            resolve(xhr.response);
                        } else {
                            reject(xhr.status);
                        }
                    }
                }

            })
        }
        //测试
        sendAjax("https://api.apiopen.top/getJoke").then(function(value) {
            console.log(value)
        }, function(reason) {
            console.log(reason);
        })

```

## 2.Promise实现 

```js
var Promise = (function() {
  function Promise(resolver) {
    if (typeof resolver !== 'function') {
      throw new TypeError('Promise resolver ' + resolver + ' is not a function')
    }
    if (!(this instanceof Promise)) return new Promise(resolver)

    var self = this
    self.callbacks = []
    self.status = 'pending'

    function resolve(value) {
      setTimeout(function() {
        if (self.status !== 'pending') {
          return
        }
        self.status = 'resolved'
        self.data = value

        for (var i = 0; i < self.callbacks.length; i++) {
          self.callbacks[i].onResolved(value)
        }
      })
    }

    function reject(reason) {
      setTimeout(function(){
        if (self.status !== 'pending') {
          return
        }
        self.status = 'rejected'
        self.data = reason

        for (var i = 0; i < self.callbacks.length; i++) {
          self.callbacks[i].onRejected(reason)
        }
      })
    }

    try{
      resolver(resolve, reject)
    } catch(e) {
      reject(e)
    }
  }

  function resolvePromise(promise, x, resolve, reject) {
    var then
    var thenCalledOrThrow = false

    if (promise === x) {
      return reject(new TypeError('Chaining cycle detected for promise!'))
    }

    if ((x !== null) && ((typeof x === 'object') || (typeof x === 'function'))) {
      try {
        then = x.then
        if (typeof then === 'function') {
          then.call(x, function rs(y) {
            if (thenCalledOrThrow) return
            thenCalledOrThrow = true
            return resolvePromise(promise, y, resolve, reject)
          }, function rj(r) {
            if (thenCalledOrThrow) return
            thenCalledOrThrow = true
            return reject(r)
          })
        } else {
          return resolve(x)
        }
      } catch(e) {
        if (thenCalledOrThrow) return
        thenCalledOrThrow = true
        return reject(e)
      }
    } else {
      return resolve(x)
    }
  }

  Promise.prototype.then = function(onResolved, onRejected) {
    onResolved = typeof onResolved === 'function' ? onResolved : function(v){return v}
    onRejected = typeof onRejected === 'function' ? onRejected : function(r){throw r}
    var self = this
    var promise2

    if (self.status === 'resolved') {
      return promise2 = new Promise(function(resolve, reject) {
        setTimeout(function() {
          try {
            var x = onResolved(self.data)
            resolvePromise(promise2, x, resolve, reject)
          } catch(e) {
            return reject(e)
          }
        })
      })
    }

    if (self.status === 'rejected') {
      return promise2 = new Promise(function(resolve, reject) {
        setTimeout(function() {
          try {
            var x = onRejected(self.data)
            resolvePromise(promise2, x, resolve, reject)
          } catch(e) {
            return reject(e)
          }
        })
      })
    }

    if (self.status === 'pending') {
      return promise2 = new Promise(function(resolve, reject) {
        self.callbacks.push({
          onResolved: function(value) {
            try {
              var x = onResolved(value)
              resolvePromise(promise2, x, resolve, reject)
            } catch(e) {
              return reject(e)
            }
          },
          onRejected: function(reason) {
            try {
              var x = onRejected(reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch(e) {
              return reject(e)
            }
          }
        })
      })
    }
  }

  Promise.prototype.valueOf = function() {
    return this.data
  }

  Promise.prototype.catch = function(onRejected) {
    return this.then(null, onRejected)
  }

  Promise.prototype.finally = function(fn) {
    //所有的then调用是一起的，但是这个then里调用fn又异步了一次，所以它总是最后调用的。
    // 当然这里只能保证在已添加的函数里是最后一次，不过这也是必然。
    // 不过看起来比其它的实现要简单以及容易理解的多。
    // 貌似对finally的行为没有一个公认的定义，所以这个实现目前是跟Q保持一致，会返回一个新的Promise而不是原来那个。
    return this.then(function(v){
      setTimeout(fn)
      return v
    }, function(r){
      setTimeout(fn)
      throw r
    })
  }

  Promise.prototype.spread = function(fn, onRejected) {
    return this.then(function(values) {
      return fn.apply(null, values)
    }, onRejected)
  }

  Promise.prototype.inject = function(fn, onRejected) {
    return this.then(function(v) {
      return fn.apply(null, fn.toString().match(/\((.*?)\)/)[1].split(',').map(function(key){
        return v[key];
      }))
    }, onRejected)
  }

  Promise.prototype.delay = function(duration) {
    return this.then(function(value) {
      return new Promise(function(resolve, reject) {
        setTimeout(function() {
          resolve(value)
        }, duration)
      })
    }, function(reason) {
      return new Promise(function(resolve, reject) {
        setTimeout(function() {
          reject(reason)
        }, duration)
      })
    })
  }

  Promise.all = function(promises) {
    return new Promise(function(resolve, reject) {
      var resolvedCounter = 0
      var promiseNum = promises.length
      var resolvedValues = new Array(promiseNum)
      for (var i = 0; i < promiseNum; i++) {
        (function(i) {
          Promise.resolve(promises[i]).then(function(value) {
            resolvedCounter++
            resolvedValues[i] = value
            if (resolvedCounter == promiseNum) {
              return resolve(resolvedValues)
            }
          }, function(reason) {
            return reject(reason)
          })
        })(i)
      }
    })
  }

  Promise.race = function(promises) {
    return new Promise(function(resolve, reject) {
      for (var i = 0; i < promises.length; i++) {
        Promise.resolve(promises[i]).then(function(value) {
          return resolve(value)
        }, function(reason) {
          return reject(reason)
        })
      }
    })
  }

  Promise.resolve = function(value) {
    var promise = new Promise(function(resolve, reject) {
      resolvePromise(promise, value, resolve, reject)
    })
    return promise
  }

  Promise.reject = function(reason) {
    return new Promise(function(resolve, reject) {
      reject(reason)
    })
  }

  Promise.fcall = function(fn){
    // 虽然fn可以接收到上一层then里传来的参数，但是其实是undefined，所以跟没有是一样的，因为resolve没参数啊
    return Promise.resolve().then(fn)
  }

  Promise.done = Promise.stop = function(){
    return new Promise(function(){})
  }

  Promise.deferred = Promise.defer = function() {
    var dfd = {}
    dfd.promise = new Promise(function(resolve, reject) {
      dfd.resolve = resolve
      dfd.reject = reject
    })
    return dfd
  }

  try { // CommonJS compliance
    module.exports = Promise
  } catch(e) {}

  return Promise
})()

```

## 3.Lodash部分手写

```js
var lxp4231 = function() {
    function chunk(arr, n) {
        var newArr = []
        var temp = []
        var num = 0
        for (var i = 0; i < arr.length; i++) {
            num++
            temp.push(arr[i])
            if (num == n) {
                newArr.push(temp)
                temp = []
                num = 0
            }
        }
        if (arr.length % n != 0) {
            newArr.push(temp)
        }
        return newArr
    }

    function compact(array) {
        var arr = []
        for (var key of array) {
            if (key) {
                arr.push(key)
            }
        }
        return arr
    }

    function difference(arr, ...array) {
        var res = []
        var newArray = array.flat()
        for (var key of arr) {
            if (!newArray.includes(key)) {
                res.push(key)
            }
        }
        return res
    }

    function drop(array, n = 1) {
        array.splice(0, n)
        return array
    }

    function dropRight(array, n = 1) {
        if (n > array.length) return []
        else {
            array.splice(array.length - n, n)
        }
        return array
    }

    function fill(array, value, start = 0, end = array.length) {
        for (var i = start; i < end; i++) {
            array[i] = value
        }
        return array
    }

    function flatten(array) {
        var arr = []
        for (var i = 0; i < array.length; i++) {
            var temp = array[i]
            if (Array.isArray(temp)) {
                for (var j = 0; j < temp.length; j++) {
                    arr.push(temp[j])
                }
            } else {
                arr.push(temp)
            }
        }
        return arr
    }

    function flatttenDeep(array) {
        var arr = []
        for (var i = 0; i < array.length; i++) {
            var temp = array[i]
            if (Array.isArray(temp)) {
                temp = flatttenDeep(temp)
                for (var j = 0; j < temp.length; j++) {
                    arr.push(temp[j])
                }
            } else {
                arr.push(temp)
            }
        }
        return arr
    }

    function flattenDepth(array, n = 1) {
        var arr = []
        for (var i = 0; i < array.length; i++) {
            var temp = array[i]
            if (Array.isArray(temp)) {
                temp = flattenDepth(temp, n - 1)
                for (var j = 0; j < temp.length; j++) {
                    arr.push(temp[j])
                }
            } else {
                arr.push(temp)
            }
        }
        if (n == 0) return array
        return arr
    }

    function fromPairs(pairs) {
        var map = {}
        for (var i = 0; i < pairs.length; i++) {
            map[pairs[i][0]] = pairs[i][1]
        }
        return map
    }

    function head(array) {
        if (!array) return undefined
        else return array[0]
    }

    function nth(array, n) {
        if (n > 0) return array[n - 1]
        if (n < 0) {
            var m = Math.abs(n)
            return array[array.length - m]
        }
    }

    function pull(array, ...nums) {
        var res = []
        array.forEach(it => {
            if (!nums.includes(it)) {
                res.push(it)
            }
        })
        return res
    }

    function pullAll(array, nums) {
        var res = []
        array.forEach(it => {
            if (!nums.includes(it)) {
                res.push(it)
            }
        })
        return res
    }

    function sortedIndex(array, value) {
        var n = 0
        array.push(value)
        array.sort((a, b) => {
            return a - b
        })
        array.forEach((it, index) => {
            if (it == value) {
                n = index
            }
        })
        return n
    }
    //
    function sortedUniq(array) {
        var newArry = array.filter((it, index) => {
            return array.indexOf(it) == index
        })
        return newArry
    }
    //
    function union(...arrays) {
        var newArr = arrays.flat()
        return newArr.filter((it, index) => {
            return newArr.indexOf(it) == index
        })
    }
    //
    function uniq(array) {
        return array.filter((it, index) => {
            return array.indexOf(it) == index
        })
    }
    //
    function zip(...arr) {
        //
        var newarr = []
        var i = 0
        while (i < arr[0].length) {
            arr.forEach(it => {
                newarr.push(it[i])
            })
            i++
        }
        //
        function ToTwo(newarr, n) {
            let res = []
            for (let i = 0; i < newarr.length; i += n) {
                res.push(newarr.slice(i, i + n))
            }
            return res
        }
        return ToTwo(newarr, arr.length)
    }
    return {
        chunk: chunk,
        compact: compact,
        difference: difference,
        drop: drop,
        dropRight: dropRight,
        fill: fill,
        flatten: flatten,
        flatttenDeep: flatttenDeep,
        flattenDepth: flattenDepth,
        fromPairs: fromPairs,
        head: head,
        nth: nth,
        pull: pull,
        pullAll: pullAll,
        sortedIndex: sortedIndex,
        sortedUniq: sortedUniq,
        union: union,
        uniq: uniq,
        zip: zip
    }
}()
```



## 4.算法与数据结构部分手写

### 冒泡排序

```js
  var arry = [2, 0, 6, 1, 77, 0, 52, 25, 7];
        var temp;
        for (var i = 0; i < arry.length - 1; i++) { //外层i表示趟数
            for (var j = 0; j < arry.length - i - 1; j++) { //里层j表示比较次数
                if (arry[j + 1] < arry[j]) {
                    temp = arry[j];
                    arry[j] = arry[j + 1];
                    arry[j + 1] = temp;
                }
            }
        }
        console.log(arry);
```

###   插入排序

```js
  var arr = [2, 3,6, 5, 1, 8, 9, 7, 6]
        for (var i = 1; i < arr.length; i++) {
            var temp = arr[i] //i=3 t=5 j=2
            for (var j = i - 1; j >= 0; j--) {
                if (arr[j] > temp) {
                    arr[j + 1] = arr[j]
                } else {
                    break
                }
            }
            arr[j + 1] = temp  //5
        }
        console.log(arr);
```

###   归并排序

```js
  //递归
        const mergeSort = arr => {
            if (arr.length < 2) return arr
            let mid = arr.length >> 1
            let leftArr = arr.slice(0, mid)
            let rightArr = arr.slice(mid)
            return merge(mergeSort(leftArr), mergeSort(rightArr))
        }

        // 合并
        const merge = (left, right) => {
            const res = []
            while (left.length && right.length) {
                if (left[0] <= right[0]) {
                    res.push(left.shift())
                } else {
                    res.push(right.shift())
                }
            }
            if (left.length) res.push(...left)
            if (right.length) res.push(...right)
            return res
        }
        console.log(mergeSort([3, 6, 100, 82, 8, 9, 6, 2, 4, 64, 23, 46, 8, 6, 8, 34]))

```

### 快速排序

```js
  const arr = [5, 2, 7, 8, 34, 7, 39, 12, 56, 9, 1]
         function quickSort(arr) {
             // 4.结束递归（当ary小于等于一项，则不用处理）
             if (arr.length <= 1) {
                 return arr
             }
            // 1. 找到数组的中间项，在原有的数组中把它移除
             const middleIndex = Math.floor(arr.length / 2)
             const middle = arr.splice(middleIndex, 1)[0]
                // 2. 准备左右两个数组，循环剩下数组中的每一项，比当前项小的放到左边数组中，反之放到右边数组中
             const leftArr = [],
                 rightArr = []
             for (let i = 0; i < arr.length; i++) {
                 const current = arr[i]
                 current < middle ? leftArr.push(current) : rightArr.push(current)

             }
             // 3. 递归方式让左右两边的数组持续这样处理，一直到左右两边都排好序为止。
             //（最后让左边+中间+右边拼接成最后的结果）
             return quickSort(leftArr).concat(middle, quickSort(rightArr))
         }

         console.log(bubbleSort(arr)) // [1, 2,  5,  7,  7, 8, 9, 12, 34, 39, 56]
```

### 希尔排序

```js

        function shellSort(array) { // 希尔排序
            let gap = Math.floor(array.length / 2); // 计算gap值

            while (1 <= gap) { // 当gap>=1 符合条件
                // 把距离为 gap 的元素编为一个组，扫描所有组
                for (let i = gap; i < array.length; i++) {
                    let j = 0;
                    let temp = array[i]; // 中间值

                    // 对距离为 gap 的元素组进行排序
                    //  j >= 0 是为了保证 后一个元素i在中间值gap位置之后
                    //  temp < array[j] 是为了判断 后一个值大于前一个值才进行换位置
                    for (j = i - gap; j >= 0 && temp < array[j]; j -= gap) {
                        array[j + gap] = array[j];
                    }
                    array[j + gap] = temp;
                }
                gap = Math.floor(gap / 2); // 减小增量
            }
            return array;
        }
```

### 二叉树

```js
二叉树 binary tree 的定义： 空 一个结点有两颗子树，子树分别也会二叉树 完全二叉树：
除最后两层以外，从上到下，从左到右所有的结点都有子结点 满二叉树：
除最后一层的所有结点都没有子结点（左右子树都为空），其它所有的结点都有两个非空子树
对于满二叉树来说，从上往下每层的结点数量加倍的，总结点数量一定是2的n次方减1
最顶层的结点为根结点（root node） 没有子结点（两个子结点都为空）的结点称为叶子结点（leaf
node） 在任意二叉树中，空子树的数量正比非空结点的数量多1
因为有n个结点的树，一定有2n个从结点伸出的指针
而除根结点以外每个结点都正好由一个指针指向，于是2n-n+1就得到指向空子树的指针数量
即为n+1，所以正好多1 二叉树的表示： 二叉链表： 类似链表，但每个结点都可以伸出两个指针
树组表示法：
将二叉的所有空点补满成为一颗满二叉树，然后从上往下从左往右将结点的值放入数组。
此种结构根结点在数组的第1项（下标0） 在下标n的结点的两个子结点的位置为2n+1和2n+2
下标为m的结点其父结点在floor( (m - 1) / 2 )位置
<script>
  function createTreeNode(val) {
    return {
      val: val,
      left: null,
      right: null,
    }
  }
  // 将存储在array中的根结点在rootIdx位置的二叉树转换为二叉链表
  function arrayToTree(array, rootIdx = 0) {
    var rootVal = array[rootIdx]
    if (rootVal == null) {
      return null
    }
    var rootNode = createTreeNode(rootVal)

    rootNode.left = arrayToTree(array, rootIdx * 2 + 1)
    rootNode.right = arrayToTree(array, rootIdx * 2 + 2)

    return rootNode
  }

  // 将使用二叉链表表示的二叉树存入ary中，其中根结点存入idx位置

  function treeToArray(root, idx = 0, ary = []) {
    if (root) {
      ary[idx] = root.val
      treeToArray(root.left, idx * 2 + 1, ary)
      treeToArray(root.right, idx * 2 + 2, ary)
    }
    return ary
  }
  function treeToCondensedArray(root) {
    if (!root) {
      return []
    }
    var nodes = [root]
    var result = []
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i]
      if (node) {
        result.push(node.val)
        nodes.push(node.left)
        nodes.push(node.right)
      } else {
        result.push(null)
      }
    }
    return result
  }

  function cArrayToTree(arr) {
    if (arr.length == 0) {
      return null
    }
    var root = createTreeNode(arr[0])

    var nodes = [root]

    for (var i = 1; i < arr.length; i++) {
      var node = nodes.shift()

      if (arr[i] == null) {
        node.left = null
      } else {
        node.left = createTreeNode(arr[i])
        nodes.push(node.left)
      }

      i++

      if (arr[i] == null) {
        node.right = null
      } else {
        node.right = createTreeNode(arr[i])
        nodes.push(node.right)
      }
    }
    return root
  }

  // [[null, 6, null], 5, [null, 8, [null, 5, null]]]

  // '2(4(1)(3))(9(5)(6))'

  function treeToKuoHao(tree) {
    if (tree) {
      if (!tree.left && !tree.right) {
        return "" + tree.val
      }
      return (
        tree.val + "(" + treeToKuoHao(tree.left) + ")(" + treeToKuoHao(tree.right) + ")"
      )
    } else {
      return ""
    }
  }

  function treeToHTML(tree) {
    var html = ""
    if (tree) {
      html += "<div>"
      html += '<header style="text-align:center">' + tree.val + "</header>"
      html += '<main style="display: flex;">'
      html += '<aside style="flex-grow:1;">' + treeToHTML(tree.left) + "</aside>"
      html += '<aside style="flex-grow:1;">' + treeToHTML(tree.right) + "</aside>"
      html += "</main>"
      html += "</div>"
    }
    return html
  }

  // 二叉树的遍历

  // 如果把一本书的章、节、小结一起排序
  // 按看过的顺序，则得到先序遍历序列
  // 按看完的顺序，则得到后序遍历序列
  // 按看了一部分的顺序，则得到中序遍历序列

  function preOrderTraverse(root, action) {
    if (root) {
      action(root.val)
      preOrderTraverse(root.left, action)
      preOrderTraverse(root.right, action)
    }
  }

  function inOrderTraverse(root, action) {
    if (root) {
      inOrderTraverse(root.left, action)
      action(root.val)
      inOrderTraverse(root.right, action)
    }
  }

  function postOrderTraverse(root, action) {
    if (root) {
      postOrderTraverse(root.left, action)
      postOrderTraverse(root.right, action)
      action(root.val)
    }
  }

  function printBinaryTree(tree) {
    var ary = printTree(tree)
    var str = ary
      .map(row => {
        return row
          .map(it => {
            if (it == "") {
              return " "
            }
            return it
          })
          .join("")
      })
      .join("\n")
    console.log(str)
  }

  /**
   * Definition for a binary tree node.
   * function TreeNode(val) {
   *     this.val = val;
   *     this.left = this.right = null;
   * }
   */
  /**
   * @param {TreeNode} root
   * @return {string[][]}
   */
  var printTree = function (root, width = 0) {
    function blank(n) {
      return Array(n).fill("")
    }
    if (!root) {
      return []
    }
    if (!root.left && !root.right) {
      return [[...blank(width >> 1), String(root.val), ...blank(width >> 1)]]
    }
    if (root.left) {
      var left = printTree(root.left, width >> 1)
    }
    if (root.right) {
      var right = printTree(root.right, width >> 1)
    }
    if (!root.left) {
      left = Array(right.length)
        .fill(0)
        .map(it => blank(right[0].length))
    }
    if (!root.right) {
      right = Array(left.length)
        .fill(0)
        .map(it => blank(left[0].length))
    }
    var sideWidth = Math.max(left[0].length, right[0].length) //半边的宽度
    var height = Math.max(left.length, right.length) //半边的高度

    if (left[0].length < sideWidth) {
      left = printTree(root.left, sideWidth)
      let padWidth = (sideWidth - left[0].length) / 2
      left.forEach(line => {
        line.push(...blank(padWidth))
        line.unshift(...blank(padWidth))
      })
    }

    if (right[0].length < sideWidth) {
      right = printTree(root.right, sideWidth)
      let padWidth = (sideWidth - right[0].length) / 2
      right.forEach(line => {
        line.push(...blank(padWidth))
        line.unshift(...blank(padWidth))
      })
    }

    if (left.length < height) {
      let padHeight = height - left.length
      left.push(
        ...Array(padHeight)
          .fill(0)
          .map(it => blank(sideWidth))
      )
    }

    if (right.length < height) {
      let padHeight = height - right.length
      right.push(
        ...Array(padHeight)
          .fill(0)
          .map(it => blank(sideWidth))
      )
    }

    var firstLine = blank(sideWidth * 2)
    firstLine.splice(sideWidth, 0, String(root.val))
    var result = [firstLine]

    for (var i = 0; i < height; i++) {
      result.push([...left[i], ...blank(1), ...right[i]])
    }
    return result
  }
</script>

```

### 堆与堆排序

```js
堆，Heap，又叫优先队列，Priority Queue，是一种数据结构
区别于堆内存与栈内存的“堆”，此堆非彼堆
堆内存的“堆”含义为杂乱无章，意指数据在堆内存区域是随机分布的。
数据构结构这个“堆”指一系列数据像麦子，稻谷那样堆起来，此“堆”意指有高低顺序的
即堆是一种有序的数据结构
堆是一颗完全二叉树，所以更合适直接用数组来存储，即下标在n的结点的两个子结点在2n+1和2n+2位置
堆中任何一个结点的值都比其两个子结点要大（最大堆）或小（最小堆）
堆是一个只关注堆中最值的数据结构，最大堆关注最大值，最小堆关注最小值

<script>
  class PriorityQueue {
    constructor(inits = [], predicate = it => it) {
      this.elements = []
      this.predicate = predicate
      if (inits.length) {
        this.elements.push(...inits) // = inits.slice();
        this.heapify()
      }
    }

    heapify() {
      for (var i = 0; i < this.elements.length; i++) {
        this.heapUp(i)
      }
      // for (var i = (this.elements.length - 1) >> 1; i >= 0; i--) {
      //   this.heapDown(i)
      // }
    }

    _swap(i, j) {
      var t = this.elements[i]
      this.elements[i] = this.elements[j]
      this.elements[j] = t
    }
    // 从idx位置开始向上调整
    heapUp(idx) {
      while (idx > 0) {
        var pIdx = (idx - 1) >> 1
        if (this.predicate(this.elements[idx]) > this.predicate(this.elements[pIdx])) {
          this._swap(idx, pIdx)
          idx = pIdx
        } else {
          return
        }
      }
    }
    heapUp2(idx) {
      if (idx > 0) {
        var pIdx = (idx - 1) >> 1
        if (this.elements[idx] > this.elements[pIdx]) {
          this._swap(idx, pIdx)
          this.heapUp2(pIdx)
        } else {
          return
        }
      }
    }
    // 从idx位置开始向下调整
    heapDown(idx) {
      var l = this.elements.length

      while (idx < l) {
        var maxIdx = idx
        var lIdx = maxIdx * 2 + 1
        var rIdx = maxIdx * 2 + 2

        if (
          lIdx < l &&
          this.predicate(this.elements[lIdx]) > this.predicate(this.elements[maxIdx])
        ) {
          maxIdx = lIdx
        }
        if (
          rIdx < l &&
          this.predicate(this.elements[rIdx]) > this.predicate(this.elements[maxIdx])
        ) {
          maxIdx = rIdx
        }

        if (maxIdx !== idx) {
          this._swap(maxIdx, idx)
          idx = maxIdx
        } else {
          return
        }
      }
    }
    // 往堆里增加一个元素
    push(val) {
      this.elements.push(val)
      this.heapUp(this.elements.length - 1)
      return this
    }
    // 将堆顶元素删除并返回
    pop() {
      var result = this.elements[0]
      this.elements[0] = this.elements.pop()
      this.heapDown(0)
      return result
    }
    // 查看堆顶元素，不删除它
    peek() {
      return this.elements[0]
    }
  }

  function heapSort(ary) {
    var pq = new PriorityQueue()
    for (var i = 0; i < ary.length; i++) {
      pq.push(ary[i])
    }
    for (var i = ary.length - 1; i >= 0; i--) {
      ary[i] = pq.pop()
    }
    return ary
  }

  function heapify(ary) {
    for (var i = (ary.length - 1) >> 1; i >= 0; i--) {
      heapDown(ary, i)
    }
  }
  function heapDown(ary, idx, end = ary.length) {
    var l = end

    while (idx < l) {
      var maxIdx = idx
      var lIdx = maxIdx * 2 + 1
      var rIdx = maxIdx * 2 + 2

      if (lIdx < l && ary[lIdx] > ary[maxIdx]) {
        maxIdx = lIdx
      }
      if (rIdx < l && ary[rIdx] > ary[maxIdx]) {
        maxIdx = rIdx
      }

      if (maxIdx !== idx) {
        swap(ary, maxIdx, idx)
        idx = maxIdx
      } else {
        return
      }
    }
  }

  function swap(ary, i, j) {
    var t = ary[i]
    ary[i] = ary[j]
    ary[j] = t
  }

  function heapSort2(ary) {
    heapify(ary)
    for (var i = ary.length - 1; i > 0; i--) {
      swap(ary, 0, i)
      heapDown(ary, 0, i) // 从根元素开始调整，只调整i以内的元素，不包含i
    }
    return ary
  }

  function isSorted(array) {
    for (var i = 0; i < array.length - 1; i++) {
      if (array[i] > array[i + 1]) {
        return false
      }
    }
    return true
  }

  // pq = new PriorityQueue(item => item.身高)
</script>

```

### 哈希表

```js
堆，Heap，又叫优先队列，Priority Queue，是一种数据结构
区别于堆内存与栈内存的“堆”，此堆非彼堆
堆内存的“堆”含义为杂乱无章，意指数据在堆内存区域是随机分布的。
数据构结构这个“堆”指一系列数据像麦子，稻谷那样堆起来，此“堆”意指有高低顺序的
即堆是一种有序的数据结构
堆是一颗完全二叉树，所以更合适直接用数组来存储，即下标在n的结点的两个子结点在2n+1和2n+2位置
堆中任何一个结点的值都比其两个子结点要大（最大堆）或小（最小堆）
堆是一个只关注堆中最值的数据结构，最大堆关注最大值，最小堆关注最小值

<script>
  class PriorityQueue {
    constructor(inits = [], predicate = it => it) {
      this.elements = []
      this.predicate = predicate
      if (inits.length) {
        this.elements.push(...inits) // = inits.slice();
        this.heapify()
      }
    }

    heapify() {
      for (var i = 0; i < this.elements.length; i++) {
        this.heapUp(i)
      }
      // for (var i = (this.elements.length - 1) >> 1; i >= 0; i--) {
      //   this.heapDown(i)
      // }
    }

    _swap(i, j) {
      var t = this.elements[i]
      this.elements[i] = this.elements[j]
      this.elements[j] = t
    }
    // 从idx位置开始向上调整
    heapUp(idx) {
      while (idx > 0) {
        var pIdx = (idx - 1) >> 1
        if (this.predicate(this.elements[idx]) > this.predicate(this.elements[pIdx])) {
          this._swap(idx, pIdx)
          idx = pIdx
        } else {
          return
        }
      }
    }
    heapUp2(idx) {
      if (idx > 0) {
        var pIdx = (idx - 1) >> 1
        if (this.elements[idx] > this.elements[pIdx]) {
          this._swap(idx, pIdx)
          this.heapUp2(pIdx)
        } else {
          return
        }
      }
    }
    // 从idx位置开始向下调整
    heapDown(idx) {
      var l = this.elements.length

      while (idx < l) {
        var maxIdx = idx
        var lIdx = maxIdx * 2 + 1
        var rIdx = maxIdx * 2 + 2

        if (
          lIdx < l &&
          this.predicate(this.elements[lIdx]) > this.predicate(this.elements[maxIdx])
        ) {
          maxIdx = lIdx
        }
        if (
          rIdx < l &&
          this.predicate(this.elements[rIdx]) > this.predicate(this.elements[maxIdx])
        ) {
          maxIdx = rIdx
        }

        if (maxIdx !== idx) {
          this._swap(maxIdx, idx)
          idx = maxIdx
        } else {
          return
        }
      }
    }
    // 往堆里增加一个元素
    push(val) {
      this.elements.push(val)
      this.heapUp(this.elements.length - 1)
      return this
    }
    // 将堆顶元素删除并返回
    pop() {
      var result = this.elements[0]
      this.elements[0] = this.elements.pop()
      this.heapDown(0)
      return result
    }
    // 查看堆顶元素，不删除它
    peek() {
      return this.elements[0]
    }
  }

  function heapSort(ary) {
    var pq = new PriorityQueue()
    for (var i = 0; i < ary.length; i++) {
      pq.push(ary[i])
    }
    for (var i = ary.length - 1; i >= 0; i--) {
      ary[i] = pq.pop()
    }
    return ary
  }

  function heapify(ary) {
    for (var i = (ary.length - 1) >> 1; i >= 0; i--) {
      heapDown(ary, i)
    }
  }
  function heapDown(ary, idx, end = ary.length) {
    var l = end

    while (idx < l) {
      var maxIdx = idx
      var lIdx = maxIdx * 2 + 1
      var rIdx = maxIdx * 2 + 2

      if (lIdx < l && ary[lIdx] > ary[maxIdx]) {
        maxIdx = lIdx
      }
      if (rIdx < l && ary[rIdx] > ary[maxIdx]) {
        maxIdx = rIdx
      }

      if (maxIdx !== idx) {
        swap(ary, maxIdx, idx)
        idx = maxIdx
      } else {
        return
      }
    }
  }

  function swap(ary, i, j) {
    var t = ary[i]
    ary[i] = ary[j]
    ary[j] = t
  }

  function heapSort2(ary) {
    heapify(ary)
    for (var i = ary.length - 1; i > 0; i--) {
      swap(ary, 0, i)
      heapDown(ary, 0, i) // 从根元素开始调整，只调整i以内的元素，不包含i
    }
    return ary
  }

  function isSorted(array) {
    for (var i = 0; i < array.length - 1; i++) {
      if (array[i] > array[i + 1]) {
        return false
      }
    }
    return true
  }

  // pq = new PriorityQueue(item => item.身高)
</script>

```

