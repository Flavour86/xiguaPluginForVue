<template>
	<div class="not-login-box">
		<!--未登录-->
		<div class="not-login-box">
			<div class="not-login">
				<p class="not-login-remark">您还未登录，请先登录再使用该功能</p>
				<span @click="toLogin" class="login-btn">登录</span>
			</div>
		</div>
	</div>
</template>

<script>
import { COMMON_STATUS } from '@/constants'
export default{
  name: 'NotLogin',
  methods: {
    toLogin: function () {
      chrome.extension.sendRequest({
        'name': 'getQrCodeTicket'
      }, function (response) {
        if (response.msg === COMMON_STATUS.SUCCESS) {
          console.log('qrcodeUrl:' + response.qrCodeUrl)
          var url = response.qrCodeUrl + '&from=0'
          window.open(url)
        }
      })
    }
  }

}
</script>

<style>
	.login-item {}

	.not-login-box {
		text-align: center;
		height: 280px;
	}

	/*.account-box{
		position: relative;
    	top: 0px;
   	 	width: 100%;
	}*/

	.not-login-box .not-login {
		padding: 80px 0;
	}

	.not-login-box .not-login-remark {
		padding-bottom: 30px;
	}

	.not-login-box .login-btn {
		background: #42b549;
		color: #FFFFFF;
		padding: 7px 26px;
		border-radius: 4px;
		cursor: pointer;
	}

	.not-login-box .login-btn:hover{
		background: #1AAD19;
	}

</style>
