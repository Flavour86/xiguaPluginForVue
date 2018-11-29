import md5 from 'md5'

export const ug = () => {
  const reg = /OS ((\d+_?){2,3})\s/
  if (navigator.userAgent.match(/iPad/i) || navigator.platform.match(/iPad/i) || navigator.userAgent.match(/iP(hone|od)/i) || navigator.platform.match(/iP(hone|od)/i)) {
    let osv = reg.exec(navigator.userAgent)
    if (osv.length > 0) {
      return osv[0].replace('OS', '').replace('os', '').replace(/\s+/g, '').replace(/_/g, '.')
    }
  }
  return ''
}

export const aip = () => ''

/*
 *md5验证
 */
const key = navigator.userAgent.substring(navigator.userAgent.length - 4, navigator.userAgent.length)
export const getSign = (obj, ip, ug) => {
  function objToString (newObj) {
    let valString = ''
    for (let item in newObj) {
      valString += newObj[item]
    }
    return valString
  }

  function objKeySort (obj) {
    const keys = Object.keys(obj).sort()
    let newObj = {}
    for (let i = 0; i < keys.length; i++) {
      newObj[keys[i]] = obj[keys[i]]
    }
    return newObj
  }
  const newObj = objKeySort(obj)
  const valString = objToString(newObj)
  const sd = valString + key
  const sign = md5(sd)
  return sign.substring(sign.length - 4, sign.length)
}
