import {request} from './request'

// 根据专辑id 获取专辑内容
export function getAlbum(id) {
  return request({
     url:'/album',
     params:{
       id
    },   
     xhrFields: {withCredentials: true}  
  })
}

// 根据歌单id 获取歌单详情
export function getGedan(id) {
  return request({
     url:'/playlist/detail',
     params:{
       id
    },   
     xhrFields: {withCredentials: true}  
  })
}




// 跟音乐id 获取音乐url
export function getUrl(id) {
  return request({
     url:'/song/url',
     params:{
       id
    },   
     xhrFields: {withCredentials: true}  
  })
}