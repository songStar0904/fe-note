function timeFormat(date = new Date(), fmt = 'yyyy-mm-d') {
  let ret
  let opt = {
    'y+': date.getFullYear().toString(),
    'm+': (date.getMonth() + 1).toString(),
    'd+': date.getDate().toString(),
    'h+': date.getHours().toString(),
    'M+': date.getMinutes().toString(),
    's+': date.getSeconds().toString(),
    'w+': ['日', '一', '二', '三', '四', '五', '六'][date.getDay()]
  }
  for (let k in opt) {
    ret = new RegExp('(' + k + ')').exec(fmt)
    if (ret) {
      fmt = fmt.replace(ret[1], ret[1].length === 1 ? opt[k] : opt[k].padStart(ret[1].length, '0'))
    }
  }
  return fmt
}