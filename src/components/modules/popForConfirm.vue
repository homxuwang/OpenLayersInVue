<template>
  <div id="popForConfirm">

    <div tabindex="-1" role="dialog" aria-modal="true" style="z-index: 2005" class="el-message-box__wrapper">
      <div class="el-message-box">

        <div class="el-message-box__header">
          <div class="el-message-box__title">
            <span>登出</span>
          </div>
          <button @click="closeBtnClick" type="button" aria-label="Close" class="el-message-box__headerbtn"><i class="el-message-box__close el-icon-close"></i></button>
        </div>

        <div class="el-message-box__content">
          <div class="el-message-box__status el-icon-warning"></div>
          <div class="el-message-box__message"><p>是否登出?</p></div>
          <div class="el-message-box__input" style="display: none;">
            <div class="el-input">
              <input type="text" autocomplete="off" placeholder="" class="el-input__inner">
            </div>
            <div class="el-message-box__errormsg" style="visibility: hidden;"></div>
          </div>
        </div>

        <div class="el-message-box__btns">
          <button @click="cancelBtnClick" type="button" class="el-button el-button--default el-button--small">
            <span>取消</span>
          </button>
          <button @click="enterBtnClick" type="button" class="el-button el-button--default el-button--small el-button--primary">
            <span>确定</span>
          </button>
        </div>

      </div>
    </div>

    <div style="position: fixed;left: 0;top: 0;width: 100%;height: 100%;opacity: .5;background: #000;z-index: 2002;">
          <iframe src='about:blank' frameBorder='0' marginHeight='0' marginWidth='0' style='position: absolute;pointer-events: none; visibility: inherit; top: 0px; left: 0px; width: 100%; height: 100%; z-index: -1; filter: alpha(opacity = 0);'></iframe>
    </div>

  </div>
</template>

<script>
export default {
  name: 'popForConfirm',
  data() {
    return {}
  },
  methods: {
    /**
     * 确定按钮点击事件
     */
    enterBtnClick() {
      this.$emit('enterBtnClick') //向父组件返回事件
    },

    /**
     * 取消按钮点击事件
     */
    cancelBtnClick() {
      this.$emit('cancelBtnClick') //向父组件返回事件
    },
    /**
     * 关闭按钮点击事件
     */
    closeBtnClick() {
      this.$emit('closeBtnClick') // 向父组件返回事件
    }
  }
  
}
</script>

<style lang="less" scoped>
  #popForConfirm {
    z-index: 9;
    width: 0%;
    height:0%;
    position: relative;
  }
</style>


