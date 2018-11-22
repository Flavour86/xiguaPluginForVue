<template>
  <div class="test">
    <p>
      this is popup111111111
    </p>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
@import "../theme/css/aaa.less";
.test {
  background-color: #000;
  p {
    color: #000;
  }
}
.z-toast {
  .z-mask {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,.3);
    z-index: 1000;
  }
  .z-toast_con {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1020;
    background-color: rgba(0,0,0,0.85);
    border-radius: 5px;
    padding: 20px 15px 10px;
    text-align: center;
  }
  .z-toast__content {
    font-size: 16px;
    color: #fff;
    margin-top: 10px;
  }
  .z-toast_icon {
    font-size: 38px;
    color: #fff;
  }
}
</style>
