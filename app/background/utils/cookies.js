import { PLUGIN_API_HOST } from '../../constants'
import isFunction from 'lodash/isFunction'

const userKey = 'userkey'
export const setCookie = (val = {}) => {
  chrome.cookies.set(val)
}

export const getCookie = (url, name, cb) => {
  chrome.cookies.get({
    url,
    name
  }, function (res) {
    isFunction(cb) && cb(res)
  })
}

export const removeCookie = (name, _url) => {
  chrome.cookies.remove({
    'url': _url,
    'name':name
  })
}

export const setUserKeyCookie = (val) => {
  setCookie({
    'url': PLUGIN_API_HOST,
    'name': userKey,
    'value': val,
    'expirationDate': new Date().getTime() + 360 * 24 * 60 * 1000
  })
}

export const removeUserKeyCookie = () => {
  removeCookie(userKey, PLUGIN_API_HOST)
}
