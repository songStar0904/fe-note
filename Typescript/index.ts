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