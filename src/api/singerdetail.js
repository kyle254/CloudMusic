import {request} from './request'

//获取歌手详情
export function getSinerDetail(id) {
  return request({
     url:'/artist/detail',
     params:{
      id
    },   
     xhrFields: {withCredentials: true}  
  })
}

//获取歌手专辑
export function getSinerAlbum(id) {
  return request({
     url:'/artist/album',
     params:{
      id
    },   
     xhrFields: {withCredentials: true}  
  })
}

// 获取歌手MV
export function getSinerMv(id) {
  return request({
     url:'/artist/mv',
     params:{
      id
    },   
     xhrFields: {withCredentials: true}  
  })
}

//获取歌手描述
export function getSinerDesc(id) {
  return request({
     url:'/artist/desc',
     params:{
      id
    },   
     xhrFields: {withCredentials: true}  
  })
}

// 获取相似歌手
export function getSinerlike(id) {
  return request({
     url:'/simi/artist',
     params:{
      id
    },   
     xhrFields: {withCredentials: true}  
  })
}