<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  // 监听路由变化 进入开关设置时改变宽
  watch: {
    $route (to, from) {
      let appDom = document.querySelector('#app')
      if (to.path === '/config') {
        appDom.style.width = 675 + 'px'
      } else {
        appDom.style.width = 360 + 'px'
      }
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
