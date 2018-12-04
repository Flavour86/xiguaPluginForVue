<template>
  <div id="app">
    <tab-bar :idx="idx" @handlerItemClick="tabBarItemClick"></tab-bar>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import tabBar from './components/tabbar'
export default {
  name: 'app',
  // 监听路由变化 进入开关设置时改变宽
  components: {
    tabBar
  },
  data () {
    return {
      idx: 1,
      response: {},
      enterConfig: false
    }
  },
  watch: {
    $route (to, from) {
      let appDom = document.querySelector('#app')
      if (to.path === '/config') {
        appDom.style.width = 675 + 'px'
        this.enterConfig = true
      } else {
        appDom.style.width = 360 + 'px'
        this.enterConfig = false
      }
    }
  },
  mounted () {
    this.getLoginState()
  },
  created () {
    this.$bus.$on('logout', () => {
      this.logout()
    })
  },
  methods: {
    getLoginState () {
      chrome.extension.sendRequest({
        name: 'getLoginState'
      }, response => {
        if (!response.loginState || !response.noTicket) {
          setTimeout(this.getLoginState, 500)
          return
        }
        this.response = response
        this.$bus.$emit('loginState', this.response)
      })
    },
    tabBarItemClick (idx) {
      this.idx = idx
      setTimeout(() => {
        this.$bus.$emit('loginState', this.response)
      }, 100)
    },
    logout () {
      this.response = {}
    }
  }
}
</script>

<style>
  @import "../theme/css/base/reset.less";
  #app {
    border-radius: 4px;
    box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.10);
    background: #FFFFFF;
    width: 360px;
    overflow: auto;
  }

  #app::-webkit-scrollbar{display: none;}

  .router-fade-enter-active, .router-fade-leave-active {
    transition: opacity .2s;
  }
  .router-fade-enter, .router-fade-leave-active {
    opacity: 0;
  }

</style>
