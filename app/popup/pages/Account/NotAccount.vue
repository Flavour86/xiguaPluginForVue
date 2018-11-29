<template>
	<div class="not-account-box">
		<h4 class="title">您还未添加公众号</h4>
		<p class="sub-title">添加后可在浏览器中快速登录微信公众号<br />支持多公众号切换，无须反复扫码。</p>
		<p class="btn-box"><span @click="toLogin" class="login-btn">立即添加</span></p>
	</div>
</template>

<script>
export default{
  name: 'NotAccount',
  methods: {
    toLogin () {
      chrome.extension.sendRequest({
        'name': 'receiveAddActEvent'
      })
    }
  }
}
</script>

<style>
	.not-account-box{text-align: center;height: 280px;}
	.not-account-box .title{
		font-size: 16px;
    	color: #333333;
   	 	padding-top: 60px;
    	padding-bottom: 10px;
    	font-weight: 600;
    }
    .not-account-box .sub-title{
    	font-size: 13px;
    	color: #999;
    	line-height: 21px;
    }
    .not-account-box .btn-box{
    	text-align: center;
    	padding-top: 20px;
    }
    .not-account-box .login-btn{
    	background:#42b549;
		border-radius:4px;
		display: inline-block;
		width:80px;
		height:32px;
		line-height: 32px;
		color: #FFFFFF;
		cursor: pointer;
    }

    .not-account-box .login-btn:hover{
    	background: #1AAD19;
    }
</style>
