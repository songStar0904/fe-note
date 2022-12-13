### 概念
在处理用户滚动时，只改变列表在可视区域的渲染部分：
- 计算可见区域其实数据索引startIdx和可见区域结束数据索引endIdx（需要处理偏移量）
- 再根据startIdx和endIdx取相应范围的数据，渲染到可视区域

### 布局
- 容器层：选定一个固定高度，也就是可视化窗口
- 内容层：撑开高度，使容器形成scroll
- 子内容层：居于内容层内部，列表中的列表项

### 计算
通过监听容器层scroll事件，获取当前scrollTop，计算出当前startIdx和endIdx
```js
onScroll(e) {
  const {scrollTop} = e.target
  // 定高item
  // scrollTop / item高度 + 偏移数量
  const startIdx = scrollTop/rowHeight - bufferSize
  // 不定高item 二分法
  const startIdx = getStartIndex(scrollTop)
  // 开始位置 + 可视元素数量 + 偏移数量
  const endIdx = Math.min(startIdx + limit + bufferSize, total - 1)
}
getStartIndex(scrollTop) {
  // 使用二分法，找到缓存位置的idx
  let idx = binarySearch(cachedPositions, scrollTop)
  return idx
}
```
1. 定高item，startIdx = scrollTop/rowHeight + bufferSize；endIdx = Math.min(startIdx + limit(可视元素数量) + bufferSize, total - 1)
2. 不定高item 使用二分法去缓存positions里面找到对应idx
从而获取当前显示的list内容，利用requestAnimationFrame限流，提高性能

### 渲染
通过startIdx和endIdx渲染对应数据
```js
renderDisplayContent() {
  const content = []
  for (let i = startIdx; i <= endIdx; ++i) {
    content.push(rowRender({
      index: i,
      style: {
        width: '100%',
        left: 0,
        right: 0,
        position: 'absolute',
        // 不定高度下面不需要
        height: rowHeight,
        top: i * rowHeight
      }
    }))
  }
}
```

### 不定高度
- 使用estimateHeight当作默认高度初始化
- 使用cachedPositions存储元素信息
```ts
interface CachedPosition {
  index: number;         // 当前pos对应的元素的下标
  top: number;           // 顶部位置
  bottom: number;        // 底部位置
  height: number;        // 元素高度
  dValue: number;        // 高度是否和之前(estimate)存在不同
}
```
- 当startIdx发生改变的时候通过getBoundingClientRect获取元素真实高度去更新cachedPositions内容
```js
updateCachedPositions() {
  const nodes = containerRef.current.childNodes
  const start = nodes[0];
  const curCachedPositions = cachedPositions;
  if (!curCachedPositions.length) return;
  nodes.forEach((node: HTMLDivElement) => {
      if (!node) {
        // scroll too fast
        return;
      }
      // 获取真实高度
      const rect = node.getBoundingClientRect();
      const { height } = rect;
      const idx = Number(node.id.split('-')[1]);
      const oldHeight = cachedPositions[idx].height;
      // 设置偏差值
      const dValue = oldHeight - height;
      if (dValue) {
        curCachedPositions[idx].bottom -= dValue;
        curCachedPositions[idx].height = height;
        curCachedPositions[idx].dValue = dValue;
      }
    });
    // 根据更新的height和dValue去更新每个元素的top和bottom
    let startIdx = 0;
    if (start) {
      startIdx = Number(start.id.split('-')[1]);
    }
    const cachedPositionsLen = curCachedPositions.length;
    let cumulativeDiffHeight = curCachedPositions[startIdx].dValue;
    curCachedPositions[startIdx].dValue = 0;
    for (let i = startIdx + 1; i < cachedPositionsLen; i++) {
      const item = curCachedPositions[i];
      curCachedPositions[i].top = curCachedPositions[i - 1].bottom;
      curCachedPositions[i].bottom =
        curCachedPositions[i].bottom - cumulativeDiffHeight;
      if (item.dValue !== 0) {
        cumulativeDiffHeight += item.dValue;
        item.dValue = 0;
      }
    }
    setCachedPositions(curCachedPositions);
    // 根据最后一个元素bottom更新列表总高度
    const phantomHeight = curCachedPositions[cachedPositionsLen - 1].bottom;
    setphantomHeight(phantomHeight);
}
```
- 最后去修改内容层transform y轴偏移量
```js
// 设置包裹容器偏移位置
  const transform = useMemo(
    () =>
      `translate3d(0, ${
        startIdx >= 1 ? cachedPositions[startIdx - 1].bottom : 0
      }px, 0)`,
    [cachedPositions, startIdx]
  );
```

### 性能优化
- requestAnimationFrame
重复调用scrollHandle函数，让浏览器在下一次重绘之前执行函数，可以确保不会出现丢帧现象
- will-change: transform;
让浏览器预知transform改变，提前做好准备。待需要改变元素的时机到来时，就可以立刻实现它们。从而避免卡顿等问题。