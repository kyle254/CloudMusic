import {request} from './request'

// 获取轮播图数据
export function Home_getBanner() {
  return request({
     url:'/banner',
     xhrFields: {withCredentials: true}  
  })
}

// 获取歌单数据
export function Home_getPersonalizedList() {
    return request({
       url:'/personalized',
       xhrFields: {withCredentials: true}  
    })  
}

// 获取推荐新歌曲
export function Home_getNewList() {
  return request({
     url:'/personalized/newsong',
     xhrFields: {withCredentials: true}  
  })  
}

