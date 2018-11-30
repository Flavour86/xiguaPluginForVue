import auth from '../login/auth'

export const getLoginState = (message, sender, sendResponse) => {
  sendResponse({
    errmsg: 'ok',
    // noTicket: GLOBAL.global.TICKET.ticket == '' ? true : false,    //vuepop页面判断用户是否点击登录
    loginState: auth.getLoginStatus(),
    user: auth.getAuth()
  })
}
