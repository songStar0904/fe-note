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

type B = [string, number];
const b: B = ['1', 1];

// 枚举key遍历
enum Status {
  A,
  B
}

type k = keyof typeof Status

const s: k = 'A'