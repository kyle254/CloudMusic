import Vue from 'vue'
import Router from 'vue-router'


import Rank from 'cpnts/rank/rank'
import Recommend from 'cpnts/recommend/recommend'
import Mine from 'cpnts/mine/mine'
import Search from 'cpnts/search/search'
import Singer from 'cpnts/singer/singer'
import SingerDetail from 'cpnts/singerdetail/singerdetail'
import Login from 'cpnts/login/login'
import Disc from 'cpnts/disc/disc'
import Ranklist from 'cpnts/rank-list/ranklist'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path:'/login',
      component:Login
    },
    {
       path:'/rank',
       component: Rank
    },

    {
      path:'/recommend',
      name:'recommend',
      component: Recommend,
    },

   {
      path:'/mine',
      component: Mine
   },

   {
     path:'/singer',
     name:'singer',
     component: Singer,
    //  children:[
      //  {
        //  path:'/singer/:id',
        //  component:SingerDetail
      //  }
    //  ]
  },
  
  // 歌手详情
  {
    path:'/detail/:id',
    name:"detail",
    component: SingerDetail,
    meta:{
      show:true
    }
  },
  
  // 首页歌单详情
  {
    path:'/disc/:id',
    name:'disc',
    component: Disc,
    meta:{
      show:true
    }
  },

  // 排行榜详情
  {
    path:'/rank/:id',
    name:'rank',
    component:Ranklist,
    meta:{
      show:true
    }
  },

  // 搜索
  {
    path:'/search',
    component: Search,
    meta:{
      show:true
    }
  }
  ]
})
