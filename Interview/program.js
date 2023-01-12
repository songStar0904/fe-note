// ## 编程

// ### 实现一个节流函数？如果想要最后一次必须执行的话怎么实现
const throttle = (fn, time, immediate = false) => {
  
}

// ### 实现一个批量请求函数，能够限制并发量
const limitLoad = (urls, handle, limit) => {
}
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
const urls = [1,2,3,4,5,6]
limitLoad(urls, request, 3).then(res => {
  console.log(res)
}).catch(err => {
  console.error(err)
})

// ### 数组转树结构 并设计添加删除修改查找节点

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
}
arr2Tree(arr)
function tree2Arr(tree) {
}
tree2Arr(arr2Tree(arr))
function appendNodeInTree(id, nNode, tree) {
}
appendNodeInTree(1, {id: 8}, arr2Tree(arr))
function updateNodeInTree(id, nNode, tree) {
}
updateNodeInTree(1, {name: 'new1'}, arr2Tree(arr))

function deleteNodeInTree(id, tree) {
}
deleteNodeInTree(1, arr2Tree(arr))

function findNodeInTree(id, tree) {
}
findNodeInTree(1, arr2Tree(arr))

// ### 去除字符串中出现次数最少的字符，不改变源字符串顺序
// “ababac” —— “ababa”
// “aaabbbcceeff” —— “aaabbb”
function spliceStr(str) {
}
spliceStr('aaabbbcceeff')
spliceStr('ababac')

// ### 写出一个函数trans，将数字转换成汉语输出，输出不超过10000亿数字
function trans(num) {
}
trans(123456) // 十二万三千四百五十六
trans(100010001)// 一亿零一万零一
trans(7002930193000)
trans(10000001)
trans(1000000000000)

// 汉语转数字
function transformChar (str) {
  
}
transformChar('一十二亿三千零九十六万三千八百九十七')
transformChar('一万零一十亿')

// ### 给几个数组，可以通过数组找到对应的数组名称
// 比如这个函数输入一个1，那么要求函数返回A
const A = [1,2,3];
const B = [4,5,6];
const C = [7,8,9];

function test(num) {
}
test(5)

// ### 不定长二位数组的全排列
// 输入 [['A', 'B', ...], [1, 2], ['a', 'b'], ...]

// 输出 ['A1a', 'A1b', ....]

function fullSequeue(arr) {
}
fullSequeue([['A', 'B'], [1,2,3,4], ['a', 'b', 'c']])

// ### 一个数组的子集
// 输入一个数组 arr = [1,2,3]
// 输出子集

// [[1], [2], [3], [1, 2], [1, 3], ...., [1,2,3], [1,2,4] ....]
function fullSequeue(nums) {
}
fullSequeue([1,2,3])

// ### ES5 ES6 继承

// ### 两个字符串对比, 得出结论都做了什么操作, 比如插入或者删除

pre = 'abcde123'
now = '1abc123'

// a前面插入了1, c后面删除了de
function diff(pre, now) {
}
diff(pre, now)

// ### sleep函数

function sleep(delay) {
}
await sleep(1000)
console.log(1)

// ### 实现一个redux
function createStore(reducer) {
}

function combineReducers(reducerMap) {
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

// ### 实现compose与pipe
// 一种中间件机制，函数时组合的概念：将一组需要顺序执行的函数，符合为一个函数，外层函数的参数实际是内层函数的返回值
const add = x => x + 10;
const multiply = x => x * 10;

function compose(...fns) {
}
// 参数从右往左执行
compose(multiply, add)(10);

function pipe(...fns) {
}
// 参数从左往右执行
pipe(multiply, add)(10);

// ### 给一个字符串, 找到第一个不重复的字符
// ababcbdsa
// abcdefg
function findUnique(str) {
}
findUnique('ababcbdsa')
findUnique('abcdefg')
findUnique('loveleetcode')

// ### 遇到退格字符就删除前面的字符, 遇到两个退格就删除两个字符

// 比较含有退格的字符串，"<-"代表退格键，"<"和"-"均为正常字符
// 输入："a<-b<-", "c<-d<-"，结果：true，解释：都为""
// 输入："<-<-ab<-", "<-<-<-<-a"，结果：true，解释：都为"a"
// 输入："<-<ab<-c", "<<-<a<-<-c"，结果：false，解释："<ac" !== "c"

function fn(str1, str2) {
}
fn("a<-b<-", "c<-d<-")
fn("<-<ab<-c", "<<-<a<-<-c")

// ### 实现一个函数, 可以间隔输出
function createRepeat(fn, repeat, interval) {
}

var fn = createRepeat(console.log, 3, 4);

fn('helloWorld'); // 每4秒输出一次helloWorld, 输出3次


// ### 删除链表的一个节点 https://leetcode.cn/problems/remove-linked-list-elements/
function deleteNode(head, val) {
}

// ### 实现LRU算法 https://leetcode.cn/problems/lru-cache/description/
class LRU{
}

// ### Promise finally 怎么实现的
Promise.prototype.myFinally = function(cb) {
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

// ### 深拷贝
function deepClone(target, hash = new weakMap()) {
}

// ### 光照二叉树，输出能被光照到的节点, dfs能否二叉树解决?https://leetcode.cn/problems/binary-tree-right-side-view/
// 输入: [1,2,3,null,5,null,4]
// 输出: [1,3,4]

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
function rightSideView(root) {
};

// ### EventEmitter
class EventEmitter {
}

// ### 好多请求, 耗时不同, 按照顺序输出, 尽可能保证快, 写一个函数.
const promiseList = [
	new Promise((resolve) => {
		setTimeout(() => resolve(1), 3000)
	}),
	new Promise((_, resolve) => {
		setTimeout(() => resolve(2), 2000)
	}).catch(err => err),
	new Promise((resolve) => {
		setTimeout(() => resolve(3), 1000)
	})
]

fn(promiseList);
function fn (promises) {
}

// ### 多叉树, 获取每一层的节点之和
function layerSum(root) {
    
}

layerSum({
    value: 2,
    children: [
        { value: 6, children: [ { value: 1 } ] },
        { value: 3, children: [ { value: 2 }, { value: 3 }, { value: 4 } ] },
        { value: 5, children: [ { value: 7 }, { value: 8 } ] }
    ]
});

// ### 多叉树指定层节点的个数
function getLayerSum(root, depth) {
}
getLayerSum({
    value: 2,
    children: [
        { value: 6, children: [ { value: 1 } ] },
        { value: 3, children: [ { value: 2 }, { value: 3 }, { value: 4 } ] },
        { value: 5, children: [ { value: 7 }, { value: 8 } ] }
    ]
}, 2)

// ### 虚拟dom转真实dom
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
 
}
render(vnode)

// ### 有序数组原地去重
function uniArr(arr) {
}
uniArr([1,1,1,2,3,3,4,5,5])

// ### 二叉树层序遍历, 每层的节点放到一个数组里
// 给定一个二叉树，返回该二叉树层序遍历的结果，（从左到右，一层一层地遍历）
// 例如：
// 给定的二叉树是{3,9,20,#,#,15,7},
// 该二叉树层序遍历的结果是[[3],[9,20],[15,7]]
var levelOrder = function(root) {
    
};

// ### 实现一个函数, fetchWithRetry 会自动重试3次，任意一次成功直接返回
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
  
}
fetchWithRetry(fetch, 3).then(e => {
  console.log('成功了', e)
}).catch(e => {
  console.log('失败了', e)
})

// ### 链表中环的入口节点
var detectCycle = function(head) {
};

// ### 叠词的数量
// Input: 'abcdaaabbccccdddefgaaa'
// Output: 4

// 1. 输出叠词的数量
// 2. 输出去重叠词的数量
// 3. 用正则实现
function getStrNum(str) {
}
getStrNum('abcdaaabbccccdddefgaaa')

// ### 实现一个带并发限制的异步调度器
class Schedule {
  
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

// ### 数字转N进制

function solve(m, n) {
}
solve(7, 3) // 21

// 假设请求API为
function request(params) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(params), 1000);
  });
}

// 最多处理3个请求的调度器
function Scheduler (limit = 3) {
  
};

const createPromise = Scheduler();
createPromise(1).then((res) => console.log(res));
createPromise(2).then((res) => console.log(res));
createPromise(3).then((res) => console.log(res));
createPromise(4).then((res) => console.log(res));
createPromise(5).then((res) => console.log(res));

// 预期，等1秒后输出1 2 3 ，再等一秒输出4 5

function Scheduler2 (params, limit) {
  
}
Scheduler2([1, 2, 3, 4, 5], 3).then(res => {
  console.log(res)
})

class Scheduler3 {
  
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
}

function step () {
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
}
const promise = (time) => new Promise((r) => {
  setTimeout(() => {
    r('success')
  }, time)
})
promiseTimeout(promise(500), 300).then(res => {
  console.log(res)
})

// excel表多很多列（A, B.....AA, AB, ....ABC），输入第几列，输出列头名 number2ExcelName(n: number)

function number2ExcelName (n) {
  
}
number2ExcelName(27) // AA
number2ExcelName(28) // AB
number2ExcelName(19010) // ABCD

// 实现(5).add(3).minus(2)

// 实现LazyManClass
class LazyManClass {

}
const LazyMan = (name) => new LazyManClass(name)
LazyMan('Tony');
// Hi I am Tony

LazyMan('Tony').sleep(10).eat('lunch');
// Hi I am Tony
// 等待了10秒...
// I am eating lunch

LazyMan('Tony').eat('lunch').sleep(3).eat('dinner');
// Hi I am Tony
// I am eating lunch
// 等待了3秒...
// I am eating diner

LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(3).sleep(2).eat('junk food');
// Hi I am Tony
// 等待了3秒...
// I am eating lunch
// I am eating dinner
// 等待了2秒...
// I am eating junk food

// ### 数组编程题
// 随机生成一个长度为 10 的整数类型的数组，例如 [2, 10, 3, 4, 5, 11, 10, 11, 20]，将其排列成一个新数组，要求新数组形式如下，例如 [[2, 3, 4, 5], [10, 11], [20]]。

function arrFn (arr) {
  
}

arrFn([2, 10, 3, 4, 5, 11, 10, 11, 20])

// ### 如何把一个字符串的大小写取反（大写变小写小写变大写），例如 'AbC' 变成 'aBc' 。

// ### 实现一个 normalize 函数，能将输入的特定的字符串转化为特定的结构化数据

// 字符串仅由小写字母和 [] 组成，且字符串不会包含多余的空格。
// 示例一: 'abc' --> {value: 'abc'}
// 示例二：'[abc[bcd[def]]]' --> {value: 'abc', children: {value: 'bcd', children: {value: 'def'}}}

function normalize (str) {
  
}
normalize('[abc[bcd[def]]]')

// ## 1. 实现 Array.prototype.reduce
Array.prototype.myReduce = function () {
  
}

[1,2,3].myReduce((a, b) => a + b, 0)


/*
  2. 问题：实现parse方法， 从对像中取值替换对应标记;
*/
const data = { brand: 'Apple', model:'iPhone10,1', price: 1234 };
const tpl = '$model$, 应为$brand$手机，预估价格$price$';

function parse(tpl, data) {
	return tpl;   // iPhone10,1 应为Apple手机，预估价格1234
}
parse(tpl, data)

// 输出对象路径值

function getPath (obj) {
}

getPath({
  a: 1,
  b: {
    c: 11
  },
  d: [2, {x: 2}]
}) // a=1 b.c=11 d.0=2 d.x=2

// 输出括号匹配
function fn (str) {
}

fn('((a+b)+(a-b))-(axc)-d') // ['(a+b)+(a-b)', 'a+b', 'a-b', 'axc']
fn('(()') // 报错

// 获取url参数
function getQueryObj (url) {
}

getQueryObj('https://www.baidu.com?a=1&b=2')

/**
 * 给定一个字符串 s ，找出 至多 包含两个不同字符的最长子串 t ，并返回该子串的长度。
 * 示例 1:
输入: “eceba”
输出: 3
解释: t 是 “ece”，长度为3。

示例 2:
输入: “ccaabbb”
输出: 5
解释: t 是 “aabbb”，长度为5。
 */
function getMaxNum (str) {
}
getMaxNum('eceba')
getMaxNum('ccaabbb')

/**
 * 给定一个字符串，全由0或1组成，如果把这个字符串分成左右两拨，左边的0与右边的1数量相加最大，写出实现过程。
如，000111，则分为000，111最优，左边的0是3个，右边的1是3个，所以最大值为6。如果分为00，0111，则左边0是2，右边1是3，相加是5，还没有6大。
 */
function getMaxSum (str) {
}
getMaxSum('000111')

(() => {
class Scheduler {
  scheduleTimeout = 0
  flag = true
  pending = []
  constructor(scheduleTimeout) {
      this.scheduleTimeout = scheduleTimeout
  }
  timeout() {
      return new Promise((resolve) => {
        setTimeout(() => {
          debugger
          console.log(this.flag)
          this.flag && this.runTask()
          resolve(false)
        }, this.scheduleTimeout)
      })
  }
  addTask(taskFn) {
    return new Promise((resolve, reject) => {
      // console.time(taskFn)
      const start = new Date().getTime()
      const fn = () => Promise.resolve().then(taskFn).then(() => {
        debugger
        this.flag && this.runTask()
        this.flag = false
        // console.timeEnd(taskFn)
        console.log(new Date().getTime() - start)
      })
      this.pending.push([fn, resolve, reject])
      this.runTask()
    })
  }
  runTask () {
    if (this.pending.length === 0) return 
    this.flag = true
    const [fn, resolve, reject] = this.pending.shift()
    Promise.race([fn(), this.timeout()]).then(resolve, reject)
  }
}

function sleep(timeout) {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const scheduler = new Scheduler(500);  // 设置 500ms 的调度超时
  // 0ms 时执行，100ms 时输出
scheduler.addTask(() => sleep(100)).then(() => console.log(1));

// 100ms 时执行，1100ms 时输出
// 这个任务在 500ms 后会超时，开始执行下一个任务，但该任务本身还是在 1100ms 时完成，输出 2
scheduler.addTask(() => sleep(1000)).then(() => console.log(2));

// 600ms 时执行，800ms 时输出
scheduler.addTask(() => sleep(200)).then(() => console.log(3));

// 800ms 时执行，1200ms 时输出
scheduler.addTask(() => sleep(400)).then(() => console.log(4));
})()
// 输出 1 3 2 4

// 单调栈，就是输入一个数组，输出两个数组，每个数左右最近的最小的数

function getStack (arr) {
}
getStack([3, 5, 2]) // [[-1, 3, -1], [2, 2, -1]]

// 返回页面所有节点数组
function getAllTags () {
}
getAllTags()

// 实现一个函数，传入urls数组，尽可能快的返回请求结果
function request (url) {
}
function loadUrls (urls) {
}
loadUrls(['https://developer.mozilla.org/api/v1/whoami', 'https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch/bcd.json', 'https://developer.mozilla.org/api/v1/who'])


// 一个请求队列，不能使用await+for，第一个返回值作为第二个的参数，按顺序输出，自己实现测试用例
function fn () {
  return (val) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(val + 1);
      }, 1000)
    });
  }
}

const arrs = [];
for (let i = 0; i < 3; i++) {
  arrs.push(fn());
}

function fn1 (promises) {
}

fn1(arrs)

// 给你一个整数数组 nums 和一个整数 k ，请你返回其中出现频率前 k 高的元素。你可以按 任意顺序 返回答案。

function topKFrequent (nums, k) {
}

topKFrequent([1, 1, 1, 2, 2, 3], 2)

// 给你两个版本号 version1 和 version2 ，请你比较它们。

function campareVersion (v1, v2) {
}

campareVersion('7.5.2', '7.5')

// 实现 JSON.stringify(obj) ，将对象转成字符串

function myStringify (obj, hash = new WeakSet()) {
}
myStringify({
  tag: Symbol("student"),
  money: undefined,
  girlfriend: null, 
  fn: function(){},
  info1: [1,'str',NaN,Infinity,-Infinity,undefined,null,() => {},Symbol()],
  info2: [new Set(),new Map(),new Error(),/a+b/],
  info3: {
      name: 'Chor',
      age: 20,
      male: true
  },
  info4: {
      date: new Date(),
      tag: Symbol(),
      fn: function(){},
      un: undefined
  },
  info5:{
      str: new String('abc'),
      no: new Number(123),
      bool: new Boolean(false)
  }    
})