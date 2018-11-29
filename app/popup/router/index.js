import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home/Home'
import Account from '../pages/Account/Account'
import NotLogin from '../pages/Account/NotLogin'
import NotAccount from '../pages/Account/NotAccount'
import MyAccount from '../pages/Account/MyAccount'
import Set from '../pages/Set/Set'
import PluginConfig from '../pages/PluginConfig'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/account',
      name: 'Account',
      component: Account,
      children: [
        {
          path: 'notlogin',
          name: 'NotLogin',
          component: NotLogin
        },
        {
          path: 'notaccount',
          name: 'NotAccount',
          component: NotAccount
        },
        {
          path: 'myaccount',
          name: 'MyAccount',
          component: MyAccount
        }
      ]
    }, {
      path: '/set',
      name: 'Set',
      component: Set
    }, {
      path: '/config',
      name: 'PluginConfig',
      component: PluginConfig
    }
  ]
})
