[题目来源](https://juejin.cn/post/6942988170208215076)

## JavaScript

- 讲讲js数据类型？基本和引用的区别？symbol和bigint讲一讲应用场景？

基本类型：String Number Boolean Null Undefined Symbol Bigint 存放在栈内存中，赋值会创建新值，互不影响。

引用类型： Object Array Function Date RegExp Map Set等 存放在堆内存中，赋值是将指针赋值，指针指向堆中的对象。改变堆内存的对象会影响到其他指向该对象的变量。

Symbol  创建唯一值 Symbol(1) !== Symbol(1)

BigInt 大值整型 用于大值整型计算 后面会用n结尾 
BigInt(9007199254740991) = 9007199254740991n

- 判断数据类型的方法？instanceof原理?判断空对象？ typeof null？typeof NaN？

typeof 能判断基本类型，除了null返回object。引用类型除了function能正确返回，其他都返回object

instanceof 基本类型都返回false 引用类型根据原型链去查找匹配，Object都会返回true。
```js
function myInstanceof(left, right) {
  if (typeof left !== 'object' || left === null) return false
  let proto = left.__proto__
  let prototype = right.prototype
  while(proto) {
    if (proto === prototype) return true
    proto = proto.__proto__
    if (proto === null) return false
  }
  return false
}
```
Object.keys 它会列举对象的所有可枚举属性键名到数组中，对不可枚举是无效的。
JSON.stringify 其无法转化函数键值对，同时对不可枚举的属性束手无策
Reflect.ownKeys 既可以解决非枚举属性也可以解决Symbol属性。
```js
function isEmpty(obj) {
  return (String(obj) === '[object Object]') && (Reflect.ownKeys(obj).length === 0)
}
function isEmpty(obj) {
  return (String(obj) === '[object Object]') && (Object.getOwnPropertyNames(obj).length === 0) &&(Object.getOwnPropertySymbols(obj).length === 0)
}
```
```typeof NaN === 'number'```

- var/let/const 区别？暂时性死区？块级作用域？const a = {}; a.x = 1 能不能修改？

var 变量提升 可重复声明
let const 不能变量提升，暂时性死区，不可重复声明，会形成块级作用域

const 声明必须赋值，且后面无法修改，object可以修改。赋值是指针，堆中对象是可以改变的。

- 说说你对函数式编程的理解？函数柯里化的理解？平时的使用场景？

函数式编程是一种软件开发风格，它注重不依赖于变成状态的函数，有益于测试和复用。
定义：自变量的映射。也就是说一个函数的值仅决定于参数的值，不依赖其他状态。
特点：不可变性，默认变量不可变。引用透明，函数的返回值只依赖于它的输入，这就是引用透明性。让函数像变量一样使用。

柯里化：把一个函数的多个参数分解成多个函数的技术。
```js
function curry(fn, ...args){
  return fn.length > args.length ?
  (...arguments) => curry(fn, ...args, ...arguments) : fn(...args)
}
```
作用：参数复用。提前返回-返回接受余下参数且返回结果的新函数。延迟执行

- 防抖、节流的含义，使用场景？手写一下？
防抖：一段时间连续操作只会执行最后一次操作
```js
function debounce(fn, wait){
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
    }, wait)
  }
}
```
节流：一段时间内只会一次操作
```js
function throttle(fn, wait){
  let timer
  return (...args) => {
    if (timer) return
    timer = setTimeout(() => {
      fn(...args)
      timer = null
    }, wait)
  }
}
```

- call、apply、bind区别？bind实现？bind之后还能修改this指向吗？为什么？

```js
Function.prototype.myCall = function(context = winodw, ...args) {
  let fn = Symbol()
  context[fn] = this
  let res = context[fn](...args)
  delete context[fn]
  return res
}
var obj = {b: 2}
function a(){
  console.log(this.b, arguments)
}
a.myCall(obj, 3, 4)
```
bind()函数会创建一个新绑定的函数（bound function）绑定函数也可以使用new运算符构造，提供的this值会被忽略，但迁至参数仍会提供给模拟函数
```js
Function.prototype.myBind = function(context = window, ...args){
  let fn = this
  const fBound = function() {
    return fn.apply(this instanceof fn ? this : context, [...args, ...arguments])
  }
  if (fn.protptype) {
    fBound.prototype = Object.create(fn.prototype)
  }
}
```

- 闭包概念，最主要的还是问闭包的场景？

能够使用宁一个函数作用域变量的函数。
场景：回调函数，柯里化，立即执行函数IIFI，函数返回函数

- 用es5实现es6类的继承？各种继承问的挺多的

原型链继承
```js
function Chlid(){
  this.name = 'child'
}
function Person() {
  this.name = 'person'
}
Child.prototype = new Person()
```
缺点：因为两个实例使用的是同一个原型对象。它们的内存空间是共享的，当一个发生变化的时候，另外一个也随之进行了变化。

构造函数继承
```js
function Chlid(){
  Person.call(this)
  this.name = 'child'
}
function Person() {
  this.name = 'person'
}
Person.prototype.func = function() {
  console.log('无法继承')
}
```
缺点：无法继承父函数的原型方法。

组合式继承
```js
function Chlid(){
  Person.call(this)
  this.name = 'child'
}
function Person() {
  this.name = 'person'
}
Person.prototype.func = function() {
  console.log('继承')
}
Child.prototype = new Person()
```
缺点：一次继承 两次调用Person 开销大

原型式继承
```js
Child.prototype = Object.create(Person.prototype)
```
缺点：Object.create 是浅拷贝，引用类型共用一套存储地址。

寄生式继承
```js
Person.protptype.func = function() {}
Child.prototype = Object.create(Person.prototype)
```
缺点：共享

寄生组合式继承
```js
function Person() {
  this.name = 'person'
}
Person.prototype.func = function() {}
function Child() {
  Person.call(this)
}
Child.prototype = Object.create(Person.prototype)
Child.prototype.constructor = Child

var p = new Child()
```

- 深拷贝与浅拷贝？常用方法？手写一个深拷贝函数？

浅拷贝：Object.assign(),slice(),[...arr]
深拷贝：JSON.parse(JSON.stringify()) 缺点：function,undefined，Symbol会忽略掉，Date会转换成字符串，regexp返回空对象，无法循环引用。无法拷贝对象的原型链。无法拷贝不可枚举的属性。对象中含有 NaN、Infinity 以及 -Infinity，JSON 序列化的结果会变成 null。
```js
function deepClone(target, hash = new WeakMap()){
  if (typeof target !== 'object' || target === null) {
    return target
  }
  if (target instanceof Date) {
    return new Date(target)
  }
  if (target instanceof RegExp) {
    return new RegExp(target)
  }
  if (hash.has(target)) {
    return hash.get(target)
  }
  let allDesc = Object.getOwnPropertyDescriptors(target)
  let cloneTarget = Object.create(Object.getPrototypeof(target), allDesc)
  hash.set(target, cloneTarget)
  for (let key of Reflect.ownKeys(target)) {
    let item = target[key]
    cloneTarget[key] = typeof item === 'object' ? deepClone(item, hash) : item
  }
  return cloneTarget
}
```

- 说说你知道的JavaScript设计模式？观察者和发布订阅的区别？手写一个发布订阅？我真的写了

单例模式： 一个类只有一个实例，并提供一个访问它的全局访问点。vuex的store
观察者模式
发布订阅

- 说说对你对JavaScript异步编程的理解？

JavaScript是单线程，同步任务会在主线程上一个个执行。会先把异步任务放到异步队列中，分为宏任务对了和微任务队列。当主线程空（处于空闲）系统会读取任务队列的，结束等待状态，进入执行栈开始执行。主线程不断重复上面过程，称为事件循环event-loop

- ES Module与 CommonJS 模块的差异？两者互相加载的方式？一般会扯到AMD

CommonJS：导出module.exports.xx = xxx === exports.xx = xxx 导入require
1. 可以动态加载语句，代码发生时运行
2. 混合导出，导出引用对象时之前的导出会被覆盖
3. 导出值是拷贝，可以修改导出值。
ES Module：导出单个导出export/默认导出export default 导入 import xx from xx
1. 静态的，不可以动态加载语句，只能声明在文件最顶端，发生在编译时
2. 混合导出，单个导出，默认导出完全互不影响
3. 导出的引用值之前都存在映射关系，并且只可读，不能修改。

AMD一开始是CommonJS规范中的一个草案，全称是Asynchronous Module Definition，即异步模块加载机制。
AMD推崇依赖前置，提前执行。也就是说，在define方法里传入的依赖模块(数组)，会在一开始就下载并执行。

CMD：对于依赖的模块，CMD推崇依赖就近，延迟执行。也就是说，只有到require时依赖模块才执行。

- Promise.all、race、allSettled 概念、手写？很多手写题都会用到，比如用promise实现请求并发个数限制？
Promise.all：执行一个Promise数组，只有全fulfilled才会fulfilled，返回一个返回值数组，否则rejected，返回第一个rejected返回值。
Promise.race：执行一个Promise数组，返回第一个执行的返回值（无论时fulfilled还是rejected）
Promise.allSettled：执行一个Promise数组，只有等到所有这些参数实例都返回结果，不管是fulfilled还是rejected，包装实例才会结束。
```js
Promise.myAll = function(promises) {
  return new Promise((resolve, reject) => {
    promises = Array.from(promises)
    let len = promises.length
    if (len === 0) {
      resolve([])
    }
    let index = 0
    let result = []
    for (let i = 0; i < len; i++) {
      Promise.resolve(promises[i].then(res => {
        result[i] = res
        if (++index === len) {
          resolve(result)
        }
      }, err => {
        reject(err)
        return
      }))
    }
  })
}
Promise.myRace = function(promises) {
  return new Promise((resolve, reject) => {
    promises = Array.from(promises)
    let len = promises.length
    if (len === 0) resolve([])
    for (let i = 0; i < length; i++) {
      Promise.resolve(promises[i].then(res => {
        resolve(res)
        return
      }, err => {
        reject(err)
        return
      }))
    }
  })
}
Promise.myAllSettled = function(promises) {
  return new Promise((resolve, reject) => {
    promises = Array.from(promises)
    let len = promises.length
    if (len === 0) resolve([])
    let index = 0
    let result = []
    for (let i = 0; i < len; i++) {
      Promise.resolve(promises[i].then(res => {
        result[i] = {
          status: 'fulfilled',
          value: res
        }
        if (++index === len) {
          resolve(result)
        }
      }, err => {
        result[i] = {
          status: 'rejected',
          value: res
        }
        if (++index === len) {
          resolve(result)
        }
      }))
    }
  })
}
```
[限制异步操作的并发个数并尽可能快的完成全部](https://juejin.cn/post/6844904077537574919#heading-56)

1. 把promises分成一个二维数组，每个数组小于等于limit。使用promise.all去分数组执行，最后合并执行结果返回。缺点：下一个Promise.all必须在上一个Promise.all执行完才执行。
2. 使用reduce每次splice limit个使用Promise.race执行。当有返回结果使用下一个替换掉执行的坐标，反复执行Promise.race，知道最后只剩下limit数量时，执行Promise.all。最终返回结果。
```js
function loadImg(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function () {
      console.log('加载图片完成')
      resolve(img)
    }
    img.onerror = function () {
      reject(new Error('Could not load img at ' + url))
    }
    img.src = url
  })
}
function limitLoad(urls, handler, limit) {
  let sequence = [].concat(urls)
  let promises = sequence.splice(0, limit).map((url, index) => {
    return handler(url).then(() => index)
  })
  return sequence.reduce((pre, cur, curIdx) => {
    return pre.then(() => Promise.race(promises)).then(lastIndex => {
      promises[lastIndex] =  handler(cur).then(() => lastIndex)
    }).catch(err => {
      console.error(err)
    })
  }, Promise.resolve()).then(() => {
    return Promise.all(promises)
  })
}
limitLoad(urls, loadImg, 3)
  .then(res => {
    console.log("图片全部加载完毕");
    console.log(res);
  })
  .catch(err => {
    console.error(err);
  });
```

## Css

- 水平垂直居中？兼容性？不知道宽高情况下？

```css
/* flex */
.box{
  display: flex;
  justify-content: center;
  align-items: center;
}
/* position */
.box{
  position: relative;
}
.item{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
/* margin */
.box{
  display: block;
}
.item{
  margin: 50px auto;
}
```

- BFC概念？作用？常用场景？

block famating context 块级格式化上下文。生成一个独立的容器，容器内部的元素不会影响到外部，反之亦然。

1. 根元素
2. display: inline-block table table-cell
3. overflow不为visible
4. float不为none
5. position为absolute或fixed

6. 内部元素外边距会在外包体边界上，非BFC margin会顶出来且不占空间。
7. 内部元素的margin会重叠，以大的为准。
8. 会计算浮动元素的高度（解决浮动问题）
9. 不与浮动元素重叠（与浮动元素分离，自适应多栏布局）
10. 容器内部的元素不会影响到外部，反之亦然。

- Flex？注意flex：1的含义，一般会给你个场景题

flex: 1 === flex-grow: 1 flex-shrink: 1 flex-basis: 0%

- 盒模型概念，如何切换盒模型？

content padding border margin
box-sizing: content-box/border-box

content-box: content = width

border-box: content + padding + boder = width

- 实现1px边框？1px线条？

```css
.border-top{
  position: relative;
}
.border-top::after{
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  box-sizing: border-box;
  border: 0 solid #eee; 
  width: 200%;
  height: 200%;
  transform: scale(0.5, 0.5);
}
.border-top::after{
  border-top-width: 1px;
}
```


- 伪类和伪元素区别？使用场景？
伪类：一个选择处于待定转台的元素的选择器，是操作文档中已有的元素。如div:first-child,div:hover。
伪元素添加一个新的Dom节点到dom数中，是创建了一个文档外的元素。如div::after。
[](./assets/weilei.jpg)
[](./assets/weiyuansu.jpg)

## Http && 浏览器

- 浏览器缓存？http缓存？ 主要要讲一讲强缓存、协商缓存、preload、prefetch、Service Worker等，304的含义？协商缓存e-tag是怎么生成的？Last-Modified是基于什么生成的？两者对比一下？优先级哪个高？

## Vue
- 生命周期？那个生命周期可以获取到真实DOM？修改data里面的数据，会触发什么生命周期？

beforeCreate created beforeMount mounted beforedUpdate updated beforeDestroy destroyed

keep-alive 多了两个 被 keep-alive 缓存的组件激活时调用。activated 被 keep-alive 缓存的组件停用时调用。deactivated

mounted 获取真实Dom update 修改data数据

- 组件data为什么是一个函数？

每个实例可以维护一份被返回对象的独立的拷贝。

我们的组件肯定会在多个地方用，保证实例化的data唯一。

- vue 组件通信？一般说了vuex，就会问vuex用法？action和mutations区别？实现原理等？

1. $emit('xx') @xx props
2. $refs $root $parent $child
3. provide inject
4. v-bind="$attrs" v-on="$listeners"
5. eventBus $on $emit
6. vuex

[vuex 原理](https://juejin.cn/post/6844903784703852551)
1. vuex 利用了vue的mixin机制，混合beforCreate钩子，将store注入至vue实例上，并注册了store的引用属性$store。
2. vuex 的state是借助vue的响应式data实现的。
3. getter是借助vue的计算属性computed实现的。

- vue 导航守卫，分全局和组件的，一般用于权限控制，这个就可能扯到项目中的一些鉴权问题。

全局
```js
const router = new VueRouter({ ... })
router.beforeEach((to, from , next) => {
  // ...
})
```
组件
```js
router.afterEach((to, from) => {
  // ...
})
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
const Foo = {
  template: `...`,
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}
```

- $nextTick 作用？实现原理？微任务向宏任务的降级处理，经常被问到说出几种宏任务，微任务。

- vue响应式原理？基本都会问

- vue scoped属性作用？实现原理？

避免css类全局污染，每个组件scoped class都会加上hash <div data-v-453a8097></div> div[data-v-453a8097]{}

- vue router有几种模式？实现方式？
功能：
1. 改变url且不让浏览器向服务器发送请求
2. 监听url变化
3. 截获url地址，并解析需要的信息来匹配路由规则
hash: location.hash hashchange 
1. URL 中 hash 值只是客户端的一种状态，也就是说当向服务器端发出请求时，hash 部分不会被发送；
2. hash 值的改变，都会在浏览器的访问历史中增加一个记录。因此我们能通过浏览器的回退、前进按钮控制hash 的切换；
3. hash值改变可以是a便签也可以是js，可以通过location.hash直接赋值
4. 我们可以使用 hashchange 事件来监听 hash 值的变化，从而对页面进行跳转
history:
1. pushState 和 repalceState 两个 API 来操作实现 URL 的变化 ；
2. 我们可以使用 popstate 事件来监听 url 的变化，从而对页面进行跳转（渲染）；
3. history.pushState() 或 history.replaceState() 不会触发 popstate 事件，这时我们需要手动触发页面跳转（渲染）。
使用 history 模式时，在对当前的页面进行刷新时，此时浏览器会重新发起请求。如果 nginx 没有匹配得到当前的 url ，就会出现 404 的页面。因此需要通过服务端来允许地址可访问

- key的作用？没有key的情况，vue会怎么做？会引出diff的问题
- vue diff过程，和react diff区别？
- vue 2.x defineProperty缺陷？业务代码里面怎么处理？$set原理？vue是怎么重写数组方法的？考察你是不是真的看过源码
- vue 3.0 proxy优缺点？怎么处理vue3不支持IE？
- computed 和 watch 的区别和运用的场景？除了基本的，看你能不能说出三种watcher的区别