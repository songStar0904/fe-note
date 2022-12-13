### 性能指标
- FP 首次绘制（First Paint）
用于记录页面第一次绘制像素时间，如页面背景色
- FCP 首次内容绘制（First contentful paint）
用于记录页面首次绘制文本，图片，非空白Canvas或SVG时间（FP和FCP时白屏时间相关的指标）
- LCP 最大内容绘制（Largest contentful paint）
用于记录视窗内最大的元素绘制时间，该事件会随着页面渲染变化而变化，
- FID 首次输入延迟（First input delay）
记录FCP和TTI之间用户首次与页面交互时响应的延迟
- TTI 可交互时间（Time to Interactive）
指标计算过程：
1. 从FCP指标后开始计算
2. 持续5秒内无长任务（执行时间超过50ms）且无两个以上正在进行中的GET请求
3. 往前回溯至5秒前的最后一个长任务结束时间
- TBT 总阻塞时间（Total blocking time）
记录FCP到TTI之间所有长任务的阻塞时间总和
- CLS 累计布局偏移（Cumulative layout shift）
记录页面上非预期的位移波动（页面渲染中突然插入一张巨大的图片或者说点击了某个按钮突然动态插入一块内容等等相关影响用户体验的网站。计算方式：位移影响的面积*位移距离）

### 页面渲染过程
#### DNS解析
- DNS预解析
大型网站，有多个不同服务器资源的情况下，都可以采取DNS与解析，提前解析，减少页面卡顿
```html
<link rel="dns-prefetch" href="//g.alicdn.com">
```
- DNS负载均衡
当一个网站有多个服务器地址时，在应答DNS查询的时候，DNS服务器会对每个查询返回不同的解析结果，也就是返回不同的IP地址，从而把访问引导到不同的服务器上去，来达到负载均衡的目的。

#### http请求

- 开启HTTP2
1. http2采用二进制分帧的方式进行通信，http1用文本，http2效率更高
2. http2可以进行多路复用，将数据以帧的形式传输，再组装，不需要等待上一个帧发送完。
3. http2可以头部压缩，节省消息头占用的网络流量
4. http2可以进行服务端推送。可以主动推送html中的js和css资源，减少请求耗时

#### 重绘与回流
- 重绘
页面元素样式的改变不会影响它再文档流中位置（color，backgroupd-color，shadow，visibility）
- 回流
元素尺寸，结构或某些属性发生变化时，浏览器重新渲染部分或者全部文档的过程

1. 静态资源使用CDN
内容分发网络（CDN）是一组分布在多个不同地理位置的WEB服务器。减少带宽，负载均衡
2. 防止脚本阻塞
将 CSS 放在文件头部，JavaScript 文件放在底部
- CSS执行会阻塞渲染，阻止JS执行
- JS加载和执行会阻塞HTML解析和阻止CSSOM构建
3. 图片优化
- 压缩图片
- 图片延迟加载
- 响应式图片
- 使用webp格式图片
4. 压缩文件
- Javascript： UglifyPlugin
- CSS：MiniCssExtractPlugin
- HTML：HtmlWebpackPlugin
使用gzip压缩可以通过HTTP请求头中的Accept-Encoding头添加gzip标识来开启这一功能。服务器也得支持这一功能
5. 减少重绘重排
CSS：
- 避免使用table
- 尽可能再DOM树末端改变class？
- 避免设置多层内联样式
- 将动画效果应用到position属性为absolute或fixed元素上
- 避免使用CSS表达式（calc）
- will-change 开启GPU加速
JS：
- 避免频繁操作样式，最好一次性重写style属性或者将样式列表定义为class并一次性更改class属性
- 避免频繁操作DOM，创建一个documentFragment，在它上面应用所有DOM操作，最后再把它添加到文档中
- 也可以先为元素设置display：none，让元素脱离文档流，操作结束后再把它显示出来。
- 避免频繁读取会引发重绘回流的属性，如果确实需要多次使用，使用变量缓存起来
- 对复杂动画元素使用绝对定位，使它脱离文档流。
6. 代码分割，按需加载
- 路由级别分割
- 组件级别分割
7. tree shaking
通过程序流分析找出代码中无用的代码并剔除。
8. 骨架屏
9. 服务端渲染
服务端返回HTML文件，客户端只需要解析HTML
优点：首屏渲染快，SEO好
缺点：配置麻烦，增加服务器计算压力

