<template>
	<div class="tabbar-box">
			<router-link class="tab-item" to="/">
				<div :class="[idx === 0?'active':'','tab-item-box home']" >
					<i class="tab-icon "></i>
					<span >功能</span>
				</div>
			</router-link>
			<router-link class="tab-item" to="/account/notlogin">
				<div :class="[idx === 1?'active':'','tab-item-box account']" >
					<i class="tab-icon"></i>
					<span >公众号</span>
				</div>
			</router-link>
			<router-link class="tab-item" to="/set">
				<div :class="[idx === 2?'active':'','tab-item-box set']">
					<i class="tab-icon"></i>
					<span style="position: relative;">设置<i v-if="hasNewVersioin" class="red-dot"></i></span>
				</div>
			</router-link>
	</div>
</template>

<script>
export default{
  name: 'tabbar',
  props: ['idx'],
  data () {
    return {
      funActive: true,
      hasNewVersioin: false
    }
  },
  mounted () {
    this.checkVersion()
  },
  methods: {
    bindClickEvent () {
      $('.tab-item').click(function () {
        $('.tab-item-box').removeClass('active')
        $(this).find('.tab-item-box').addClass('active')
      })
    },
    checkVersion () {
      var that = this
      chrome.extension.sendRequest({
        'name': 'checkVersion'
      }, function (response) {
        console.log('checkVersion:' + JSON.stringify(response))
        if (response.errmsg === 'ok') {
          that.hasNewVersioin = response.hasNewVersion
        }
      })
    }
  }

}
</script>

<style>
	.tabbar-box{
		display: flex;
		padding: 17px 0;
		justify-content: center;
		align-content: center;
		box-sizing: border-box;
		background: #FAFAFA;
		border-bottom: 1px solid #EEEEEE;
		position: absolute;
		top: 0;
		left: 0;
		width: 360px;
		z-index: 999;
	}

	.tab-item{
		border-right: 1px solid #EEEEEE;
		text-align: center;
		cursor: pointer;
		display: flex;
		flex: 1;
		color: #999999;
	}

	.tab-item .tab-item-box{
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.tab-item .tab-item-box.active,
	.tab-item .tab-item-box:hover{color: #42b549;}

	.tab-item .tab-item-box.home.active .tab-icon,
	.tab-item .tab-item-box:hover.home .tab-icon,
	.tab-item .tab-item-box.account.active .tab-icon,
	.tab-item .tab-item-box:hover.account .tab-icon{
		background-position: 0 0px;
	}

	.tab-item .tab-item-box .tab-icon{
		display: inline-block;
		width: 26px;
		height: 26px;
		margin-right: 10px;
	}

	.tab-item .tab-item-box.home .tab-icon{
		background: url(../asset/img/pop-funs.png) no-repeat;
		background-position: 0 -26px;
		background-size: 26px;
	}

	.tab-item .tab-item-box.account .tab-icon{
		width: 26px;
		height: 22px;
		background: url(../asset/img/account.png) no-repeat;
		background-position-y: -22px;
	}

	.tab-item .tab-item-box.set .tab-icon{
		width:26px ;
		height: 24px;
		background: url(../asset/img/set.png) no-repeat;
		background-position-y: -24px;
	}

	.tab-item .tab-item-box:hover.set .tab-icon,
	.tab-item .tab-item-box.set.active .tab-icon{
		background-position-y: 0px;
	}

	.red-dot{
		display: inline-block;
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: #f43530;
		position: absolute;
		left: 100%;
   		top: -25%;
	}

</style>
