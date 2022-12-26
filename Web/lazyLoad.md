## 图片懒加载
[图片懒加载](https://juejin.cn/post/7100739752982216734#heading-1)
### 为什么需要图片懒加载
在老版本浏览器中，图片的加载其实是会阻塞DOM渲染的，在我们现代浏览器中，这点基本不用担心了，也就是说现在图片加载不会阻止DOM渲染，但是每个图片都会对应一个HTTP请求，而浏览器允许同时并发请求的数量是有限的，网站加载时间会很长，用户体验很差，为了提高用户体验，所以出现了懒加载，用来减轻服务器压力，优先加载可视区内容，其他部分等进入可视区再加载，从而提高性能

### 原理
主要就是判断元素是否进入可视区，进入可视区再去请求对应的图片，否则显示一张占位图。
**getBoundingClientRect**
返回一个DOMRect对象，使用top和bottom来判断是否可视。
top：元素顶部距离窗口顶部距离
bottom：元素底部距离窗口顶部距离
```js
const rect = dom.getBoundingClientRect()
if (rect.top <= domHeight && rect.bottom >= 0) {
  // visible
}
```
监听滚动变化（需要使用节流或requestAnimationFrame），当滚动到可视区，将data-src属性替换src属性
```html
<img src="default.png" data-src="real.png" >
```

**IntersectionObserver**
```js
function lazyLoad() {
  const observer = new IntersectionObserver((entries, observe) => {
    entries.forEach(item => {
      const target = item.taget
      if (item.isIntersecting && target.dataset.src) {
        target.src = target.dataset.src
        target.removeAttribute('data-src')
        observe.unobserve(target)
      }
    })
  })
  const imgs = document.querySelectorAll('.img_box')
  imgs.forEach(img => {
    observer.observe(img)
  })
}
```