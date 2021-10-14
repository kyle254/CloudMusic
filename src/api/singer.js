import {request} from './request'

// 获取歌手分类列表
export function getSinerList(area,type,initial) {
  return request({
     url:'/artist/list',
     params:{
      area,
      type,
      initial
    },   
     xhrFields: {withCredentials: true}  
  })
}