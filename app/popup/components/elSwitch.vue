<template>
  <div>
    <span class="weui-switch" :class="{'weui-switch-on' : me_checked}" :idx="idx" :value="value" @click="toggle"></span>
  </div>
</template>

<script>
export default {
  name: 'el-switch',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    idx: {
      	type: Number
    },
    isCloseMsg: {

    }
  },
  data () {
    return {
      me_checked: this.value
    }
  },
  watch: {
    me_checked (val) {
      this.$emit('setConfig', { 'val': this.me_checked, 'idx': this.idx })
    }
  },
  methods: {
    toggle () {
      if (this.isCloseMsg) {
        this.me_checked = !this.me_checked
      }
    }
  }
}
</script>

<style>
  .weui-switch {
    display: block;
    position: relative;
    width: 44px;
    height: 22px;
    border: 1px solid #DFDFDF;
    outline: 0;
    border-radius: 11px;
    box-sizing: border-box;
    background-color: #DFDFDF;
    transition: background-color 0.1s, border 0.1s;
    cursor: pointer;
  }
  .weui-switch:before {
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    width: 42px;
    height: 20px;
    border-radius: 10px;
    background-color: #FDFDFD;
    transition: transform 0.35s cubic-bezier(0.45, 1, 0.4, 1);
  }
  .weui-switch:after {
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #FFFFFF;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
    transition: transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35);
  }
  .weui-switch-on {
    border-color: #1AAD19;
    background-color: #1AAD19;
  }
  .weui-switch-on:before {
    border-color: #1AAD19;
    background-color: #1AAD19;
  }
  .weui-switch-on:after {
    transform: translateX(22px);
  }
</style>
