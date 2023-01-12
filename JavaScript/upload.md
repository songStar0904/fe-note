### 实现一个upload
[字节跳动面试官：请你实现一个大文件上传和断点续传](https://juejin.cn/post/6844904046436843527)

### 大文件上传
- 前端上传大文件时使用Blob.prototype.slice将文件切片，并发上传多个切片，最后发送一个合并的请求通知服务端合并切片
- 服务端接受切片并存储，收到合并请求后使用流将切片合并到最终文件
- 元素XMLHttpRequest的upload.onprogress对切片上传进度进行监听

```html
<input type="file" />
```

### 上传切片
- 对文件进行切片
- 将切片传输给服务器
```js
// 生成文件切片
createFileChunk(file, size) {
  const fileChunkList = []
  let cur = 0
  while(cur < file.size) {
    fileChunkList.push({ file: file.slice(cur, cur + size) })
    cur += size
  }
  return fileChunkList
}
// 上传切片
async uploadChunks() {
  const requestList = this.data.map(({chunk, hash}) => {
    const formData = new FormData()
    formData.append('chunk', chunk)
    formData.append('hash', hash)
    formData.append('filename', this.container.file.name)
    return { formData }
  }).map(({formData}) => this.request({
    url: 'http://localhost:3000',
    data: formData
  }))
  // 并发请求
  await Promise.all(requestList)
  // 发起合并请求
  await this.mergeRequest()
}
// 发起请求
async handleUpload() {
  const fileChunkList = this.createFileChunk(this.container.file)
  this.data = fileChunkList.map(({ file }, index) => ({
    chunk: file,
    hash: this.container.file.name + '-' + index
  }))
  await this.uploadChunks()
}
```

### 断点续传
- 使用spark-md5根据文件内容算出文件hash
- 通过hash可以判断服务端时候已经上传该文件，从而直接提示用户上传成功（秒传）
- 通过XMLHttpRequest的abort方法暂停切片的上传
- 上传前服务端返回已经上传的切片名，前端跳过这些切片的上传

原理在于前端/服务器需要记住已上传的切片，这样下次上传就可以跳过之前已上传的部分。
- 前端使用localStorage记录已上传的切片hash（有个缺陷：换个浏览器就失效）
- 服务端保存已上传的切片hash，前端每次上传前向服务端获取已上传切片（根据文件内容生成hash）

#### 暂停上传
暂停 === 断点。原理使用XMLHttpRequest的abort方法，可以取消一个xhr请求的发送，需要将上传每个切片的xhr对象保存起来，并对为请求完的xhr进行abort暂停。

### 恢复上传
由于当文件切片上传后，服务端会建立一个文件夹存储所有上传的切片，所以每次前端上传前可以调用一个接口，服务端将已上传的切片的切片名返回，前端再跳过这些已经上传切片，这样就实现了“续传”的效果

前端每次上传前发送一个验证的请求，返回两种结果
- 服务端已存在该文件，不需要再次上传
- 服务端不存在该文件或者已上传部分文件切片，通知前端进行上传，并把已上传的文件切片返回给前端
