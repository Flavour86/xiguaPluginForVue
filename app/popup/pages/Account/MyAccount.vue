<template>
	<div class="myaccount-box">
		<div v-if="canEdit" class="wxcount-box cumstomScrollbar dragged-box">
			<div  class="wxcount-item" v-for="account in mulAct" v-dragging="{ item:account,list:mulAct,group:'account',bizkey:account.bizkey }" :key="account.bizkey">
				<div class="wxcount-item-inner-box">
					<div class="wxcount-info">
						<img class="wxcount-pto" :src="account.avatarurl" />
						<div>
							<p class="aname">{{account.bizname}}</p>
						</div>
					</div>
					<div class="wxcount-edit">
						<i v-if="showDragged" class="wxcount-icon icon-drag"></i>
						<i @click="deleteAct(account.bizkey,account.account)" class="wxcount-icon icon-delete"></i>
					</div>
				</div>
			</div>
		</div>
		<div class="wxcount-box cumstomScrollbar" v-else>
			<div @click="toLogin(account.account,account.avatarurl,account.bizkey)" class="wxcount-item" v-for="(account, index) in mulAct" :key="index">
				<div class="wxcount-item-inner-box">
					<div class="wxcount-info">
						<img class="wxcount-pto" :src="account.avatarurl" />
						<div>
							<p class="aname">{{account.bizname}}</p>
							<p class="aid">{{account.account}}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="myacount-btns">
			<p v-if="!canEdit">
				<a href="javascript:void(0)" @click="toEdit" class="myacount-btn myacount-edit"><i class="icon icon-edit"></i>排序/解绑</a>
				<a href="javascript:void(0)" @click="toAddAct" class="myacount-btn myacount-add"><i class="icon icon-add"></i>添加公众号</a>
			</p>
			<p v-else class="finished" @click="finishEdit">
				<a href="javascript:void(0)" class="myacount-finished">完成</a>
			</p>

		</div>
	</div>

</template>

<script>
export default {
  name: 'MyAccount',
  props: {
    mulAct: Array,
    default: () => []
  },
  data () {
    return {
      canEdit: false,
      oldSortAct: [],
      showDragged: true
    }
  },
  watch: {
    mulAct (newVal, old) {
      this.showDragged = this.mulAct.length > 1
    }
  },
  mounted () {
    this.oldSortAct = this.clone(this.mulAct)

    var that = this
    this.$dragging.$on('dragged', ({
      value
    }) => {
      let newSortAct = value.list

      for (let i = 0; i < that.oldSortAct.length; i++) {
        if (that.oldSortAct[i].bizkey !== newSortAct[i].bizkey) {
          newSortAct[i].sort = newSortAct[i + 1].sort + 50

          // 将排序后的对象传递给后端
          chrome.extension.sendRequest({
            'name': 'mulActSort',
            'bizkey': newSortAct[i].bizkey,
            'sort': newSortAct[i].sort
          })

          break
        }
      }

      that.oldSortAct = that.clone(newSortAct)
    })
  },
  methods: {
    toLogin (wechatid, avatarurl, bizkey) {
      var loginObj = {
        'account': wechatid,
        'avatarurl': avatarurl,
        'bizkey': bizkey
      }

      chrome.extension.sendRequest({
        'name': 'mulActLogin',
        'account': loginObj
      })
    },
    toAddAct () {
      chrome.extension.sendRequest({
        'name': 'receiveAddActEvent'
      })
    },
    toEdit () {
      this.canEdit = true
    },
    deleteAct (bizkey, account) {
      var that = this

      chrome.extension.sendRequest({
        'name': 'mulActDelete',
        'bizkey': bizkey,
        'account': account
      }, function (req) {
        if (req.state) {
          that.mulAct = that.mulAct.filter(function (item) {
            return item.bizkey !== bizkey
          })
        }
      })
    },
    finishEdit () {
      this.canEdit = false
    },
    // 对象深拷贝，仅限于纯json对象
    clone (obj) {
      return JSON.parse(JSON.stringify(obj))
    }
  }
}
</script>
<style>
	.cumstomScrollbar::-webkit-scrollbar {
		/*滚动条整体样式*/
		width: 6px;
		/*高宽分别对应横竖滚动条的尺寸*/
		height: 1px;
	}
	/*滚动条里面小方块*/
	.cumstomScrollbar::-webkit-scrollbar-thumb {
		border-radius:3px;
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
		background:#B1B1B1;
	}

	.cumstomScrollbar::-webkit-scrollbar-track {
		/*滚动条里面轨道*/
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
		background: #EDEDED;
	}

	.wxcount-box {
		height: 240px;
		overflow: auto;
	}

	.wxcount-item {
		padding: 20px;
		border-bottom: 1px solid #EEEEEE;
		cursor: pointer;
	}

	.wxcount-item:hover {
		background: #FAFAFA;
	}

	.wxcount-item-inner-box {
		display: flex;
		justify-content: space-between;
	}

	.wxcount-item .wxcount-info {
		display: flex;
		align-items: center;
		width: 80%;
	}

	.wxcount-item .wxcount-info .wxcount-pto {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		margin-right: 10px;
	}

	.wxcount-item .wxcount-info .aname {
		font-size: 14px;
		color: #585858;
		width: 150px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.wxcount-item .wxcount-info .aid {
		font-size: 12px;
		color: #999999;
	}

	.wxcount-item .wxcount-edit {
		width: 40%;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	.wxcount-item .wxcount-edit .wxcount-icon {
		display: inline-block;
		width: 16px;
		height: 16px;
		cursor: pointer;
	}

	.wxcount-item .wxcount-edit .icon-drag {
		background: url(../../asset/img/drag.png) no-repeat;
		margin-right: 20px;
		position: relative;
	}

	.wxcount-item .wxcount-edit .icon-drag:hover {
		background-position-y: -16px;
	}

	.wxcount-item .wxcount-edit .icon-drag:hover:before{
		content: "按住拖动上下排序";
		font-size: 12px;
   		width: 100px;
    	position: absolute;
    	left: -120px;
   	 	background: rgba(0,0,0,.7);
    	color: #fff;
    	font-style: normal;
    	padding: 2px 4px;
    	border-radius:4px;
    	top: -2px;
	}

	.wxcount-item .wxcount-edit .icon-drag:hover:after{
		content: " ";
		display: inline-block;
		border-left: 6px solid rgba(0,0,0,.7);
		border-top: 6px solid transparent;
		border-bottom: 6px solid transparent;
		position: relative;
		left: -12px;
		top: -1px;
	}

	.wxcount-item .wxcount-edit .icon-delete {
		background: url(../../asset/img/drag.png) no-repeat;
		background-position-y: -32px;
	}

	.wxcount-item .wxcount-edit .icon-delete:hover {
		background: url(../../asset/img/drag.png);
		background-position-y: -48px;
	}

	/*.wxcount-box.dragged-box .wxcount-item{cursor: move;}*/
	.wxcount-box.dragged-box .wxcount-item{
		padding: 14px 20px;
	}

	.wxcount-box.dragged-box .wxcount-item .wxcount-info .wxcount-pto{
		width: 20px;
		height: 20px;
	}

	.wxcount-box.dragged-box .wxcount-item .wxcount-info .aname{
		font-size: 13px;
	}

	.myaccount-box {
		height: 280px;
	}

	.myaccount-box .myacount-btns {
		background: #FAFAFA;
		height: 40px;
		line-height: 40px;
		text-align: right;
		border-top: 1px solid #EEEEEE;
	}

	.myaccount-box .myacount-btns .myacount-btn {
		font-size: 12px;
		color: #999999;
	}

	.myaccount-box .myacount-btns .myacount-edit {
		margin-right: 16px;
	}

	.myaccount-box .myacount-btns .myacount-btn .icon {
		display: inline-block;
		width: 16px;
		height: 16px;
		position: relative;
		top: 3px;
		margin-right: 4px;
	}

	.myaccount-box .myacount-btns .myacount-edit .icon-edit{
		background: url(../../asset/img/drag1.png) no-repeat;
		background-size:cover;
		background-position-y: -16px;
	}

	.myaccount-box .myacount-btns .myacount-add .icon-add{
		background: url(../../asset/img/drag1.png) no-repeat;
		background-size: cover;
		background-position-y: 0px;
	}

	.myaccount-box .myacount-btns .myacount-add {
		margin-right: 20px;
	}

	.myaccount-box .myacount-btn:hover {
		color: #42b549;
	}

	.myaccount-box .myacount-btns .finished {
		text-align: center;
		cursor: pointer;
	}

	.myaccount-box .myacount-btns .myacount-finished {
		font-size: 14px;
		color: #42b549;
	}
</style>
