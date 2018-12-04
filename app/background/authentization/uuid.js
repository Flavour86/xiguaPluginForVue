import { storage } from 'common/cache'
import { setCookie, getCookie } from '../utils/cookies'
import { PLUGIN_URL, EXPIRATION_DATE } from '@/constants'
import isFunction from 'lodash/isFunction'

const MachineKey = 'pluginUuid'
function getUuid () {
  var s = []
  var hexDigits = '0123456789abcdef'
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-'

  var uuid = s.join('')

  return uuid
}

// 生成唯一uuid【Ma】
const getUid = cb => {
  let uuid = storage.get('uuid')
  if (uuid) {
    setCookie({
      url: PLUGIN_URL,
      name: MachineKey,
      value: uuid,
      expirationDate: EXPIRATION_DATE
    })
    isFunction(cb) && cb(uuid)
    return
  }
  getCookie(PLUGIN_URL, MachineKey, cookie => {
    if (cookie) {
      uuid = cookie.value
    } else {
      uuid = getUuid()
      storage.set('uuid', uuid)
      setCookie({
        url: PLUGIN_URL,
        name: MachineKey,
        value: uuid,
        expirationDate: EXPIRATION_DATE
      })
    }
    isFunction(cb) && cb(uuid)
  })
}

export default getUid
