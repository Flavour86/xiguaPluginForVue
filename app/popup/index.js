import '../theme/css/base/reset.less'
import Vue from 'vue'
import router from './router'
import VueDND from 'awe-dnd'
import App from './App.vue'
import $bus from '../utils/bus'

Vue.use(VueDND)
new Vue({
  router,
  $bus,
  render: h => h(App)
}).$mount('#app')
