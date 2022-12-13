## unknown与any区别
1. unknown是类型安全的。
2. 同any一样，任何值都可以赋给unknown，但是unknown不能赋给其他类型，只能赋值给any和unknown。
```ts
let vAny: any = 0;
let vUnknown: unknown = 10;

let s1: string = vAny; // right
let s2: string = vUnknown; // error
```
3. unknown没有被断言或细化到确切类型前，不允许在其上进行任何操作。
```ts
function foo1(callback: unknown) {
  callback(); // error
}

function foo2(callback: unknown) {
  if (typeof callback === 'function') {
    callbak(); // right
  }
}
```
unknown，如果你不知道预先期望哪种类型，但想稍后分配它，则应该使用该 unknown 关键字，并且该关键字将不起作用。

## interface 和 type 区别
1. 都可以声明对象，函数，但是type还可以声明基础类型，联合类型，元祖。
```ts
type A = [string, number];
const a: A = ['1', 1];
```
2. interface 对此声明可以合并，type不能重复声明
```ts
interface A {
  a: string;
}

interface A {
  b: number
}

const c: A = {
  a: '1',
  b: 1
}
```
3. type 可以使用typeof获取变量的类型。
```ts
let div = document.createElement('div);
type B = typeof div;
```

## React 应用

### React.FC
与普通声明的区别：
- React.FC显示的定义了返回类型，其他方式是隐式推导
- React.FC对静态属性：displayName，propTypes，defaultProps提供了类型检查和自动补全
- React.FC为children提供了隐式类型（ReactElement|null）
