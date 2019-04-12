<template>
  <div id="app_bottom">
    <div class="info">
      <span>@Copyright <a href="https://homxuwang.github.io/">homxuwang</a></span>
      <span>2019/04/10 --  </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'appBottom',
  data() {
    return{}
  },
  created() {},
  methods: {}
}
</script>

<style lang="less" >
#app_bottom {
  width: 100%;
  height: 40px;
  position: relative;
  text-align: center;
  .info {
    margin: 0 auto;
    font-size: 12px;
    line-height: 40px;
    color: #EEE;
    background-color: rgba(0, 0, 0, 0.15);
    span {
      margin: 0 10px;
    }
  }
}
</style>
