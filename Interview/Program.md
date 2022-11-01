## 编程

### 实现一个节流函数？如果想要最后一次必须执行的话怎么实现
```js
const throttle = (fn, time, immediate = false) => {
  let timer = null, flag = true
  return (...args) => {
    if (flag) {
      immediate && fn.call(this, ...args)
      flag = false
      timer = setTimeout(() => {
        !immediate && fn.call(this, ...args)
        flag = true
      }, time)
    }
  }
}
function demo (n) {
  let num = 10000
  while(num--) {}
  console.log(n)
}
let n = 10
const fn = throttle(demo, 100)
while(n--){
  fn(n)
}
```

### 实现一个批量请求函数，能够限制并发量
```js
// 模拟请求
const request = (url) => {
  return new Promise((resolve) => {
    const time = Math.random() * 100
    setTimeout(() => {
      console.log(url)
      resolve(url)
    }, time)
  })
}
const limitLoad = (urls, handle, limit) => {
  let results = []
  const suquques = [...urls];
  const promises = suquques.splice(0, limit).map((url, idx) => handle(url).then((res) => [idx, res]))
  return suquques.reduce((p, url, cidx) => {
    return p.then(() => Promise.race(promises)).then(([lastIdx, img]) => {
      promises[lastIdx] = handle(url).then((res) => {
        return [lastIdx, res]
      })
      results[]
      return results
    }).catch((err) => {
      console.error(err)
    })
  }, Promise.resolve()).then((res) => {
    return Promise.all(promises)
  }).then((res) => {
    console.log(res)
  })
}
const limitLoad = (urls, handle, limit) => {
  const results = []
  const splitArr = (urls, limit) => {
    const len = Math.ceil(urls.length / limit)
    return Array(len).fill([]).map((_, idx) => urls.slice(idx * limit, (idx + 1) * limit))
  }
  const handles = splitArr(urls, limit).map(urls => urls.map(url => handle(url)))
  return handles.reduce((p, promises) => {
    return p.then(() => Promise.all(promises).then(res => {
      results.push(...res)
      return results
    }))
  }, Promise.resolve())
}
const urls = [1,2,3,4,5,6]
limitLoad(urls, request, 3).then(res => {
  console.log(res)
}).catch(err => {
  console.error(err)
})
```

### 数组转树结构

```js
const arr = [{
        id: 2,
        name: '部门B',
        parentId: 0
    },
    {
        id: 3,
        name: '部门C',
        parentId: 1
    },
    {
        id: 1,
        name: '部门A',
        parentId: 2
    },
    {
        id: 4,
        name: '部门D',
        parentId: 1
    },
    {
        id: 5,
        name: '部门E',
        parentId: 2
    },
    {
        id: 6,
        name: '部门F',
        parentId: 3
    },
    {
        id: 7,
        name: '部门G',
        parentId: 2
    },
    {
        id: 8,
        name: '部门H',
        parentId: 4
    }
]
function arr2Tree(arr) {
  let res = []
  let itemMap = {}
  for (let item of arr) {
    const { id, name, parentId } = item
    itemMap[id] = {
      ...item,
      children: itemMap[i]?.children ? itemMap[i]?.children: []
    }
    if (parentId === 0) {
      res.push(itemMap[id])
    } else {
      if (!itemMap[parentId]) {
        itemMap[parentId] = {
          children: []
        }
      }
      itemMap[parentId].children.push(itemMap[id])
    }
  }
  console.log(itemMap)
  return res;
}
function arr2Tree(arr) {
  // 每个lopp是获取当前pid的children
  const loop = (pid) => {
    return arr.reduce((pre, cur) => {
      if (cur.parentId === pid) {
        cur.children = loop(cur.id)
        pre.push(cur)
      }
      return pre
    }, [])
  }
  return loop(0)
}
arr2Tree(arr)
```

### 去除字符串中出现次数最少的字符，不改变源字符串顺序
```js
// “ababac” —— “ababa”
// “aaabbbcceeff” —— “aaabbb”
function spliceStr(str) {
  const tagMap = new Map()
  for (let s of str) {
    if (tagMap.has(s)) {
      tagMap.set(s, tagMap.get(s) + 1)
    } else {
      tagMap.set(s, 1)
    }
  }
  const minCount = Math.min(...tagMap.values())
  const minStrArr = [...tagMap.entries()].filter(([s, count]) => count === minCount).map(([s]) => s)
  return str.split('').filter(s => !minStrArr.includes(s)).join('')
}
spliceStr('aaabbbcceeff')
spliceStr('ababac')
```

### 写出一个函数trans，将数字转换成汉语输出，输出不超过10000亿数字
```js
function trans(num) {
  if (num > Math.pow(10, 12)) {
    return '超过一万亿'
  }
  const chins = ['零', '一', '二','三','四','五','六','七','八','九','十']
  const units = ['', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千', '万']
  let res = '', numStr = String(num), len = numStr.length
  for (let i = len - 1; i >= 0; i--) {
    res = units[len - i - 1] + res
    res = chins[numStr[i]] + res
  }
  // 将零(千|百|十)换成零 十零换成十
  res = res.replace(/零(千|百|十)/g, '零').replace(/十零/g, '十')
  // 合并中间多个零
  res = res.replace(/零+/g, '零')
  // 将零亿换成亿 零万换成万
  res = res.replace(/零亿/g, '亿').replace(/零万/g, '万')
  // 将亿万换成亿
  res = res.replace(/亿万/g, '亿')
  // 去除末尾的零
  res = res.replace(/零+$/, '')
  // 将将一十换成十
  res = res.replace(/^一十/, '十')
  console.log(res)
  return res
}
trans(123456) // 十二万三千四百五十六
trans(100010001)// 一亿零一万零一
trans(7002930193000)
trans(10000001)
trans(1000000000000)
```

### 给几个数组，可以通过数组找到对应的数组名称
```js
// 比如这个函数输入一个1，那么要求函数返回A
const A = [1,2,3];
const B = [4,5,6];
const C = [7,8,9];

function test(num) {
  const obj = {
    A,
    B,
    C
  }
  for (let key of Object.keys(obj)) {
    if (obj[key].includes(num)) {
      return key
    }
  }
  return -1
}
test(5)
```

### 不定长二位数组的全排列
```js
// 输入 [['A', 'B', ...], [1, 2], ['a', 'b'], ...]

// 输出 ['A1a', 'A1b', ....]

function fullSequeue(arr) {
  return arr.reduce((pre, cur) => {
    if (!Array.isArray(pre) || !Array.isArray(cur)) {
      return
    }
    if (pre.length === 0) return cur
    if (cur.length === 0) return pre
    let tem = []
    for (let preVal of pre) {
      for (let curVal of cur) {
        tem.push(`${preVal}${curVal}`)
      }
    }
    return tem
  }, [])
}
fullSequeue([['A', 'B'], [1,2,3,4], ['a', 'b', 'c']])
```
### 一个数组的子集
```js
// 输入一个数组 arr = [1,2,3]
// 输出子集

// [[1], [2], [3], [1, 2], [1, 3], ...., [1,2,3], [1,2,4] ....]
function fullSequeue(nums) {
  const n = nums.length
  let res = []
  function dfs(start, arr) {
    res.push(arr.slice(0))
    if (arr.length >= n) return
    for (let i = start; i < n; i++) {
      arr.push(nums[i])
      dfs(i+1, arr)
      arr.pop()
    }
  }
  dfs(0, [])
  return res
}
fullSequeue([1,2,3])
```

### 两个字符串对比, 得出结论都做了什么操作, 比如插入或者删除
```js
pre = 'abcde123'
now = '1abc123'

// a前面插入了1, c后面删除了de
function diff(pre, now) {
  let preStartIdx = 0, nowStartIdx = 0, preEndIdx = pre.length - 1, nowEndIdx = now.length - 1
  while(preStartIdx <= preEndIdx && nowStartIdx <= nowEndIdx) {
    if (pre[preStartIdx] === now[nowStartIdx]) {
      preStartIdx++
      nowStartIdx++
    } else if (pre[preEndIdx] === now[nowEndIdx]) {
      preEndIdx--
      nowEndIdx--
    } else if (pre[preStartIdx] === now[nowEndIdx]) {
      preStartIdx++
      nowEndIdx--
    } else if (pre[preEndIdx] === now[nowStartIdx]) {
      preEndIdx--
      nowStartIdx++
    } else {
      const idxInPre = pre.slice(preStartIdx, preEndIdx).indexOf(now[nowStartIdx])
      debugger
      if (idxInPre === -1) {
        console.log(pre[preStartIdx] + '前面插入了' + now[nowStartIdx])
      } else {
        pre[idxInPre] = undefined
      }
      nowStartIdx++
    }
  }
  if (preStartIdx > preEndIdx) {
    // 老节点先遍历完，说明还有新节点需要插入
    console.log(pre[preEndIdx] + '插入' + now.slice(nowStartIdx, nowEndIdx + 1))
    console.log(preStartIdx, preEndIdx)
  } else if (nowStartIdx > nowEndIdx) {
    // 新节点先遍历完，说明还有老节点需要删除
    console.log(now[nowEndIdx] + '后删除' + pre.slice(preStartIdx, preEndIdx + 1).filter(item => item !== undefined))
    console.log(nowStartIdx, nowEndIdx)
  }
}
diff(pre, now)
```

### sleep函数

```js
// 单线程阻塞
function sleep(delay) {
  var start = (new Date()).getTime()
  while((new Date()).getTime() - start > delay) {
    continue
  }
}
// setTime 回调
function sleep(delay, callback) {
  setTimeout(callback, delay)
}
// promise
function sleep(delay) {
  return new Promise(resolve => setTimeout(resolve, delay))
}
await sleep(1000)
console.log(1)
```

### 实现一个redux
```js
function createStore(reducer) {
  let state; // state记录所有状态
  let listeners = []; // 保存所有注册的回调

  function subscribe(cb) {
    listeners.push(cb); // 将回调保存下来
  }

  function dispatch(action) {
    state = reducer(state, action);

    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i]
      listener()
    }
  }

  function getState() {
    return state;
  }

  return {
    subscribe,
    getState,
    dispatch
  }
}

function combineReducers(reducerMap) {
  const reducer = (state = {}, action) => {
    const newState = {}

    for (const [key, reducer] of Object.entries(reducerMap)) {
      // reducerMap每个键的值是reducer，运行返回对应键的state
      // 将所有reducer返回的state按照参数key组装好，最后返回
      const preState = state[key]
      newState[key] = reducer(preState, action)
    }
    return newState
  }
  return reducer
}

const initMilkState = {
  milk: 0
};

function milkReducer(state = initMilkState, action) {
  switch (action.type) {
    case 'PUT_MILK':
      return {...state, milk: state.milk + action.count};
    case 'TAKE_MILK':
      return {...state, milk: state.milk - action.count};
    default:
      return state;
  }
}

const initRiceState = {
  rice: 0
};
function riceReducer(state = initRiceState, action) {
  switch (action.type) {
    case 'PUT_RICE':
      return {...state, rice: state.rice + 1};
    case 'TAKE_RICE':
      return {...state, rice: state.rice - 1};
    default:
      return state;
  }
}

// 使用combineReducers组合两个reducer
const reducer = combineReducers({milkState: milkReducer, riceState: riceReducer});

let store = createStore(reducer);

// subscribe其实就是订阅store的变化，一旦store发生了变化，传入的回调函数就会被调用
// 如果是结合页面更新，更新的操作就是在这里执行
store.subscribe(() => console.log(store.getState()));

// 将action发出去要用dispatch
store.dispatch({ type: 'PUT_MILK', count: 1 });    // milk: 1
store.dispatch({ type: 'PUT_MILK', count: 2  });    // milk: 3
store.dispatch({ type: 'TAKE_MILK', count: 1 });   // milk: 2

store.dispatch({ type: 'PUT_RICE', count: 1 });    // rice: 1
store.dispatch({ type: 'PUT_RICE', count: 1 });    // rice: 2
store.dispatch({ type: 'TAKE_RICE', count: 1 });   // rice: 1

```

### 实现compose与pipe
一种中间件机制，函数时组合的概念：将一组需要顺序执行的函数，符合为一个函数，外层函数的参数实际是内层函数的返回值
```js
const add = x => x + 10;
const multiply = x => x * 10;

function compose(...fns) {
  return (...args) => fns.reduce((pre, cur) => pre(cur(...args)))
}
// 参数从右往左执行
compose(multiply, add)(10);

function pipe(...fns) {
  return (...args) => fns.reduce((pre, cur) => cur(pre(...args)))
}
// 参数从左往右执行
pipe(multiply, add)(10);
```

### 给一个字符串, 找到第一个不重复的字符
```js
// ababcbdsa
// abcdefg
function findUnique(str) {
  const uniStack = new Set()
  const ordStack = new Set()
  for (let s of str) {
    if ([...uniStack, ...ordStack].includes(s)) {
      if (uniStack.has(s)) {
        uniStack.delete(s)
        ordStack.add(s)
      } 
    } else {
      uniStack.add(s)
    }
  }
  return [...uniStack].length > 0 ? [...uniStack][0] : -1
}
findUnique('ababcbdsa')
findUnique('abcdefg')
```

### 遇到退格字符就删除前面的字符, 遇到两个退格就删除两个字符
```js
// 比较含有退格的字符串，"<-"代表退格键，"<"和"-"均为正常字符
// 输入："a<-b<-", "c<-d<-"，结果：true，解释：都为""
// 输入："<-<-ab<-", "<-<-<-<-a"，结果：true，解释：都为"a"
// 输入："<-<ab<-c", "<<-<a<-<-c"，结果：false，解释："<ac" !== "c"

function fn(str1, str2) {
    function getStr(str) {
      const stack = []
      for (let s of str) {
        if (s === '-' && stack[stack.length - 1] === '<') {
          stack.pop()
          stack.pop()
          continue
        }
        stack.push(s)
      }
      return stack.join('')
    }
    console.log(getStr(str1), getStr(str2))
    return getStr(str1) === getStr(str2)
}
fn("a<-b<-", "c<-d<-")
fn("<-<ab<-c", "<<-<a<-<-c")
```

### 实现一个函数, 可以间隔输出
```js
function createRepeat(fn, repeat, interval) {
  const fns = Array(repeat).fill(fn)
  return (...args) => {
    fns.reduce((p, fn) => {
      return p.then(() => {
        return new Promise(resolve => setTimeout(() => {
          resolve(fn(...args))
        }, interval * 1000))
      })
    }, Promise.resolve())
  }
}

var fn = createRepeat(console.log, 3, 4);

fn('helloWorld'); // 每4秒输出一次helloWorld, 输出3次
```

### 删除链表的一个节点
```js
function deleteNode(head, node) {
  if (head.val === node) return head.next
  let tem = head
  while(tem.next) {
    if (tem.next.val === node) {
      tem.next = tem.next.next
      return head
    } 
    tem = tem.next
  }
  return head
}
```

### 实现LRU算法
```js
class LRU{
  map = new Map()
  capacity = 0
  constructor(capacity) {
    this.capacity = capacity
  }
  get(key) {
    if (this.map.has(key)) {
      const value = this.map.get(key)
      this.map.delete(key)
      this.map.set(key, value)
      return value
    } else {
      return -1
    }
  }
  set(key, value) {
    this.map.delete(key)
    this.map.set(key, value)
    if (this.map.size > this.capacity) {
      this.map.delete(this.map.keys().next().value)
    }
  }
}
```

### Promise finally 怎么实现的
```js
Promise.prototype.myFinally = function(cb) {
  return this.then((value) => Promise.resolve(cb()).then(() => value), (reason) => Promise.resolve(cb()).then(() => {
    throw reason
  }))
}
new Promise((resolve, reject) => {
  resolve(1)
  // reject(2)
}).myFinally((e) => {
  console.log('finally', e)
}).then(e => {
  console.log('then', e)
}).catch(err => {
  console.log('catch', err)
})
```

### 深拷贝
```js
function deepClone(target, hash = new weakMap()) {
  if (typeof target !== 'object' || typeof target === null) return target
  if (target instanceof Date) return new Date(target)
  if (target instanceof RegExp) return new RegExp(target)
  if (hash.has(target)) return hash.get(target)
  const allDesc = Object.getOwnPropertyDescriptors(target)
  const cloneTarget = Object.create(Object.getPrototypeOf(target), allDesc)
  hash.set(target, cloneTarget)
  for (let key of Reflect.ownKeys(target)) {
    const value = target[key]
    cloneTarget[key] typeof value === 'object' ? deepClone(value, hash) : value
  }
  return cloneTarget
}
```

### 光照二叉树，输出能被光照到的节点, dfs能否二叉树解决?
```js
// 输入: [1,2,3,null,5,null,4]
// 输出: [1,3,4]

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
function rightSideView(root) {
    let res = []
    function dfs(nodes) {
      let ret = null, children = []
      for (let node of nodes) {
        if (node) {
          ret = node.val
          if (node.left) children.push(node.left)
          if (node.right) children.push(node.right)
        }
      }
      ret !== null && res.push(ret)
      children.length > 0 && dfs(children)
    }
    dfs([root])
    return res
};

```
### EventEmitter
```js
class EventEmitter {
  _events = {}
  constructor() {

  }
  $on(event, listener) {
    if (this._events[event]) {
      this._events[event].push(listener)
    } else {
      this._events[event] = [listener]
    }
    return this
  }
  $once(event, listener) {
    const on = (...args) => {
      listener(...args)
      this.$off(event, on)
    }
    this.$on(event, on)
    return this
  }
  $off(event, listener) {
    if (!event || !listener) {
      this._events = {}
    } else if (event && !listener) {
      delete this._events[event]
    } else if (event && listener) {
      this._events[event] = this._events[event].filter(item => item !== listener)
    }
    return this
  }
  $emit (event, ...args) {
    const listeners = this._events[event] || []
    for (let listener of listeners) {
      listener(...args)
    }
    return this
  }
}
```

### 好多请求, 耗时不同, 按照顺序输出, 尽可能保证快, 写一个函数.
```js
const promiseList = [
	new Promise((resolve) => {
		setTimeout(() => resolve(1), 3000)
	}),
	new Promise((resolve) => {
		setTimeout(() => resolve(2), 2000)
	}),
	new Promise((resolve) => {
		setTimeout(() => resolve(3), 1000)
	})
]

fn(promiseList);
async function fn(promises) {
  const startTime = new Date()
  const res = await Promise.allSettled(promises)
  console.log(res, new Date() - startTime)
  return res
}
```

### 多叉树, 获取每一层的节点之和
```js
function layerSum(root) {
    let res = []
    function dfs(nodes) {
      let children = []
      let ret = []
      for (let node of nodes) {
        if (node) {
          ret.push(node.value)
          children.push(...(node.children || []))
        }
      }
      ret.length > 0 && res.push(ret)
      children.length > 0 && dfs(children)
    }
    dfs([root])
    return res
}

layerSum({
    value: 2,
    children: [
        { value: 6, children: [ { value: 1 } ] },
        { value: 3, children: [ { value: 2 }, { value: 3 }, { value: 4 } ] },
        { value: 5, children: [ { value: 7 }, { value: 8 } ] }
    ]
});
```

### 多叉树指定层节点的个数
```js
function getLayerSum(root, depth) {
  let res
  function dfs(nodes, depth) {
    let ret = [], children = []
    if (depth === 0) {
      res = nodes.length
      return 
    }
    for (let node of nodes) {
      if (node) {
        children.push(...(node.children || []))
      }
    }
    depth > 0 && dfs(children, depth - 1)
  }
  dfs([root], depth - 1)
  return res
}
getLayerSum({
    value: 2,
    children: [
        { value: 6, children: [ { value: 1 } ] },
        { value: 3, children: [ { value: 2 }, { value: 3 }, { value: 4 } ] },
        { value: 5, children: [ { value: 7 }, { value: 8 } ] }
    ]
}, 2)
```

### 虚拟dom转真实dom
```js
const vnode = {
    tag: 'DIV',
    attrs: {
        id: 'app',
        class: 'app1'
    },
    children: [{
            tag: 'SPAN',
            attrs: {
              style: {
                color: 'red',
                fontSize: '23px'
              }
            },
            children: [{
                tag: 'A',
                children: [{
                    text: 'A1',
                }]
            }]
        },
        {
            tag: 'SPAN',
            children: [{
                    tag: 'A',
                    children: [{
                        text: 'A2',
                    }]
                },
                {
                    tag: 'A',
                    children: [{
                      text: 'A3',
                    }]
                }
            ]
        }
    ]
}

function render(vnode) {
  function updateProperties(vnode) {
    const { attrs = {}, el } = vnode
    Object.keys(attrs || {}).forEach(key => {
      switch(key) {
        case 'class':
          el.className = attrs.class
          break
        case 'style':
          for (let styleName in attrs.style) {
            el.style[styleName] = attrs.style[styleName]
          }
          break
        default:
          el.setAttribute(key, attrs[key])
      }
    })
  }
  const { tag, text, children } = vnode
  if (typeof tag === 'string') {
    vnode.el = document.createElement(tag)
    updateProperties(vnode)
    children.forEach(child => {
      vnode.el.appendChild(render(child))
    })
  } else {
    vnode.el = document.createTextNode(text)
  }
  return vnode.el
}
render(vnode)
```

### 二叉树层序遍历, 每层的节点放到一个数组里
```js
// 给定一个二叉树，返回该二叉树层序遍历的结果，（从左到右，一层一层地遍历）
// 例如：
// 给定的二叉树是{3,9,20,#,#,15,7},
// 该二叉树层序遍历的结果是[[3],[9,20],[15,7]]
var levelOrder = function(root) {
    const res = []
    function dfs(nodes) {
        let arr = []
        let ret = []
        for (let node of nodes) {
            if (node) {
                ret.push(node.val)
                if (node.left) arr.push(node.left)
                if (node.right) arr.push(node.right)
            }
        }
        ret.length > 0 && res.push(ret)
        if (arr.length) {
            dfs(arr)
        }
    }
    dfs([root])
    return res
};
```

### 实现一个函数, fetchWithRetry 会自动重试3次，任意一次成功直接返回
```js
function fetch() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const x = Math.random()
      if (x > 0.6) {
        resolve(x)
      } else {
        reject(x)
      }
    }, 1000)
  })
}
function fetchWithRetry(fn, times = 1) {
  return new Promise((resolve, reject) => {
    function runFn(n) {
      console.log(`第${n}次重试`)
      fn().then(res => {
        console.log(`第${n}次成功`)
        resolve(res)
      }).catch(err => {
        if (n < times) {
          runFn(n + 1)
        } else {
          reject(err)
        }
      }) 
    }
    runFn(1)
  })
}
fetchWithRetry(fetch, 3)
async function fetchWithRetry(fn, times = 1) {
  for (let i = 1; i <= times; i++) {
    try{
      console.log(`第${i}次重试`)
      const res = await fn()
      return res
    }catch(err) {
      if (i === times) {
        return Promise.reject(err)
      }
    }
  }
}
fetchWithRetry(fetch, 3).then(e => {
  console.log('成功了', e)
}).catch(e => {
  console.log('失败了', e)
})
```

### 链表中环的入口节点
```js
var detectCycle = function(head) {
    if (!head) return null
    let slow = fast = head
    while(fast !== null) {
        slow = slow.next
        if (fast.next !== null) {
            fast = fast.next.next
        } else {
            return null
        }
        if (fast === slow) {
            let tem = head
            while(tem !== slow) {
                tem = tem.next
                slow = slow.next
            }
            return tem
        }
    }
    return null
};
```

### 叠词的数量
```js
// Input: 'abcdaaabbccccdddefgaaa'
// Output: 4

// 1. 输出叠词的数量
// 2. 输出去重叠词的数量
// 3. 用正则实现
function getStrNum(str) {
  let stack = new Set()
    const n = str.length
    for (let i = 0; i < n - 1; i++) {
        if (str[i] === str[i + 1]) {
            stack.add(str[i])
        }
    }
    return stack.size
}
getStrNum('abcdaaabbccccdddefgaaa')
```

### 实现一个带并发限制的异步调度器
```js
class Schedule {
  size = 0
  runningStack = []
  waitStack = []
  constructor(size) {
    this.size = size
  }
  runTask(fn) {
    const idx = this.runningStack.push(fn)
    fn().then(() => {
      this.runningStack.splice(idx, 1)
      if (this.waitStack.length > 0) {
        this.runTask(this.waitStack.shift())
      }
    })
  }
  addTask(fn) {
    if (this.runningStack.length >= this.size) {
      this.waitStack.push(fn)
    } else {
      this.runTask(fn)
    }
  }
}
function fetch(n, time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(n)
    }, time)
  })
}

const work = new Schedule(2)
function addTask(n, time) {
  work.addTask(() => fetch(n, time).then(res => console.log(res)))
}
addTask(1, 1000)
addTask(2, 500)
addTask(3, 300)
addTask(4, 400)
// 2314
```