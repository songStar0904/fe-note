## 盒模型

- 标准盒模型(width=content)
```css
box-sizing: content-box;
```
- IE盒模型(width=content+padding+border)
```css
box-sizing: border-box;
```

## BFC(Block Formatting Context块级格式化上下文)

// BFC 块级格式化上下文，会产生一个BFC盒子
// 内部盒子依次垂直排列
// 盒子不会与float box 重叠
// 盒子里面无论怎么变化都不会影响盒子外，反之亦然
// 1. float 不为none
// 2. position: absolute/fixed
// 3. display: inline-block table table-cell
// 4.  overflow 部位 visible;
// 5. 根元素
// margin 重叠
// float 塌陷 计算高度内容
// 自适应多栏布局 (BFC的区域不会与float box重叠。因此，可以触发生成一个新的BFC)

### 特性

1. BFC可以看作一个独立的容器，容器内部元素不会影响区块外部元素。
2. BFC里面的元素从左到右，从上到下依次排序。
3. 同一个BFC，相邻的元素`margin`会发生重叠。（将内部元素也创建BFC）
4. BFC里面如果有`float`元素，也可以撑开，避免高度坍塌。（处理浮动问题）
5. 每个元素的左外边距与包含块的左边界相接触，即使浮动元素也一样

### 创建BFC

1. 根元素
2. float属性部位none。
3. position属性值为absolute或者fixed。
4. display为 inline-block，flow-root，table-cell，table-caption以及table相关属性。
5. overflow属性值部位visible。

## visibility: hidden 和 display: none 和 opacity: 0 有什么区别

### visibility: hidden

元素还是会渲染在文档流中，不会更改页面的布局，此时可以通过设置子元素visibility: visible 来控制子元素的展示，click事件不会触发。

### display: none

元素包含子元素直接从HTML文档流删除，不参与排版，绑定的click事件也会丢失。

### opacity: 0

元素还在文档流中，不能控制子元素展示，绑定的click事件可以触发。

## 块级元素，行内元素，行内块级元素

### 块级元素

自动占据一行，可以设置宽高。
div, p, h1-h6, ul, li, form, table

### 行内元素

占据一行的一小部分，多个行内元素水平排版，无法设置宽高
span, img（可设置宽高，是可替换元素）, a

### 行内块级元素

根行内元素类似，不过可以设置宽高
button, input, select, label, textarea

## 可替换元素

在CSS中，可替换元素的展示效果不是由CSS来控制的。这些元素是一种外部对象，他们外观的渲染时独立于CSS。浏览器根据元素的标签和属性，来决定元素的具体显示内容。
简单来说，它们的内容不受当前文档的样式的影响。CSS可以影响可替换元素的位置，但不会影响到可替换元素自身的内容。
iframe, video, embed, img
可替换元素的性质同设置了display:inline-block的元素一致。这些元素往往没有实际的内容，即是一个空元素。

### 不可替换元素

行内不可替换元素的外边距不会改变该元素的行高。
padding-top / padding-bottom / margin-top / margin-bottom 不影响结果

margin-top / margin-bottom 无效
padding-top / padding-bottom 有效，但不影响结果（会重叠）

## 伪元素和伪类

### 伪元素

对选择元素的指定部分进行修改样式
:before, :after, :first-line

### 伪类

对选择元素的特殊状态进行修改样式
:hover, :active, :checked, :focus, :first-child

## will-change
​will-change通过告知浏览器该元素会有哪些变化，使浏览器提前做好优化准备，增强页面渲染性能。
- auto: 实行标准浏览器优化
- scroll-position: 表示开发者希望不久后改变滚动条位置或者使之产生动画
- contents：表示开发者希望不久后改变元素内容中的某些东西或者使他们产生动画
- <custom-ident>: 表示开发者希望在不久后改变指定的属性名或者使之产生动画，比如transform 或 opacity。
须知：
1. 不要将will-change应用到太多元素上，如果过度使用的话可能导致页面响应缓慢或者消耗更多资源
2. 通常，当元素恢复到初始状态时，浏览器会丢弃掉之前做的优化工作。但是如果直接在样式表中显式声明了 will-change 属性，则表示目标元素可能会经常变化，浏览器会将优化工作保存得比之前更久。所以最佳实践是使用完后及时清除。
3. 如果你的页面在性能方面没什么问题，则不要添加 will-change 属性来榨取一丁点的速度。will-change 的设计初衷是作为最后的优化手段，用来尝试解决现有的性能问题，它不应该被用来预防性能问题。