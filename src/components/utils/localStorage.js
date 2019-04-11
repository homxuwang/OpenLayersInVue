export default {
  //设置kay,value
  setLS (LSname, Lsdata) {
    window.localStorage.setItem(LSname, JSON.stringify((Lsdata)))
  },
  //获取key对应的value
  getLS (LSname) {
    return (JSON.parse(window.localStorage.getItem(LSname)))
  },
  //清除key对应的数据
  cleanLS (LSname) {
    window.localStorage.removeItem(LSname)
  }
}
