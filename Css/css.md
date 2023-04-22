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

### 特性

1. BFC可以看作一个独立的容器，容器内部元素不会影响区块外部元素。
2. BFC里面的元素从左到右，从上到下依次排序。
3. 同一个BFC，相邻的元素`margin`会发生重叠。（将内部元素也创建BFC）
4. BFC里面如果有`float`元素，也可以撑开，避免高度坍塌。（处理浮动问题）
5. 每个元素的左外边距与包含块的左边界相接触，即使浮动元素也一样

### 创建BFC

1. 根元素
2. float属性不为none。
3. position属性值为absolute或者fixed。
4. display为 inline-block，flow-root，table-cell，table-caption以及table相关属性。
5. overflow属性值不为visible。

### 应用场景
1. 防止margin 重叠
2. float 塌陷 计算高度内容
3. 自适应多栏布局 (BFC的区域不会与float box重叠。因此，可以触发生成一个新的BFC)

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

### px em rem vh,vw

- px
绝对单位，页面按精确像素展示
- em
相对单位，基准点为父节点字体大小，如果自身定义了font-size按自身计算，整个页面内1em不是一个固定值
- rem
相对单位，可以理解为root em，相对根节点html字体大小来计算
- vh，vw
主要用于页面视口大小布局

### flex

#### 容器属性
- flex-direction
控制主轴排列方向(row | row-reverse | column | column-reverse)
- flex-wrap
控制换行(nowrap | wrap | wrap-reverse)
- flex-flow
flex-direction属性和flex-wrap属性的简写形式
- justify-content
主轴对齐方式
- align-items
交叉轴对齐方式
- align-content
多根主轴对其方式，如果只有一根，则不起作用

#### 容器成员属性
- order
排序，数值越小越靠前，默认0
- flex-grow
容器不换行时，容器不够分，放大比例。默认0，存在剩余空间也不放大
- flex-shrink
缩放比例，默认1，空间不足将缩小
- flex-basis
设置元素在主轴上初始尺寸，所谓的初始尺寸就是元素在flex-grow和flex-shrink生效前的尺寸，优先级比width、height小。默认auto
- flex
flex-grow flex-shrink flex-basis 缩写
flex: 1 = flex: 1 1 0% 等分布局
flex: 2 = flex: 2 1 0%
flex: auto = flex: 1 1 auto 基于内容动态适配的布局
flex: none = flex: 0 0 auto，常用于固定尺寸不伸缩

flex:1 和 flex:auto 的区别，可以归结于flex-basis:0和flex-basis:auto的区别

当设置为0时（绝对弹性元素），此时相当于告诉flex-grow和flex-shrink在伸缩的时候不需要考虑我的尺寸

当设置为auto时（相对弹性元素），此时则需要在伸缩时将元素尺寸纳入考虑，

- align-self
允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性


### 实现等比例并排布局
- float + 百分比
- 行内块级元素 + 百分比
- flex 1
- grid grid-template-columns: 25% 25% 25% 25%;