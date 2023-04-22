# webpack

## loader vs plugin

loader: 它是一个转换器，将A文件进行编译成B文件，比如将A.less转换成A.css，单纯的文件转换过程。
plugin：是一个扩展器，它丰富了webpack本身，针对loader结束后，webpack打包整个过程，它并不直接操作文件，而是基于事件机制工作，会监听到webpack打包过程中的某个节点，执行广泛的任务。比如打包优化，文件管理，环境注入等

## 热更新原理

1. 当修改了一个或多个文件，文件系统接受更改并通知webpack
2. webpack重新编译构建一个或者多个模块，通知HMR服务器进行更新
3. HMR Server 使用webSocket通知HMR runtimer 需要更新，HMR运行时通过HTTP请求更新jsonp
4. HMR 运行时替换更新中的模块，如果确定这些模块无法更新，则触发整个页面更新

## 插件

### compression-webpack-plugin 打包压缩

```js
const CompressionPlugin = require('compression-webpack-plugin')
new CompressionPlugin({
  test: /\.js$|\.html$|\.css/, // 匹配文件名
  threshold: 10240, // 对超过10k的数据进行压缩
  deleteOriginalAssets: false, // 是否删除原文件
})
```

### splitChunks 代码切割

[Webpack 大法之 Code Splitting](https://zhuanlan.zhihu.com/p/26710831)

```js
config.optimization.splitChunks({
  chunks: 'all',
  cacheGroups: {
    libs: {
      name: 'chunk-libs',
      test: /[\\/]node_modules[\\/]/,
      priority: 10,
      chunks: 'initial',
    },
    elementUI: {
      name: 'chunk-elementUI',
      priority: 20,
      test: /[\\/]node_modules[\\/]_?element-ui(.*)/,
    },
    commons: {
      name: 'chunk-commons',
      test: resolve('src/components'),
      minChunks: 1,
      priority: 10,
      reuseExistingChunk: true,
    },
  },
})
```

### webpack-bundle-analyzer 打包分析

```js
/* 添加分析工具 */
if (process.env.NODE_ENV === 'production') {
  if (process.env.npm_config_report) {
    config
      .plugin('webpack-bundle-analyzer')
      .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
      .end()
  }
}
```
