import getVersion from './version' // 插件版本模块
import './install' // 插件安装，卸载模块
import getAuthModule from './authentization' // 用户登录认证模块
import './requestModule' // 短通信模块

function start () {
  getVersion()
  getAuthModule()
}
start()
