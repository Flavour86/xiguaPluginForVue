import { UNINSTALL_URL, VERSION, INSTALL_URL, PLUGIN_URL, VERSION_KEY } from '../constants'
import { setCookie, getCookie } from './utils/cookies'
import { addParam } from '../utils/helpers'

const expirationDate = new Date().getTime() / 1000 + 60 * 60 * 24 * 730
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
          expirationDate
        })
      })
    })
    window.open(url)
  }
}

export default new Install()
