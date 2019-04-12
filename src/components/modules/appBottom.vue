<template>
  <div id="app_bottom">
    <div class="info">
      <span>@Copyright <a href="https://homxuwang.github.io/">homxuwang</a></span>
      <span>2019/04/10 -- {{ theDateTime }} </span>
    </div>
  </div>
</template>

<script>
import { dateFormater } from '@/components/utils/dateUtil'
export default {
  name: 'appBottom',
  data() {
    return{
     theDateTime: ''
    }
  },
  created() {
    this.theDateTime = dateFormater(new Date(), 'yyyy-MM')
  },
  methods: {}
}
</script>

<style lang="less" >
#app_bottom {
  width: 100%;
  height: 40px;
  bottom: 0px;
  position: relative;
  text-align: center;
  background-color: rgba(20, 36, 68, 0.9);color: rgb(239, 239, 239);
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
