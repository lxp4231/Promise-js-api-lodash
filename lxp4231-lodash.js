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
    //
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