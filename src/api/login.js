import {request} from './request'

export function login(phone,password) {
  return request({
     url:'/login/cellphone',
     params:{
      phone,
      password
    },   
     xhrFields: {withCredentials: true}  
  })
}