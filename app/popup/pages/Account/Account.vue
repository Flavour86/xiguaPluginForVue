<template>
	<div class="account-box">
		<div class="account-router-view" style="height: 280px">
			<my-account v-if="isLogin && mulAct.length" :mulAct.sync="mulAct"></my-account>
			<not-account v-if="isLogin && !mulAct.length"></not-account>
			<not-login v-if="!isLogin"></not-login>
		</div>
	</div>
</template>

<script>
import MyAccount from './MyAccount.vue'
import NotAccount from './NotAccount.vue'
import NotLogin from './NotLogin.vue'

export default {
  name: 'Account',
  components: {
    MyAccount,
    NotAccount,
    NotLogin
  },
  data () {
    return {
      isLogin: false,
      mulAct: []
    }
  },
  created () {
    this.$bus.$on('loginState', res => {
      this.isLogin = res.loginState
    })
  },
  watch: {
    isLogin (n, o) {
      if (n && n !== o) {
        this.mulActGetBiz()
      }
    }
  },
  methods: {
    mulActGetBiz () {
      const that = this
      chrome.extension.sendRequest({
        'name': 'mulActGetBiz'
      }, function (res) {
        if (res.state) {
          that.mulAct = res.list
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
