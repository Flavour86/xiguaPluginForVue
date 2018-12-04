import auth from '../authentization/auth'
import getAuthModule from '../authentization'
import { COMMON_STATUS } from '@/constants'

const authModule = getAuthModule()
export const getLoginState = (message, sender, sendResponse) => {
  sendResponse({
    msg: COMMON_STATUS.SUCCESS,
    // noTicket: GLOBAL.global.TICKET.ticket == '' ? true : false,    //vuepop页面判断用户是否点击登录
    loginState: auth.getLoginStatus(),
    user: auth.getAuth()
  })
}

export const getQrCodeTicket = (message, sender, sendResponse) => {
  authModule.getLoginTicket().then(res => {
    const { data } = res
    sendResponse({
      msg: COMMON_STATUS.SUCCESS,
      ticket: data.ticket,
      qrCodeUrl: data.qrCodeUrl
    })
  })
}
