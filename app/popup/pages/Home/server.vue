<template>
	<div class="xgj-popup-body">
		<!--功能-->
		<div class="body-item">
			<div class="search-box">
				<input  @keyup.enter="searchEnterFun" v-model="searchData" class="search-input" type="text" placeholder="搜索公众号文章" />
				<span @click="toSearch" class="search-btn">搜文章</span>
			</div>
			<div class="funs-box">
				<div class="fun-item">
					<div @click="openZS" class="fun-item-inner">
						<i class="icon-fun-name icon-xgzs"></i>
						<p class="fun-name xgzs">西瓜助手</p>
					</div>
				</div>
				<div class="fun-item">
					<div @click="openSG" class="fun-item-inner">
						<i class="icon-fun-name icon-sgwz"></i>
						<p class="fun-name sogowz">搜狗微信文章</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'Server',
  mounted: function () {

  },
  data: function () {
    return {
      searchData: ''
    }
  },
  methods: {
    searchEnterFun: function (e) {
      var keyCode = window.event ? e.keyCode : e.which
      if (keyCode === 13) {
        this.toSearch()
      }
    },
    toSearch: function () {
      if (this.searchData === '') {
        return
      }

      chrome.extension.sendRequest({
        operateType: '30101',
        detail: 'sogoSearch',
        name: 'operateReportSubmit'
      }, function (res) {})

      var url = 'http://weixin.sogou.com/weixin?type=2&query=' + this.searchData.trim() + '&ie=utf8&s_from=input&_sug_=y&_sug_type_='
      window.open(url)
    },
    openZS: function () {
      chrome.extension.sendRequest({
        operateType: '30102',
        detail: 'popToZS',
        name: 'operateReportSubmit'
      }, function (res) {})
      window.open('http://www.xiguaji.com/')
    },
    openSG: function () {
      chrome.extension.sendRequest({
        operateType: '30103',
        detail: 'popToSG',
        name: 'operateReportSubmit'
      }, function (res) {})
      window.open('http://weixin.sogou.com/')
    }
  }
}
</script>

<style>
	.xgj-popup-body{
		padding-top: 61px;
   	 	width: 100%;
	}

	.search-box {
		padding: 16px 20px;
		box-sizing: border-box;
		border-bottom: 1px solid #EEEEEE;
		display: flex;
		justify-content: space-between;
	}

	.search-box .search-input {
		box-sizing: border-box;
		width: 100%;
		margin-right: 10px;
		padding-left: 30px;
		border: 1px solid #EEEEEE;
		border-radius: 4px;
		color: #999999;
		background: url(../../asset/img/sogo-logo.png) no-repeat;
		background-size: 16px;
		background-position: left center;
		background-position: left center;
		background-position-x: 6px;
	}

	.search-box .search-input::-webkit-input-placeholder {
		color: #ccc;
		font-size: 12px;
	}

	.search-box .search-input:focus {
		outline: none;
	}

	.search-box .search-btn {
		display: inline-block;
		width: 68px;
		height: 36px;
		line-height: 36px;
		text-align: center;
		color: #FFFFFF;
		font-size: 12px;
		background: #42b549;
		border-radius: 4px;
		cursor: pointer;
		padding: 0 10px;
	}

	.search-box .search-btn:hover{
		background: #1AAD19;
	}

	.funs-box {
		display: flex;
		flex-wrap: wrap;
	}

	.fun-item {
		width: 50%;
		display: flex;
		justify-content: center;
		box-sizing: border-box;
		padding-top: 26px;
		padding-bottom: 26px;
		cursor: pointer;
		position: relative;
		color: #888;
		font-size: 12px;
	}

	.fun-item:hover{
		color:#19ad19;;
	}

	.fun-item .fun-item-inner {
		width: 100%;
		text-align: center;
		border-right: 1px solid #FAFAFA;
	}

	.fun-item:nth-child(3n) {
		border-right: none;
	}
	/*.fun-item .fun-name:before {
		content: '';
		display: block;
		width: 48px;
		height: 48px;
		border-radius: 50%;
		margin: auto;
		margin-bottom: 16px;
	}
	*/

	.fun-item .icon-fun-name {
		display: inline-block;
		width: 32px;
		height: 40px;
	}

	.fun-item .icon-fun-name.icon-xgzs {
		background: url(../../asset/img/icon-xgzs.png) no-repeat;
		background-size: 32px;
		position: relative;
		height: 28px;
		margin-top: 4px;
		margin-bottom: 10px;
	}

	.fun-item .fun-name.xgzs {
		margin-top: -8px;
	}

	.fun-item .icon-fun-name.icon-sgwz {
		width: 28px;
		height: 28px;
		background: url(../../asset/img/sogo-logo.png) no-repeat;
		background-size: 28px;
		background-position-y: 0px;
		margin-bottom: 6px;
		position: relative;
	}
</style>
