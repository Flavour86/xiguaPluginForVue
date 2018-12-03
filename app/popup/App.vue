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
      idx: 0
    }
  },
  watch: {
    $route (to, from) {
      let appDom = document.querySelector('#app')
      if (to.path === '/config') {
        appDom.style.width = 675 + 'px'
      } else {
        appDom.style.width = 360 + 'px'
      }
    }
  },
  mounted () {
    this.getLoginState()
  },
  methods: {
    getLoginState () {
      chrome.runtime.sendMessage({
        name: 'getLoginState'
      }, response => {
        if (!response.loginState) {
          setTimeout(this.getLoginState, 300)
          return
        }
        console.log(this.$bus, 'this.$busthis.$busthis.$bus')
        this.$bus.$emit('loginState', response)
      })
    },
    tabBarItemClick (idx) {
      this.idx = idx
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
