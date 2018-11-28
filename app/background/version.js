import REST from '../utils/rest'
import getApiUrl from '../common/base/api'
import { VERSION } from '../common/base/helpers'

class Version {
  constructor () {
    this.localVersion = VERSION
    this.serverVersion = null
    this.checkVersion()
  }

  checkVersion () {
    new REST([getApiUrl('getVersion')]).GET().then(res => {
      this.serverVersion = res.version
      this.isNeedUpdate = this.formatVersion(res.version) > this.formatVersion()
      if (this.isNeedUpdate) {
        this.switchIcon(this.isNeedUpdate)
      }
    })
  }

  getServerVersion () {
    return this.serverVersion
  }

  getLocalVersion () {
    return this.localVersion
  }

  hasNewVersion () {
    return this.isNeedUpdate
  }

  formatVersion (ver) {
    ver = ver || this.localVersion
    return parseFloat(ver.replace(/\./g, '')) / 1000
  }

  switchIcon (required, { color = '#ef3f3b', text = '新' }) {
    if (required) {
      chrome.browserAction.setBadgeBackgroundColor({
        color
      })
      chrome.browserAction.setBadgeText({
        text
      })
    } else {
      chrome.browserAction.setBadgeText({
        text: ''
      })
    }
  }
}

export default function () {
  return global.versionModule || (global.versionModule = new Version())
}
