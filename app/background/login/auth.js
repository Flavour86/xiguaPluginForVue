import { storage } from '../../common/cache'

const USER_KEY = 'USER_INFO'
const LOGIN_STATE = 'LOGIN_STATE'
let authObj
export default {
  isLogin: function () {
    return this.getLoginStatus()
  },

  setAuth: function (auth) {
    authObj = auth

    if (auth === null) {
      storage.remove(USER_KEY)
    } else {
      storage.set(USER_KEY, auth)
    }
  },

  getAuth: function () {
    let auth = authObj
    if (!auth) {
      auth = storage.get(USER_KEY)
      if (auth) {
        authObj = auth
      }
    }

    if (auth) {
      const args = Array.prototype.slice.call(arguments)
      let key

      while ((key = args.shift()) && auth) {
        auth = auth[key]
      }
    }
    return auth
  },

  getLoginStatus () {
    return storage.get(LOGIN_STATE)
  },

  setLoginStatus (status) {
    storage.set(LOGIN_STATE, status)
  },

  destroy: function () {
    this.setAuth(null)
  }
}
