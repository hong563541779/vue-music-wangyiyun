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
