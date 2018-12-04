let messageProvider = {}
const request = require.context('./', false, /^((?!index).)*\.js$/)

request.keys().forEach(path => {
  const module = request(path)
  Object.keys(module).forEach(key => {
    if (module[key] && messageProvider[key]) {
      throw new Error(`${key}该函数名已被占用，请更换函数名`)
    }
    messageProvider[key] = module[key]
  })
})

class RequestModule {
  constructor () {
    chrome.extension.onRequest.addListener(::this.onMessageSend)
  }

  onMessageSend (message, sender, sendResponse) {
    const { name } = message
    if (name && messageProvider[name]) {
      messageProvider[name](message, sender, sendResponse)
    }
  }
}

export default new RequestModule()
