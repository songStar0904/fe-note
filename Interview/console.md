```js
async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}
async function async2() {
    console.log('async2');
}
console.log('script start');
setTimeout(function () {
    console.log('setTimeout');
}, 0)
async1();
new Promise(function (resolve) {
    console.log('promise1');
    resolve();
    console.log('promise2')
}).then(function () {
    console.log('promise3');
});
console.log('script end');
// script start async1 start async2 promise1 promise2 script end async1 end promise3 setTimeout
```

```js
var b = 10;
(function b(){
    b = 20;
    console.log(b); // [Function b]
})();
```
解释1：
这是一个立即执行函数（IIFE）还是一个具名函数（NFE）
- 作为函数名的标识（b）只能从函数体内部访问，在函数外部访问不到
- 绑定为函数名的标识（b）不能再绑定其他值，不可更变。
[在JavaScript的立即执行的具名函数A内修改A的值时到底发生了什么？](https://segmentfault.com/q/1010000002810093)
解释2：
1. 函数表达式与函数声明不同，函数名旨在该函数内部有效，且此绑定时常量绑定
2. 对于一个常量进行赋值，在 strict 模式下会报错，非 strict 模式下静默失败。
3. IIFE中的函数是函数表达式，而不是函数声明。

```js
var a = 10;
(function () {
    console.log(a) // undefined
    a = 5
    console.log(window.a) // 10
    var a = 20;
    console.log(a) // 20
})()
```
```js
[3, 15, 8, 29, 102, 22].sort() // 102 15 22 29 3 8 
```
sort默认是按照字母和升序将值作为字符串排序，数字是按照字符串来排序的
```js
var a = {n: 1};
var b = a;
a.x = a = {n: 2};

console.log(a.x) 	// undefined a = {n: 2}
console.log(b.x) // {n: 1} b = {x: {n:2}, n: 1}
```
这里.会先执行，当前a.x中的a和b引用的同一个地址，然后执行a={n:2}此时a重新赋值得到新对象，最后a.x=a这个时候a.x还是指向老对象，也就是b，所以b={n:1,x:{n:2}}


```js
console.log(typeof typeof typeof null); // string 从第二个开始就是string
console.log(typeof console.log(1)); // console.log返回undefined 所以结果也是undefined
```

```js
var name = '123';

var obj = {
	name: '456',
	print: function() {
		function a() {
			console.log(this.name);
		}
		a();
	}
}

obj.print(); // 123 默认绑定
```

```js
var a=3;
 function c(){
    alert(a);
 }
 (function(){
  var a=4;
  c(); // 3 词法作用域。函数被定义的时候，它的作用域就已经确认了
 })();
```

```js
const obj = {
	fn1: () => console.log(this),
	fn2: function() {console.log(this)}
}

obj.fn1(); // window 箭头函数
obj.fn2(); // obj本身

const x = new obj.fn1(); // 报错，箭头函数没有constructor
const y = new obj.fn2(); // fn2 构造函数本身
```

```html
<script src="./a.js" defer></script>
<script src="./b.js"></script>
<script>
  console.log('event start')
  document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded finish')
  })
  window.addEventListener('load', () => {
    console.log('onload finish')
  })
</script>
<body>
  <div>
    <script>
    let i = 0
    while(i < 1000) {
      i++
    }
    console.log('compute finished')
    </script>
  </div>
</body>
b finish
event start
compute finished
a finish
DOMContentLoaded finish
onload finish
```
浏览器加载步骤：
1. 解析html结构
2. 加载外部js脚本和样式表文件（预扫描）
3. 解析并执行js脚本
4. dom树构建完成-html解析完毕（完成后触发onready 即DOMContentLoaded）
5. 加载图片等外部文件（完成后触发图片onload）
6. 页面加载完毕（完成后触发onload）

defer 在html解析完成后执行，在触发DOMContentLoaded事件前执行

### onready 和 onload 区别
1. 执行时机，onready是在html解析完毕后执行，onload是在页面所有元素（包括图片+页面）加载完成后执行
2. 执行次数，onready可以执行多个，并且都可以按顺序得到执行，onload只执行最后一次

```js
let arr = [1,2,3]
let obj = {}
function fn(arrTemp, objTemp) {
  arrTemp = [] // 指向新地址
  abjTemp.a = 1 // 原地址修改
  abjTemp = {b : 2} // 指向新地址
}
fn(arr, obj)
console.log(arr, obj) // [1,2,3] {a:1}
```

```js
// example 1
var a={}, b='123', c=123;  
a[b]='b';
a[c]='c';  
console.log(a[b]); // c 会将c转字符串

---------------------
// example 2
var a={}, b=Symbol('123'), c=Symbol('123');  
a[b]='b';
a[c]='c';  
console.log(a[b]); // b

---------------------
// example 3
var a={}, b={key:'123'}, c={key:'456'};  
a[b]='b';
a[c]='c';  
console.log(a[b]); // c 会将b，c都转字符串
```
- 对象的键名只能是字符串和Symbol类型
- 其他类型的键名会转换成字符串类型
- 对象转字符串默认会调用toString方法

```js
function changeObjProperty(o) {
  o.siteUrl = "http://www.baidu.com" // 此时o和webSite 指向同一个对象
  o = new Object() // 将o赋值新对象
  o.siteUrl = "http://www.google.com"
} 
let webSite = new Object();
changeObjProperty(webSite);
console.log(webSite.siteUrl); // http://www.baidu.com
```

```js
function Foo() {
Foo.a = function() {
console.log(1)
}
this.a = function() {
console.log(2)
}
}
Foo.prototype.a = function() {
console.log(3)
}
Foo.a = function() {
console.log(4)
}
Foo.a();
let obj = new Foo();
obj.a();
Foo.a();
// 4 2 1
```

```js
String('11') == new String('11'); // true
String('11') === new String('11'); // false
new String('11').toString() === String('11')
```
- String('11') 是字符串类型 
- new String('11') 是对象类型
- == 会做隐式转换，调用toString

```js
var name = 'Tom';
(function() {
if (typeof name == 'undefined') {
  var name = 'Jack';
  console.log('Goodbye ' + name);
} else {
  console.log('Hello ' + name);
}
})();
// Goodbye Jack
```
var name 声明提升 导致name为undefined

```js
1 + "1"

2 * "2"

[1, 2] + [2, 1]

"a" + + "b"
// 11 4 1,22,1 aNaN
```
- + 如果有一个字符串，会将另一个隐式转换toString
- * 会将不是数组的隐式转换Number()
- 对象会先调用valueOf方法，如果不是数值，再调用toString方法
- 先左后面的一元操作符 +"b"会是NaN 再字符串拼接

```js
function wait() {
  return new Promise(resolve =>
    setTimeout(resolve, 10 * 1000)
  )
}

async function main() {
  console.time();
  const x = wait();
  const y = wait();
  const z = wait();
  await x;
  await y;
  await z;
  console.timeEnd();
}
main();
// default: 10006.011962890625 ms
```
三个任务发起的时候没有await，可以认为是同时发起了三个异步，之后各自await任务结果，按最高耗时计算，由于三个耗时一样，所以结果是10s

```js
let a = 0
let b = async () => {
  a = a + await 10
  console.log('2', a) // -> '2' 10
}
b()
a++
console.log('1', a) // -> '1' 1
```
- b函数await 10 异步会跳出来 此时记录a = 0
- a++ 执行 1 1
- 执行微任务 a = 0 + 10 输出 2 10