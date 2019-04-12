export default {
  /**
   * 
   * @param {*} imgName 图片名称
   */
  loadImages(imgName) {
     //如果不用require()引入，那么就只返回"@/assets/images/imgName.png"字符串,
     //因为Vue不知道你是要获取文件路径还是只是返回一个字符串
    return require('@/assets/images/'+imgName);
  }
}