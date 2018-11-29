<template>
	<div class="account-box">
		<tabbar :idx="1"></tabbar>
		<div class="account-router-view">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import tabbar from '../../components/tabbar'
export default{
  name: 'Account',
  components: {
    tabbar
  },
  mounted () {
    console.log('global.isLogin:' + global.isLogin)
    let that = this
    if (global.isLogin) {
      if (global.mulAct.length >= 1) {
        this.$router.push({ path: '/account/myaccount' })
        this.mulActGetBiz()
      } else {
        // 请求列表
        this.mulActGetBiz(function () {
          global.mulAct.length >= 1 ? that.$router.push({ path: '/account/myaccount' }) : that.$router.push({ path: '/account/notaccount' })
        })
      }
    } else {
      this.$router.push({ path: '/account/notlogin' })
    }
  },
  methods: {
    mulActGetBiz (cb) {
      chrome.extension.sendRequest({
        'name': 'mulActGetBiz'
      }, function (res) {
        if (res.state) {
          let actList = res.list
          global.mulAct = actList
          typeof cb === 'function' && cb()
        }
      })
    }
  }
}
</script>

<style>
	.account-box{}
	.account-router-view{
		padding-top: 61px;
	}
</style>
