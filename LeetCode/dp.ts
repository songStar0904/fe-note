// 动态规划

function getMaxGold(n: number, w: number, g: number[], p: number[]) {
  const dp: number[][] = [];
  for (let i = 0; i <= w; i++) {
    if (w < p[0]) {
      dp[1][w] = 0;
    } else {
      dp[1][w] = g[0];
    }
  }
}