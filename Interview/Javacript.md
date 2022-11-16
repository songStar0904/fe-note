## Javascript

### 闭包是什么？闭包的用途
闭包是一个函数调用另一个函数作用域。（在函数内访问外部的变量）
用途：
1. 从内部读取外部变量
2. 将创建的变量值始终保持在内存中
3. 避免全局变量污染
缺点：
容易造成内存泄漏，解决办法：在退出函数之前，将不使用的局部变量全部删除

### 简述事件循环机制原理
因为JS是单线程，是为了避免浏览器混乱，比如如果是多线程，一个线程告诉浏览器需要删除一个dom，另一个线程告诉浏览器需要添加一个dom，浏览器将不知道以哪个为准。
单线程能减少内存消耗，但是也会引起同步代码执行的阻塞
异步任务分为宏任务与微任务，常见的宏任务有：setTimeout，setInterval，script代码块，IO，setImmediate等，微任务有：promise.then，MutationObserver，process.nextick（node）queueMicrotask
当执行任务队列时，会先执行同步任务，并将宏任务放到宏任务队列，微任务放到微任务队列。事件循环是以一个宏任务执行为周期，执行栈为空，下一个宏任务进栈，此时会先去检查当前微任务队列是否为空，如果有微任务，依次执行微任务，直到执行完微任务，宏任务执行完并出栈，接着开启下一个事件循环。

#### Node事件循环
基于libuv实现的
在Node10以前：
- 执行完一个阶段所有任务
- 执行完nextTick队列里面的内容
- 然后执行完微任务队列内容
Node11以后与浏览器一致

### 前端工程化理解
前端工程化是一种思想，任何事物的出现都基于需求，面对日益复杂的前端项目，工程化就是类似工厂流水线，优化前端开发工作，例如：解决代码冗余，项目可维护性，提升版本迭代速度一系列问题。为了更加便捷的完成开发部署等工作，前端工程化可以分为四个方面：模块化，组件化，规范化，自动化。目前常见的前端工程化有：脚手架，代码模块化，组件库，webpack等打包工具，CICD，docker，jenkins等

### 前端性能优化做了哪些工作

- 优化webpack升级，优化打包体积，打包速度，编译速度

### 设计模式

- 工厂模式
工厂模式用来创建对象的常见设计模式，在不暴露创建对象的具体逻辑，而将逻辑进行封装。
优点：
1. 调用者创建对象时只要知道其名称即可
2. 扩展性高
3. 隐藏具体实现，只关心接口
缺点：
1. 每次增加产品，需要增加一个具体类
- 单例模式
保证一个类只能被实例一次，每次获取的时候，如果该类已经被实例则直接返回该实例，否则创建一个实例保存并返回
优点：
1. 内存中只有一个实例，减少了内存的开销
2. 避免对资源多重占用
缺点：
1. 违反了单一职责，一个类应该只关心内部逻辑，而不用去关心外部实现
- 发布订阅模式（观察者模式）
![](./assets/%E5%8F%91%E5%B8%83%E8%AE%A2%E9%98%85%E6%A8%A1%E5%BC%8F.jpg)
1. 消息中心：负责存储消息与订阅者对应关系，有消息触发时负责通知订阅者
2. 订阅者：去消息中心订阅自己感兴趣的消息
3. 发布者：满足条件时，通过消息中心发布消息


### 微前端

### 前端安全都做了哪些 xss csrf

- xss跨站点脚本攻击
1. 存储型：指黑客利用网站的文章，评论，发布一些恶意脚本存入数据库，当其他用户获取该信息时会执行恶意脚本，获取用户信息等。
2. 反射型：黑客利用url，往url信息中注入脚本来获取用户信息，用户点击后会把信息发到黑客服务器上去
3. dom型：发生在纯前端，指利用修改dom来攻击用户
防范：
1. 将cookie设置为onlyhttp，不能通过脚本获取cookie
2. 将用户输入的地方用转义过滤
3. url跳转其他页面做提示确认，url地址也需要做校验过滤(禁止以 javascript: 开头的链接)
- csrf跨站点请求伪造
1. 自动发起get请求伪造：利用img/script等绕过浏览器同源策略（只能get请求）
2. 自动发起post请求伪造：访问该页面后，表单会自动提交，相当于模拟用户完成了一次 POST 操作。
3. 引诱用户点击链接
防范：
1. 设置cookie SameSite strict模式，防止第三方网站获取
2. 利用同源检测，检查请求来源是否一致
3. token 认证

### https 如何安全通信的
非对称加密+对称加密
非对称加密：用于验证安全性，获取对称加密的密钥。
对称加密：合法验证后，后面通信都是使用对称加密通信
1. 客户端访问443端口服务器
2. 服务器将非对称公钥以证书的形式发给客户端
3. 客户端拿到证书进行合法验证（验证证书是否过期，证书是否是该服务器的）如果不通过则中断https请求，如果合法，则生成一个私钥（client key），并通过公钥对其进行非对称加密发送给服务端
4. 服务端拿到加密后的密钥，用私钥进行解密，获取client key，并用它对数据进行对称加密通信
5. 客户端使用client key对收到的数据进行解密

### 301 302 304 区别
- 301：永久重定向，当前请求的资源已被移除时使用，响应的 Location 头字段会提供资源现在的 URL。直接使用 GET 方法发起新情求。（永久重定向浏览器会记录，下次访问a.com就不会请求a.com而是直接去b.com）
- 302：临时重定向，与 301 类似，但客户端只应该将 Location 返回的 URL当做临时资源来使用，将来请求时，还是用老的 URL。直接使用 GET 方法发起新情求。
- 304：资源未修改，使用协商缓存
- 307：与 302 类似，但是使用原请求方法发起新情求。（输入http://www.baidu.com 将会返回307，响应头返回：Location: https://www.baidu.com/。并发起https://www.baidu.com）
- 308：与 301 类似，但是使用原请求方法发起新情求。
一般可以用nginx配置重定向（rewrite）

### function 和 箭头函数区别
- 箭头函数没有自己的this，永远指向外层，所以不能为构造函数，不能new，不能bind，call，apply
- 不可以使用 arguments 对象，该对象在函数体内不存在。可用`...`代替
- 不可以使用 yield 命令，因此箭头函数不能用作 Generator 函数。

### generator 是如何做到中断和恢复的
- 遇到yield表达式，就暂停执行后面的操作，并将紧跟在yield后面的哪个表达式的值，作为返回对象的value属性
- 下一次调用next方法时，在继续往下执行，直到遇到下一个yield表达式或者return，return后面的值，作为返回对象的值，done为true

### async/await, generator, promise这三者的关联和区别是什么?
关联：都可以处理异步
- generator 需要用next才能执行，并且遇到yield会中断
```js
function *fn() {
  console.log('执行了')
  yield 'hello'
  return 'world'
}
var generator = fn() // 不会执行
generator.next() // 执行了 {value: 'hello', done: false}
generator.next() // {value: 'world', done: true}
generator.next() // {value: undefined, done: true}
```
- async/await 是generate语法糖
1. 内置执行器，不需要使用next来执行
2. 更好的语义，async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果
3. 返回值是Promise，generator返回值是Iterator
- promise
1. 内部错误使用trycatch捕获不到，只能用catch来捕获，async/await可以
2. Promise一旦新建会立即执行，不会阻塞后面代码，而async函数await后面是Promise对象会阻塞后面代码

### 浏览器输入url开始发生了什么

1. dns解析（将域名地址解析成ip地址）
2. 建立TCP连接（三次握手）
- 客户端通过SYN报文发送连接请求，确定服务端是否开启端口准备链接，状态设置SYN_SEND
- 服务器如果有开着的端口并且决定接受连接，就会返回SYN+ACK报文给客户端，状态设置为SYN_RECV
- 客户端接受服务端SYN+ACK报文，向服务器发送ACK报文表示确认，客户端和服务端都设这位ESTABLISHED状态，连接建立
为什么是三次：TCP 双方都是全双工的。全双工指的是，TCP 任何一端既是发送数据方，又是接收数据方，因此这就要求 TCP 通讯双方既要保证自己具备发送数据的能力，又要保证自己具备接收数据能力
为什么不是4次：三次可以确认了，四次浪费
3. 发送http请求（强缓存、协商缓存）
4. 浏览器渲染
- 构建DOM树
- 样式计算
- 创建布局树
- 进行重绘回流
- 渲染页面

### ES5和ES6的继承? 这两种方式除了写法, 还有其他区别吗?
1. class 内部默认严格模式，默认绑定的this为undefined
2. ES5实例属性通过call来实现继承的，class通过super来实现继承
3. class 子类实例可以继承原生构造函数实例的内部属性，ES5不行
4. ES5实质是先创建子类实例对象，然后再将父类的方法添加到this上，ES6实质是先将父类实例对象属性和方法添加到this上（必须先到用super才能使用this），再用子类构造函数修改this

### Class 静态方法和实例方法区别
- 静态方法使用static关键字声明
- 静态方法属于类自身方法，在类自身使用，实例方法可以被实例对象调用
- 静态方法里this指向类（直接this.staticFn使用静态方法 使用this.prototype.fn使用实例方法），实例方法里this指向实例本身（可以直接this.fn使用实例方法，使用this.constructor.staicFn 使用静态方法）

### 全局作用域中，用 const 和 let 声明的变量不在 window 上，那到底在哪里？如何去获取？
在script块级作用域上，直接获取，不需要加window，因为window不存在

### Http 2.0和http3.0对比之前的版本, 分别做了哪些改进?

2.0
- 二进制协议： HTTP/1.1版本的头部信息是文本，数据部分可以是文本也可以是二进制。HTTP/2版本的头部和数据部分都是二进制，且统称为‘帧’，从而提升效率
- 多路复用：废弃了1.1中的管道，同一个TCP连接里面。客户端和服务端可以同时发送多个请求和多个响应，并且不用按照顺序来，由于服务端不用按照顺序来处理响应，所以避免了对头阻塞问题
- 头部信息压缩：使用专门算法压缩头部，减少数据传输量，主要是通过服务端和客户端同时维护了一张头部信息表，所有的头部信息在表里面都会有对应的记录，并且会有一个索引号，这样后面只需要发送索引号即可。
- 服务端主动推送：允许服务器主动向客户端推送数据
- 数据流：由于数据包不是按照顺序发送的，同一个TCP链接里面相连的两个数据包可能是属于不同的响应，因此必须要有一种方法来区分每个数据据包属于哪种响应。2.0中每个请求或者响应的所有数据包称为数据流，并且每个数据流都有唯一编号，请求数据流编号ID为奇数，响应数据流编号ID为偶数。每个数据包在发送的时候带上对应编号ID，这样服务器和客户端就能分区时属于哪个数据流
缺点：
由于采用二进制分帧进行多路复用，通常只使用一个 TCP 连接进行传输，在丢包或网络中断的情况下后面的所有数据都被阻塞。
3.0
放弃TCP，使用基于UDP的QUIC协议

### TCP队头阻塞
TCP为了保证数据的有序性，使用滑动窗口会导致发送窗口，接收窗口被阻塞

#### HTTP2.0队头阻塞
HTTP2.0只解决了HTTP队头阻塞，没有解决TCP队头阻塞
在HTTP/2中，多个请求是跑在一个TCP管道中的。但当出现了丢包时，HTTP/2 的表现反倒不如 HTTP/1 了。因为TCP为了保证可靠传输，有个特别的“丢包重传”机制，丢失的包必须要等待重新传输确认，HTTP/2出现丢包时，整个 TCP 都要开始等待重传，那么就会阻塞该TCP连接中的所有请求.
HTTP/2 通过抽象出 Stream 的概念，实现了 HTTP 并发传输。在HTTP连接上，不同Stream的帧时可以乱序发送的，因为每个帧的头部会携带StreamID信息，所以接收端可以通过Stream ID有序组装成HTTP信息，而统一Stream 内部的帧必须严格有序的
但是HTTP2多个Stream是在一条TCP连接上传输的，这意味着多个Stream共同一个TCP滑动窗口，那么当发生数据丢失，滑动窗口时无法移动。

#### 没有队头阻塞的 QUIC
QUIC 也借鉴 HTTP/2 里的 Stream 的概念，在一条 QUIC 连接上可以并发发送多个 HTTP 请求 (Stream)。
但是QUIC给每个Steam都分配了一个独立的滑动窗口，这样使得一个连接上的多个Steam之间没有依赖关系，都是互相独立的各自公职滑动窗口

### HTTP 3.0基于udp的话, 如何保证可靠的传输?
![如何基于 UDP 协议实现可靠传输？](https://zhuanlan.zhihu.com/p/524824554)
- Packet Header
- QUIC Frame Header
QUIC 通过单向递增的 Packet Number，配合 Stream ID 与 Offset 字段信息，可以支持乱序确认而不影响数据包的正确组装，摆脱了TCP 必须按顺序确认应答 ACK 的限制，解决了 TCP 因某个数据包重传而阻塞后续所有待发送数据包的问题。

### TCP和UDP最大的区别是什么?
UDP
- 面向无连接
- 单播多播广播
- 面向报文
- 不可靠性
- 头部开销小
TCP
- 面向连接
- 单播
- 面向字节流
- 可靠性
- 提供拥塞技术
- 提供全双工通信
### 前端History路由配置 nginx
刷新后，浏览器根据当前的url去请求html文件，但是SPA只有一个html文件，所以需要在nginx.conf的对应location里配置一行代码
try_files $uri  $uri/ /index.html;
告诉nginx如果按顺序检查文件是否存在，若不存在则重定向到index.html文件

### 前端路由 a -> b -> c这样前进, 也可以返回 c -> b -> a, 用什么数据结构来存比较高效

- 数组
优点：数组的“连续”特征决定了它的访问速度很快，因为它是连续存储的，所以这就决定了它的存储位置就是固定的，因此它的访问速度就很快
缺点：
1. 数组的连续性既有优点又有缺点，优点上面已经说了，而缺点它对内存的要求比较高，必须要找到一块连续的内存才行。
2. 插入和删除的效率比较慢
3. 大小固定，不能动态拓展。
- 链表
优点：
1. 对内存的利用率比较高，无需连续的内存空间，即使有内存碎片，也不影响链表的创建；
2. 插入和删除的速度很快，无需像数组一样需要移动大量的元素；
3. 链表大小不固定，可以很方便的进行动态扩展。
缺点：
1. 不能随机查找，必须从第一个开始遍历，查找效率比较低，链表查询的时间复杂度是 O(n)。

### Nodejs 异步IO模型
nodejs是基于事件驱动的异步操作架构，內置模块是Events模块。

### CommonJS AMD CMD ES6
- AMD 异步加载模块，依赖前置，加载模块后直接执行，无法保证执行顺序
- CMD 异步，依赖就近，加载后直接调用才按需执行
- CommonJS （require exports）同步，输出是一个值的拷贝（一旦输出一个值，模块内部的变化不影响这个值），在运行时加载，加载的是整个模块-所有接口
- ES6 （import export）异步，输出是值的引用（动态引用，脚本执行时，再根据引用，到模块里面取值，若原始值变了，import加载的值也跟着变），编译时输出，可以单独加载某个接口

### object 与 map 区别

- object 的key只能是字符串（number）或者Symbol，Map的key可以是任意
- Map 键值对数量可以通过size获取，object可以通过Object.keys(obj).length获取
- Map的键值是有序的，通过push的顺序进行排序的（可以迭代）
- object支持JSON.stringify,JSON.parse操作，map不支持

### set WeakSet map WeakMap

- Set 成员唯一，无序且不重复，可以遍历
- WeakSet 成员是对象，且弱引用，可以被垃圾回收机制回收（可以用来保存DOM节点，不容易造成内润泄露），不能遍历
- Map 本质上是键值对的集合，可以遍历
- WeakMap 只能接受对象作为键名，键名是弱引用，键值是任意的，同WeakSet可以被垃圾回收，不能遍历
- WeakSet 只能存储对象引用，不能存放值，Set都可以
- WeakSet 存储的对象值都是弱引用，即垃圾回收机制不需要考虑WeakSet对该对象的引用，如果没有其他变量或属性引用这个对象值，则这个对象将被垃圾回收掉。所以WeakSet对象里有多少个成员元素，取决于垃圾回收机制有没有运行，运行前后成员个数可能不一致，遍历结束后，有的成员可能取不到了（被垃圾回收），WeakSet对象无法被遍历。

### npm install 做了什么
#### npm安装机制：
1. 发出npm install 命令
2. 查询node_modules目录中是否已经存在指定模块
  - 若存在，不再重新安装
  - 若不存在
    - npm向registry查询模块压缩包地址
    - 下载压缩包，存放在根目录.npm目录下
    - 解压压缩包到当前项目node_modules目录
#### npm 实现原理
1. 执行工程自身preinstall
2. 确定首层依赖模块（dependencies，devDependencies）
3. 获取模块（递归获取）
  - 获取模块信息，首先会从package-lock.json中获取该模块信息，没有则根据package.json获取semver（语义化版本）
  - 获取模块实体，上一步获取到模块压缩包地址，npm会用此地址检查本地缓存，缓存中有直接拿，没有则从地址中下载
  - 查找该模块依赖，如果有继续递归获取该依赖模块
4. 模块扁平化
将相同模块名且semver兼容的模块提取到项目node_modules上，其他重复名单semver不兼容的依赖还是会在模块的node_modules里
5. 安装模块
6. 执行生命周期 (postinstall prepublish prepare)更新package-lock.json

#### semver（semantic version 语义化版本）
- 主版本号：不兼容的API修改
- 次版本号：做了向下兼容的功能性新增。feature版本
- 修订号：做了向下兼容的问题修正。bugfix版本

- `^` 同一主版本号中，不小于指定版本号的版本号（^2.1.0 -->2.1.1,2.2.0）
- `~` 统一主版本号和次版本号，不小于指定版本号的版本号（~2.1.0 --> 2.1.1）

#### package-lock.json作用
包含每个模块对应的版本，压缩包地址，依赖和完整hash
- 锁定安装模块版本号
- 固定依赖版本位置，避免项目结构混乱
- 完整hash是用来验证资源的完整性，防止别人篡改内容

### call 和 apply 的区别是什么，哪个性能更好一些

参数不同，call是一个一个参数，apply是数组或者类数组
call比apply好，因为apply会有一步把类数组转数组的操作CreateListFromArrayLike

### ES6 如何转成ES5
- 将代码字符串解析成抽象语法树AST（@babel/parser中parse）
- 将AST进行处理，在这个阶段可以对ES6代码进行相应转换成ES代码（@babel/core中transformfromAstSync AST转换ES5 Code @babel/traverse获取依赖文件）
- 根据处理后的AST再生成代码字符串

[es6在线编译](https://www.babeljs.cn/repl#?browsers=&build=&builtIns=false&corejs=3.21&spec=false&loose=false&code_lz=DYUwLgBAhhC8EEYBQBvJBIUkb2QXySQDMB7AJwgAosIBLOCABgG46IAeCAVldoGo-ASjToAzuAAqtALYgSAVzCVKguAD4II9AGMSAO1ElQAOmAkA5pVqCMeGwSA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=es2015&prettier=true&targets=&version=7.20.4&externalPlugins=&assumptions=%7B%7D)

```js
// es6
let a = 1
{
	let a = 1
}

for (let i = 0; i < 5; i++){
	setTimeout(() => {
		console.log(i)
	})
}
// es5
"use strict";

var a = 1;
{
  var _a = 1;
}
var _loop = function _loop(i) {
  setTimeout(function () {
    console.log(i);
  });
};
for (var i = 0; i < 5; i++) {
  _loop(i);
}

```