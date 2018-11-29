<template>
	<div class="config-box">
		<div class="header">
			<p> <span @click="goBack" class="back-btn"><i class="back"></i>返回</span></p>
		</div>
		<div class="explain-box">
			<p>{{descriptionState.text}}</p>
			<img :src="descriptionState.src">
		</div>
		<div id="configBox">
			<ul class="config-list-box cumstomScrollbar">
				<li class="config-list clearfix" v-for="(item, index) in configList" @mouseenter="description(item, index)" @mouseleave="mouseLeave" :key="index">
					{{ item.name }}
					<el-switch class="switch-pos" @setConfig="setConfig" :idx="index" :value="item.status" :isCloseMsg="item.isClose"></el-switch>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import elSwitch from '../components/elSwitch'

export default {
  data () {
    return {
      configList: [],
      descriptionState: { text: '', src: '' },
      descriptionStates: [],
      index: null,
      descriptionStateTemp: null
    }
  },
  components: {
    elSwitch
  },
  mounted () {
    let that = this
    this.getConfig((cList) => {
      chrome.extension.sendRequest({
        'name': 'getPlugConfigDes'
      }, function (res) {
        console.log(res)
        that.descriptionStates = res.list

        // 向elSwitch传递消息
        let configList = cList.map((value, index, arr) => {
          let temp = value
          let descriptionStateTemp = that.descriptionStates.find((value, index, arr) => {
            return value.key === temp.key
          })
          value.isClose = !descriptionStateTemp.isClose
          return value
        })

        that.configList = configList
      })
    })
    this.triangle()
    // 滚动的时候定位三角形
    $('.config-list-box').on('scroll', function () {
      $('.triangle').css({
        left: -$('.triangle').outerWidth(),
        top: $(document.querySelectorAll('.config-list')[that.index]).position().top - $(document.querySelectorAll('.config-list')[that.index]).height() / 2
      })
    })
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    setConfig (res) {
      var that = this
      chrome.extension.sendRequest({
        'name': 'setPlugConfig',
        'config': {
          'key': that.configList[res.idx].key,
          'value': res.val
        }
      })
    },
    getConfig (cb) {
      chrome.extension.sendRequest({
        'name': 'getPlugConfig'
      }, function (response) {
        if (response.errmsg === 'ok') {
          var plugConfig = response.plugConfig
          var cList = []
          Object.keys(plugConfig).forEach(function (key) {
            var obj = plugConfig[key]
            cList.push(obj)
          })
          // that.configList = cList;
          typeof cb === 'function' && cb(cList)
        }
      })
    },
    // 鼠标放上去图文说明
    description: function (item, index) {
      let descriptionStateTemp = this.descriptionStates.find((value, index, arr) => {
        return item.key === value.key
      })
      if (descriptionStateTemp) {
        this.descriptionState.text = descriptionStateTemp.description
        this.descriptionState.src = descriptionStateTemp.imageUrl
      } else {
        // 再次延时获取
        setTimeout(() => {
          let descriptionStateTemp = this.descriptionStates.find((value, index, arr) => {
            return item.key === value.key
          })
          if (descriptionStateTemp) {
            this.descriptionState.text = descriptionStateTemp.description
            this.descriptionState.src = descriptionStateTemp.imageUrl
          } else {
            this.descriptionState.text = '未获取到数据'
            this.descriptionState.src = ''
          }
        }, 250)
      }

      // 定位三角形
      let $triangle = $('.triangle')
      $triangle.show()
      $triangle.css({
        left: -$triangle.outerWidth(),
        top: $(document.querySelectorAll('.config-list')[index]).position().top - $(document.querySelectorAll('.config-list')[index]).height() / 2
      })

      this.index = index // 存下此时的index
      this.descriptionStateTemp = descriptionStateTemp
    },
    mouseLeave () {
      $('.triangle').hide()
    },
    triangle () {
      // 三角形
      let $triangle = $('<div class="triangle"></div>')
      $('#configBox').append($triangle)
      $triangle.hide()
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
	.cumstomScrollbar::-webkit-scrollbar-thumb {
		/*滚动条里面小方块*/
		border-radius:3px;
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
		background:#B1B1B1;
	}
	.cumstomScrollbar::-webkit-scrollbar-track {
		/*滚动条里面轨道*/
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
		background: #EDEDED;
	}
	.header {
		position: fixed;
    top: 0;
    left: 0;
    width: 675px;
    z-index: 2;
		background: #fafafa;
		height: 60px;
		line-height: 60px;
		border-bottom: 1px solid #EEEEEE;
		padding-left: 20px;
	}

	.header .back-btn {
		cursor: pointer;
	}

	.back {
		background: url(../asset/img/icon-back.png) no-repeat;
		background-size: 6px;
		background-position-y: 6px;
		display: inline-block;
		width: 16px;
		height: 16px;
	}

/*	图文说明*/
	.explain-box{
		position: fixed;
    top: 60px;
    width:54%;
    padding: 20px;
	}
	.explain-box img{
		position: absolute;
		top: 100px;
	}

	#configBox{
		position: fixed;
    top: 60px;
    left:60%;
    width: 37%;
    height: 430px;
    border-left: 1px solid #EEEEEE;
	}

	.config-box{
		height: 490px;
	}

	#configBox .config-list-box{
		height: 430px;
    overflow: auto;
	}

	.config-list-box .config-list {
		height: 48px;
		line-height: 48px;
		padding-left: 20px;
		padding-right: 22px;
		font-size: 12px;
		color: #585858;
		border-bottom: 1px solid #EEEEEE;
		position: relative;
		/*border-top: 9px solid transparent;
    	border-bottom: 9px solid transparent;*/
	}
	.config-list-box .config-list:hover{
		background-color: #f2f9ff;
	}

	.triangle{
		width:0;
    height:0;
    border-width:10px 10px 10px 0;
    border-style:solid;
    border-color:transparent #f2f9ff transparent transparent;
    margin:40px auto;
    position:absolute;
    z-index: 99999;
	}

	.config-list-box .config-list:last-child {
		border-bottom: none;
	}

	.config-list-box .config-list .switch-pos {
		display: inline-block;
		float: right;
		position: relative;
		top: 13px;
	}
</style>
