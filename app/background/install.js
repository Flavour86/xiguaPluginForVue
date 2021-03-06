import { UNINSTALL_URL, INSTALL_URL, PLUGIN_URL, VERSION_KEY, EXPIRATION_DATE } from '@/constants'
import { VERSION } from '../common/base/helpers'
import { setCookie, getCookie } from './utils/cookies'
import { addParam } from '../utils/helpers'

class Install {
  constructor () {
    chrome.runtime.onInstalled.addListener(this.installed.bind(this))
    this.onUnInstall()
  }

  onUnInstall () {
    const _url = UNINSTALL_URL + '?version=' + VERSION + '&type=cv&date=' + new Date().getTime()
    // removeUserKeyCookie()
    chrome.runtime.setUninstallURL(_url)
  }

  installed (info) {
    const { reason, previousVersion } = info
    const params = {
      version: VERSION
    }
    reason && (params.reason = reason)
    previousVersion && (params.previousver = previousVersion)
    const url = addParam(INSTALL_URL, params)
    getCookie(PLUGIN_URL, VERSION_KEY.LOCAL, res => {
      const keyArr = [{
        key: VERSION_KEY.LOCAL,
        value: VERSION
      }, {
        key: VERSION_KEY.INSTALL,
        value: VERSION
      }]
      if (res && res.value && res.value !== VERSION) {
        keyArr.push({
          key: VERSION_KEY.OLD,
          value: res.value
        })
      }
      keyArr.forEach(keyItem => {
        setCookie({
          url: PLUGIN_URL,
          name: keyItem.key,
          value: keyItem.value,
          expirationDate: EXPIRATION_DATE
        })
      })
    })
    __PROD__ && window.open(url)
  }
}

export default new Install()
