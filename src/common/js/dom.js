//  添加该类
export function addClass (el, className) {
  if (hasClass(el, className)) {
    return
  }
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

//  判断DOM是否有该类
export function hasClass (el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

//  获取data-属性
export function getData (el, name, val) {
  const prefix = 'data-'
  name = prefix + name
  if (val) {
    //  如果有val就添加这个val到dom中
    //  name = 'val'
    return el.setAttribute(name, val)
  } else {
    //  没有val，就获取dom中的name
    return el.getAttribute(name)
  }
}

let elementStyle = document.createElement('div').style
//
let vendor = (() => {
  //  定义浏览器前缀
  let transforNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }
  for (let key in transforNames) {
    if (elementStyle[transforNames[key]] !== undefined) {
      return key
    }
  }
  //  如果都不支持，则返回false
  return false
})()

export function prefixStyle (style) {
  if (vendor === false) {
    return false
  }
  //  若是以vendor为标准则不改变style
  if (vendor === 'standard') {
    return false
  }
  //  返回浏览器厂商的前缀+首字母大写
  //  例如: webkit + transform --> webkitTransform
  return vendor + style.charAt(0).toUpperCase() + style.slice(1)
}
