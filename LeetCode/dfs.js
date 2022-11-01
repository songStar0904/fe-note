// 回溯算法

// 1. 实现一个函数，参数为数组和 id，要求实现一个 findPath 方法，找出查找匹配对应 id 的路径。
const data = [
  {
    id: "1",
    sub: [
      {
        id: "2",
        sub: [
          {
            id: "3",
            sub: null,
          },
          {
            id: "4",
            sub: [
              {
                id: "6",
                sub: null,
              },
            ],
          },
          {
            id: "5",
            sub: null,
          },
        ],
      },
    ],
  },
  {
    id: "7",
    sub: [
      {
        id: "8",
        sub: [
          {
            id: "9",
            sub: null,
          },
        ],
      },
    ],
  },
  {
    id: "10",
    sub: null,
  },
];


function findPath(data, id) {
  let res = []
  function dfs(child, arr) {
    if (arr[arr.length - 1] === id) {
      res = arr.slice();
      return;
    }
    for (const node of child) {
      const id = node.id;
      arr.push(id);
      dfs(node.sub || [], arr);
      arr.pop();
    }
  }
  dfs(data, []);
  return res;
}

findPath(data, '9'); // ['7', '8', '9']

// 深度优先：先从上到下，然后从左到右遍历。广度优先：先从左到右，然后从上到下遍历

const data2 = [
  {
    name: "a",
    children: [
      { name: "b", children: [{ name: "e" }] },
      { name: "c", children: [{ name: "f" }] },
      { name: "d", children: [{ name: "g" }] },
    ],
  },
  {
    name: "a2",
    children: [
      { name: "b2", children: [{ name: "e2" }] },
      { name: "c2", children: [{ name: "f2" }] },
      { name: "d2", children: [{ name: "g2" }] },
    ],
  },
];

function dfs(data) {
  let res = [];
  for (const child of data) {
    res.push(child.name);
    res = res.concat(dfs(child.children || []));
  }
  return res;
}

dfs(data2)

function bfs(data) {
  let res = [];
  let queue = [];
  for (const child of data) {
    res.push(child.name);
    queue.push(...(child.children || []));
  }
  if (queue.length > 0) {
    res = res.concat(bfs(queue));
  }
  return res;
}

bfs(data2)

// 编写一个函数来查找字符串数组中的最长公共前缀。
// 如果不存在公共前缀，返回空字符串 ""。

function getMaxPrefix(arr) {
  let res = '';
  arr = arr.sort((a, b) => b.length - a.length);
  const flag = arr.pop();
  for (let i = 0; i < flag.length; i++) {
    if (arr.every(item => item[i] === flag[i])) {
      res += flag[i];
    } else {
      break;
    }
  }
  return res;
}

// 给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。

// 子序列 是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如，[3,6,2,7] 是数组 [0,3,1,6,2,2,7] 的子序列。

function getMaxQueue(arr) {
  let res = 0;
  function dfs(ret, idx) {
    res = Math.max(ret.length, res);
    for (; idx < arr.length; idx++) {
      if (ret.length === 0 || arr[idx] > ret[ret.length - 1]) {
        ret.push(arr[idx]);
        dfs(ret, idx + 1);
        ret.pop();
      }
    }
  }
  dfs([], 0);
  return res;
}

// 动态规划
function getMaxQueueByDp(arr) {
  const n = arr.length;
  const dp = new Array(n).fill(1);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[i] > arr[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }
  return Math.max(...dp);
}

// 二分法
function getMaxPrefixByLIS(arr) {
  const top = []; //每堆牌牌顶
  let res = 0; // 牌堆数
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    let left = 0, right = res;
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (top[mid] > item) {
        right = mid
      } else if (top[mid] < item) {
        left = mid + 1
      } else {
        right = mid 
      }
    }
    // 大于所有顶牌 加牌堆
    if (left === res) res++;
    top[left] = item;
  }
  return res;
}

class LRUCache {
  capacity = 0;
  cache = [];
  constructor(capacity) {
    this.capacity = capacity
  }
  findIndex (key) {
    return this.cache.findIndex(item => item.key === key);
  }
  put (key, value) {
    const idx = this.findIndex(key);
    if (idx !== -1) {
      this.cache.splice(idx, 1);
    }
    if (this.cache.length === this.capacity) {
      this.cache.shift();
    }
    this.cache.push({
      key,
      value
    })
  }
  get (key) {
    const idx = this.findIndex(key);
    if (idx !== -1) {
      const data = this.cache[idx];
      this.cache.splice(idx, 1);
      this.cache.push(data);
      return data.value;
    } else {
      return idx;
    }
  }
}

const cache = new LRUCache( 2 /* 缓存容量 */ );
cache.put(1, 1);
cache.put(2, 2);
cache.get(1);       // 返回  1
cache.put(3, 3);    // 该操作会使得密钥 2 作废
cache.get(2);       // 返回 -1 (未找到)
cache.put(4, 4);    // 该操作会使得密钥 1 作废
cache.get(1);       // 返回 -1 (未找到)
cache.get(3);       // 返回  3
cache.get(4);       // 返回  4

// 题目描述
// 给你一个字符串化学式 formula ，返回 每种原子的数量 。

// 原子总是以一个大写字母开始，接着跟随 0 个或任意个小写字母，表示原子的名字。

// 如果数量大于 1，原子后会跟着数字表示原子的数量。如果数量等于 1 则不会跟数字。

// 例如，"H2O" 和 "H2O2" 是可行的，但 "H1O2" 这个表达是不可行的。
// 两个化学式连在一起可以构成新的化学式。

// 例如 "H2O2He3Mg4" 也是化学式。
// 由括号括起的化学式并佐以数字（可选择性添加）也是化学式。

// 例如 "(H2O2)" 和 "(H2O2)3" 是化学式。
// 返回所有原子的数量，格式为：第一个（按字典序）原子的名字，跟着它的数量（如果数量大于 1），然后是第二个原子的名字（按字典序），跟着它的数量（如果数量大于 1），以此类推。

// 输入：formula = "H2O"
// 输出："H2O"
// 解释：原子的数量是 {'H': 2, 'O': 1}。

function countOfAtoms (formula) {
  const formulaMap = {};
  const stack = [];
  const formulaReg = /([A-Z][a-z]*)(\d*)/g
  function getFormulaMap (formulaStr, times = 1) {
    let fornulaMath;
    while (fornulaMath = formulaReg.exec(formulaStr)) {
      const atom = fornulaMath[1];
      const atomCount = Number(fornulaMath[2]) || 1;
      if (formulaMap[atom] !== undefined) {
        formulaMap[atom] += atomCount * times;
      } else {
        formulaMap[atom] = atomCount * times;
      }
    }
  }
  function getStack (formulaStr, times = 1) {
    if (formulaStr === '') return;
    let fornulaMath;
    while (fornulaMath = formulaReg.exec(formulaStr)) {
      const atom = fornulaMath[1];
      const atomCount = Number(fornulaMath[2]) || 1;
      stack.push(`${atom}${atomCount * times}`);
    }
  }
  const formulaArr = formula.split('');
  const len = formulaArr.length;
  let formulaStr = '';
  for (let i = 0; i < len; i++) {
    const item = formulaArr[i];
    if (item === ')') {
      let str = '';
      while (str !== '(') {
        formulaStr = str + formulaStr;
        str = stack.pop();
      }
      let formulaNum = '';
      let j;
      for (j = i + 1; j < len && /\d/.test(formulaArr[j]); ++j) {
        formulaNum += formulaArr[j];
      }
      i = j - 1;
      if (stack.length > 0) {
        getStack(formulaStr, Number(formulaNum) || 1);
        formulaStr = '';
      } else {
        getFormulaMap(formulaStr, Number(formulaNum) || 1);
        formulaStr = '';
      }
    } else if (item === '(' || stack.length > 0) {
      stack.push(item);
      getFormulaMap(formulaStr);
      formulaStr = '';
    } else {
      formulaStr += item;
    }
  }
  getFormulaMap(formulaStr);
    formulaStr = '';
    return Object.entries(formulaMap).sort().map(([atom, count]) => (count === 1 ? atom : `${atom}${count}`)).join('');
}

countOfAtoms('K4(ON(SO3)2)2');

/**
 * 给定一个字符串，全由0或1组成，如果把这个字符串分成左右两拨，左边的0与右边的1数量相加最大，写出实现过程。
如，000111，则分为000，111最优，左边的0是3个，右边的1是3个，所以最大值为6。如果分为00，0111，则左边0是2，右边1是3，相加是5，还没有6大。
 */

function getMaxSum (str) {
  function getNum (str, num) {
    let sum = 0;
    for (let s of str) {
      if (s===num) sum++
    }
    return sum;
  }
  const n = str.length;
  const hasOne = getNum(str, '1');
  let res = hasOne, pre = hasOne;
  for (let i = 0; i < n; i++) {
    const s = str[i];
    sum = pre;
    if (s === '0') {
      sum++;
    } else {
      sum--;
    }
    console.log(sum)
    res = Math.max(res, sum);
    pre = sum;
  }
  return res;
}
getMaxSum('000111')

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
  const n = str.length;
  if (n < 3) {
    return n;
  }
  let count = 0;
  let map = new Map();
  let l = 0, r = 0;
  
  while (r < n) {
    map.set(str[r], map.has(str[r]) ? map.get(str[r]) + 1 : 1);
    if (map.size === 3) {
      count = Math.max(r - l + 1, count);
      while (map.size === 3) {
        map.get(str[l]) > 1 ? map.set(str[l], map.get(str[l]) - 1) : map.delete(str[l]);
        l++
      }
    } 
    r++
  }
  console.log(map);
  return count;
}
getMaxNum('ccaabbb')