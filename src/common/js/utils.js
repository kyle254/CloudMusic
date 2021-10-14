// 时间戳
export function formatDate(date, fmt) {
  // 1.获取年份
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }

  // 2.获取月日时间
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};


function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};

//------------------------------------------------------------------------------------------------------------------------------------------------------------------


// 打乱数组(随机播放)
export function shuffle(arr) {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}


// 节流防抖
export  function debounce(func,delay){
  let timer = null
  return function(...args){
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
       func.apply(this, args)
    },delay)
  }
}


// 
export function getThenIndex(list, song) {
  return list.findIndex(item => {
    return item.id === song.id
  })
}
