import originJSONP from 'jsonp'
//  jsonp封装
//  url:  将后端返回的data拼到url上面
//  query:
//
export default function jsonp(url, data, option) {
  //  若url没有问号就加入一个&
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  return new Promise((resolve, reject) => {
    originJSONP(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

function param (data) {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += `&${k}=${encodeURIComponent(value)}`
  }
  //  若url有的话去掉第一个&
  return url ? url.substring(1) : ''
}
