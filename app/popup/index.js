import '../theme/css/base/reset.less'
import Vue from 'vue'
import router from './router'
import VueDND from 'awe-dnd'
import App from './App.vue'

Vue.use(VueDND)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
