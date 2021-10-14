import {request} from './request'

// 获取搜索关键词
export function getPlaceholder() {
  return request({
     url:'/search/default',
     xhrFields: {withCredentials: true}  
  })
}

// 获取搜索热词
export function getSearchHot() {
  return request({
     url:'/search/hot',
     xhrFields: {withCredentials: true}  
  })
}

// 获取搜索列表
export function getSearch_Suggest(keywords) {
  return request({
     url:'/search/suggest',
     params:{
       keywords,
     },   
     xhrFields: {withCredentials: true}  
  })
}

// 获取搜索结果
export function getSearch_Search(keywords) {
  return request({
     url:'/search',
     params:{
       keywords,
     },   
     xhrFields: {withCredentials: true}  
  })
}