import '../theme/css/base/reset.less'
import Vue from 'vue'
import router from './router'
import VueDND from 'awe-dnd'
import App from './App.vue'
import getBus from '../utils/bus'

Vue.use(VueDND)
Vue.use(function (Vue) {
  Vue.prototype.$bus = getBus()
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
