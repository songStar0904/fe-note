// 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。

// 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
function climbStairs(n: number) {
  if (n < 1) return 0;
  const dp: number[] = [];
  dp[1] = 1, dp[2] = 2
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }
  return dp[n];
}

function climbStairs2(n: number) {
  if (n < 1) return 0;
  if (n === 1 || n === 2) return n;
  let a = 1, b = 2, temp = 0;
  for (let i = 3; i <= n; i++) {
    temp = a + b;
    a = b;
    b = temp;
  }
  return temp;
}