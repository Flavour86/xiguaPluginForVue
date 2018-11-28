export const encode = window.encodeURIComponent

export const addParam = (url, params) => {
  let arr = Object.keys(params).map(key => encode(key) + '=' + encode(params[key])).join('&')

  if (!arr) {
    return url
  }

  return url + (url.indexOf('?') !== -1 ? '&' : '?') + arr
}
