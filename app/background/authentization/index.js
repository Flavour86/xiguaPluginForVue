import auth from './auth'
import getUid from './uuid'
import { VERSION, getApiUrl } from 'common/base'
import { removeUserKeyCookie, setUserKeyCookie } from '../utils/cookies'
import REST from 'utils/rest'
import { ug, aip, getSign } from '../utils/helpers'

class Login {
  constructor () {
    getUid(this.checkLoginState.bind(this))
  }

  checkLoginState (uuid) {
    this.uuid = uuid
    const userInfo = auth.getAuth()
    if (userInfo) {
      const { userKey } = userInfo
      const url = getApiUrl('checkLoginState')
      new REST([url]).GET({
        params: {
          userKey
        },
        headers: {
          signature: getSign({ userKey }, aip(), ug()),
          MachineKey: uuid,
          userkey: userKey,
          version: VERSION
        }
      }).then(res => {
        auth.setLoginStatus(res)
        if (!res.isLogin) {
          auth.destroy()
          removeUserKeyCookie()
          return
        }
        setUserKeyCookie(userKey)
      })
    }
  }

  getLoginTicket () {
    const url = getApiUrl('getQrcode')
    return new REST([url]).GET({
      pluginVersion: VERSION,
      signature: getSign('', aip(), ug()),
      MachineKey: this.uuid
    })
  }
}

export default function () {
  return global.authModule || (global.authModule = new Login())
}
