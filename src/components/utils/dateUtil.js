//日期控件类
/**
 * 获取上一个月
 */
let getPreMonth = (date) => {
  let arr = date.split('-')
  let year = arr[0]    //获取当前日期的年份
  let month = arr[1]   //获取当前日期的月份
  let day = arr[2]     //获取当然日期的日

  let year2 = year
  let month2 = parseInt(month) - 1
  if(month2 === 0){
    year2 = parseInt(year) - 1
    month = 12 
  }

  let day2 = day
  let days2 = new Date(year2, month2, 0)
  days2 = days2.getDate()
  if (day2 > days2){
    day2 = days2
  }
  if( month2 < 10){
    month2 = '0' + month2
  }
  let time2 = new Array();
  time2.push(year2,month2,day2)
  return time2.join('-')
}

/**
 * 获取几天前或几天后
 * 如果是几天前要输入负值,如果是几天后要输入正值
 */
let getPerOrNextDays = (date,days) => {
  return new Date(date.getTime() + (1000 * 60 * 60 * 24 * days))
}

let dateFormater = (inputDate,format) => {
  let date = inputDate || new Date()
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3 ), //quarter
    'S': date.getMilliseconds()
  }
  if(/(y+)/.test(format)){
    format = format.replace(RegExp.$1,(date.getFullYear() + '' ).substr(4 - RegExp.$1.length))
  }
  for(let k in o) {
    if(new RegExp('(' + k + ')').test(format)){
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return format
}


/**
 * 将时间戳转成时间
 */
let formatDateTime = (timeStamp) => {
  let date = new Date()
  date.setTime(timeStamp)
  let y = date.getFullYear()
  let m = date.getMonth() + 1
  m = m < 10 ? '0' + m : m
  let d = date.getDate()
  d = d < 10 ? '0' + d : d
  let h = date.getHours()
  h = h < 10 ? '0' + h : h
  let minute = date.getMinutes()
  let second = date.getSeconds()
  minute = minute < 10 ? '0' + minute : minute
  second = second < 10 ? '0' + second : second

  return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
}

export {
  getPreMonth,
  dateFormater,
  getPerOrNextDays,
  formatDateTime
}