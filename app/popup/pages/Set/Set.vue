<template>
	<div class="set-box">
		<div v-if="version.hasNewVersion" class="newVersion-fixed">
			<p><span> <i class="newVersion-triange"></i>有新版本{{ version.newVersion }},<a @click="openLoadUrl"  class="updateBtn" href="javascript:void(0)" style="text-decoration: underline;">点击更新</a></span></p>
		</div>
		<div id="scrollbar" class="mine-box">
			<div>
				<div v-if="hasLogin" class="mine-pto">
					<img class="mine-pto-img" :src="user.avatar" />
					<span class="mine-pto-name">{{user.userName}}</span>
				</div>
				<div v-else class="mine-pto">
					<img class="mine-pto-img" src="../../asset/img/default-pto.png" />
					<span class="mine-pto-name">未登录</span>
					<button @click="toLogin" class="login-btn">登录</button>
				</div>
			</div>

			<div @click="toPlugConfig" class="mine-item clearfix">
				功能开关 <i class="icon-forward"></i>
			</div>
			<div @click="toHelp" class="mine-item clearfix">
				使用帮助 <i class="icon-forward"></i>
			</div>
			<div @click="toSuggest" class="mine-item clearfix">
				意见反馈 <i class="icon-forward"></i>
			</div>
			<div class="mine-item sys-version clearfix">
				版本更新（ <span>当前{{version.curVersion}}</span>）
				<span v-if="version.hasNewVersion" @click="openLoadUrl" class="version has-new">最新版本{{version.newVersion}} <a class="updateBtn" href="javascript:void(0)">立即更新</a></span>
				<span class="version isNnew" v-else>已是最新版</span>
			</div>

			<div v-if="hasLogin" class="exit-btn-box">
				<p @click="exitLogin" class="exit-btn">退出登录</p>
			</div>
		</div>
	</div>
</template>

<script>
import { COMMON_STATUS } from '@/constants'
import { EXTENSION_ID } from 'common/base/'

export default{
  name: 'Set',
  data () {
    return {
      user: global.user,
      hasNewVersioin: false,
      newVersionTxt: '',
      loadUrl: '#',
      hasLogin: false,
      version: {
        curVersion: '',
        newVersion: '',
        hasNewVersion: false
      }
    }
  },
  created () {
    this.$bus.$on('loginState', res => {
      this.hasLogin = res.loginState
      res.user && (this.user = JSON.parse(res.user))
    })
  },
  mounted () {
    this.checkVersion()
  },
  methods: {
    toLogin: function () {
      chrome.extension.sendRequest(EXTENSION_ID, {
        name: 'getQrCodeTicket'
      }, function (response) {
        console.log(response, 'getQrCodeTicket')
        if (response && response.msg === COMMON_STATUS.SUCCESS) {
          console.log('qrcodeUrl:' + response.qrCodeUrl)
          var url = response.qrCodeUrl + '&from=0'
          window.open(url)
        }
      })
    },
    toPlugConfig () {
      chrome.extension.sendRequest({
        operateType: '30104',
        detail: 'funsSwitch',
        name: 'operateReportSubmit'
      })
      this.$router.push('/config')
    },
    openLoadUrl () {
      let _url = 'http://chajian.xiguaji.com/download'
      window.open(_url)
    },
    toHelp () {
      let _url = 'http://chajian.xiguaji.com/help'
      window.open(_url)
    },
    toSuggest () {
      let _url = 'http://xiguachajian.mikecrm.com/FXaOoZp'
      window.open(_url)
    },
    checkVersion () {
      const that = this
      chrome.extension.sendRequest({
        'name': 'checkVersion'
      }, function (response) {
        if (response && response.msg === COMMON_STATUS.SUCCESS) {
          that.version.curVersion = response.curVersion
          that.version.newVersion = response.newVersion
          that.version.hasNewVersion = response.hasNewVersion
        }
      })
    },
    exitLogin () {
      const that = this
      chrome.extension.sendRequest({
        'name': 'exitLogin'
      }, function (response) {
        if (response.isExit) {
          // global.isLogin = false
          // global.ticket = ''
          that.$bus.$emit('logout')
          that.$router.replace('/')
        } else {
          console.log('退出登录失败')
        }
      })
    }
  }
}
</script>

<style>
	.mine-box{padding-top: 60px;}
	.set-box{}
	.scrollbar-track{
		background: none !important;
	}

	.scrollbar-thumb{
		width: 4px !important;
	}

	.newVersion-fixed{
		position: relative;
    	top: 60px;
   	 	width: 362px;
    	text-align: center;
    	background: rgba(66,181,73,0.20);
    	height: 40px;
    	line-height: 40px;
    	color:#42b549;
	}

	.newVersion-fixed .newVersion-triange{
		display: inline-block;
		width: 16px;
		height: 16px;
		background: url(../../asset/img/icon-update-triangle.png) no-repeat;
		background-size: 16px;
		margin-right: 6px;
		position: relative;
   		top: 3px;
   		background-size: 14px;

	}

	.mine-pto .login-btn{
		background: #42b549;
    	color: #fff;
   		width: 80px;
    	line-height: 2.5;
    	border-radius: 4px;
    	border: none;
   		position: relative;
    	left: 160px;
    	cursor: pointer;
    	outline: none;
	}

	.mine-pto .login-btn:hover{
		background: #1AAD19;
	}

	/*.mine-box::-webkit-scrollbar{display: none;}*/

	.mine-box .mine-pto {
		display: flex;
		align-items: center;
		padding: 20px 0;
		padding-left: 20px;
		border-bottom: 1px solid #EEEEEE;
		box-sizing: border-box;
	}

	.mine-box .mine-pto .mine-pto-img {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: none;
		margin-right: 10px;
		overflow: hidden;
	}

	.mine-box .mine-pto .mine-pto-name {
		color: #585858;
	}

	.mine-box .mine-item {
		padding: 16px 20px;
		border-bottom: 1px solid #EEEEEE;
		font-size: 12px;
		color: #999999;
		cursor: pointer;
	}

	.mine-box .mine-item:hover{
		background: #FAFAFA;
	}

	.mine-box .exit-btn-box {
		padding: 20px;
		text-align: center;
	}

	.mine-box .exit-btn-box .exit-btn {
		padding: 8px 0;
		border-radius: 4px;
		cursor: pointer;
		font-size:12px;
		color:#333333;
		border:1px solid #eeeeee;
	}

	.mine-box .exit-btn-box .exit-btn:hover{
		background: #f55959;
		color: #FFFFFF;
	}

	.newVersion{
		text-align: center;
    	color: #3399FF;
    	font-size: 12px;
    	border-bottom: 2px solid #eee;
    	padding: 10px 0;
	}

	.newVersion .dot{
		display: inline-block;
   		width: 6px;
    	height: 6px;
    	background: #f55959;
    	border-radius: 50%;
    	margin-right: 6px;
	}

	.mine-item.sys-version{padding-left: 20px;position: relative;}
	.mine-item .version{float: right;margin-right: 10px;}
	.mine-item .has-new{color: #333333;}
	.newVersion-fixed .updateBtn:hover{color: #19AD19;}
	.updateBtn{	color:#42b549;margin-left: 10px;}
	.updateBtn:hover{text-decoration: underline;}
	.mine-item .isNnew{color: #999999;}
	.mine-item .icon-forward{
		display: inline-block;
		width: 16px;
		height: 16px;
		background: url(../../asset/img/icon-forward.png) no-repeat;
		background-size: 6px;
		background-position-y: 4px;
		float: right;
		background-position-x: 8px;
	}
</style>
