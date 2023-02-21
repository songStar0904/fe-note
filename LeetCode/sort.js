/**
 * --- 测试用例 ---
 *
 * 输入：[1, 34, 5, 76, 8, 6, 9, 7, 6, 3]
 * 输出：[1, 3, 5, 6, 6, 7, 8, 9, 34, 76]
 *
 * --- 说明 ---
 * 排序步骤：
 * 1. 从序列中挑出中间一个元素，作为基准base
 * 2. 重新排列数列，所有元素比基准小的放至基准前面，比基准大的放至基准后面。
 * 3. 递归把小于基准的元素的里序列和大于基准值的子序列排序
 * 思考：快速排序是稳定的吗？
 * 解答：base 的每次选择，会导致快排是不稳定排序。
 * 平均复杂度O(nlogn)最好情况O(nlogn)最坏情况o(n^2)
 */

const quickSort = (nums) => {
  let len = nums.length
  if (len < 2) {
    return nums
  } else {
    var left = []
    var right = []
    var pivot = Math.floor(len / 2) // 向下取整
    var base = nums.splice(pivot, 1)[0] // 原数组nums少了一个
    for (let i = 0; i < len - 1; i++) {
      let tem = nums[i]
      if (tem < base) {
        left.push(tem)
      } else {
        right.push(tem)
      }
    }
  }
  return [...quickSort(left), base, ...quickSort(right)]
}

/**
 * --- 测试用例 ---
 *
 * 输入：[5, 2, 4, 7, 9, 8, 3, 6, 3, 8, 3]
 * 输出：[2, 3, 3, 3, 4, 5, 6, 7, 8, 8, 9]
 *
 * --- 说明 ---
 * 排序步骤：
 * 1. 比较相邻元素，根据大小交换，对每一个相邻元素作同样的工作，从开始第一对到结尾最后一对这样最后元素最大数，
 * 2. 持续每次对越来越少元素做重复上面步骤，直到没有任何一堆数字需要比较
 * 思考：冒泡排序是稳定的吗？
 * 解答：稳定。相等的元素不发生交换
 * 平均时间复杂度O(n^2) 最好情况O(n) 最坏情况O(n^2)
 */
const bubbleSort = (nums) => {
  let len = nums.length
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i; j++) {
      if (nums[j] > nums[j + 1]) {
        let tem = nums[j]
        nums[j] = nums[j + 1]
        nums[j + 1] = tem
      }
    }
  }
  return nums
}

/**
 * 合并排序
 * 排序步骤：
 * 1. 申请空间，使其大小未两个已经排序序列之和，该空间用来放至合并后的序列
 * 2. 指定两个指针，最初位置分别未两个已经排序的起始位置
 * 3. 比较两个指针所指向的元素，选择相对小的元素放入合并空间，并移动指针到下一个元素
 * 4. 重复步骤3直到某一指针达到序列尾
 * 5. 将另一序列剩下的所有元素复制到合并序列尾
 * 均复杂度O(nlogn)最好情况O(nlogn)最坏情况o(nlogn)
 */

const mergeSort = (nums) => {
  const merge = (l, r) => {
    let res = [], n1 = l.length, n2 = r.length, i = 0, j = 0
    while(i < n1 && j < n2) {
      if (l[i] <= r[j]) {
        res.push(l[i])
        i++
      } else {
        res.push(r[j])
        j++
      }
    }
    return res.concat(l.slice(i)).concat(r.slice(j))
  }
  let n = nums.length
  if (n < 2) return nums
  let mid = Math.floor(n / 2)
  let left = nums.slice(0, mid), right = nums.slice(mid)
  return merge(mergeSort(left), mergeSort(right))
}

mergeSort([5, 2, 4, 7, 9, 8, 3, 6, 3, 8, 3])

/**
 * --- 测试用例 ---
 *
 * 输入：[6, 45, 3, 2, 5, 6, 8, 4, 3, 4, 56, 67, 5]
 * 输出：[2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 45, 56, 67]
 *
 * --- 说明 ---
 * 排序步骤：
 * 1. 首先在莫排序序列中找到最小元素，存放到排序序列其实位置
 * 2. 再从剩余未排序元素中继续寻找最小元素，然后放到已排序序列末尾
 * 3. 重复第二步，直到所有元素排序完成
 * 思考：选择排序是稳定的吗？
 * 解答：要看代码是如何实现的，在本例中由于有交换，所以是不稳定排序。
 * 平均时间复杂度O(n^2) 最好情况O(n^2) 最坏情况O(n^2)
 */

const selectSort = (nums) => {
  let n = nums.length
  let min = Infinity, tem, flag
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      if (min > nums[j]) {
        min = nums[j]
        flag = j
      }
    }
    tem = nums[i]
    nums[i] = min
    nums[flag] = tem
    min = Infinity
  }
  return nums
}
selectSort([6, 45, 3, 2, 5, 6, 8, 4, 3, 4, 56, 67, 5])

/**
 * 插入排序
 * 排序步骤：
 * 1. 将第一待排序列第一个元素看作有序序列，把第二个元素到最后元素当成未排序序列
 * 2. 从头到尾一次扫描未排序序列，将排序道德为个元素插入有序序列适当位置。
 * 平均时间复杂度O(n^2) 最好情况O(n^2) 最坏情况O(n^2)
 */


const insertSort = (nums) => {
  const n = nums.length
  let preIdx, cur
  for (let i = 1; i < n; i++) {
    preIdx = i - 1
    cur = nums[i]
    while (preIdx >= 0 && nums[preIdx] > cur) {
      nums[preIdx + 1] = nums[preIdx]
      preIdx--
    }
    nums[preIdx + 1] = cur
  }
  return nums
}

/**
 * --- 题目描述 ---
 * 
 * 实现一个函数，可以对 url 中的 query 部分做拆解，返回一个 key: value 形式的 object  
 * 
 * --- 实例 ---
 * 
 * 输入：'http://sample.com/?a=1&e&b=2&c=xx&d#hash' 
 * 输出：{a: 1, b: 2, c: 'xx', d: ''}  
 */
 function getQueryObj(url) {
  // TODO
  let arr = url.split('?')[1].split('#')[0].split('&');
  const res = {};
  arr.forEach(e => {
      const [key, value] = e.split('=');
      if (!value) {
          res[key] = '';
      } else {
          res[key] = value;
      }
  })
  return res;
}

function getQueryObj(url) {
  let res = {}
  let reg = /([^?&=]+)=([^?&=]*)/g // 除?&= + 1次或多次 * 0次或多次
  url.replace(reg, (rs, $1, $2) => {
    console.log(rs, $1, $2)
    res[decodeURIComponent($1)] = decodeURIComponent($2)
  })
  return res
}

getQueryObj('https://www.baidu.com?a=1&b=2')