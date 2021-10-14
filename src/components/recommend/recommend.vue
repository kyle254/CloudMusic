<template>
<div class="home" v-show="!fullScreen">
  <div class="recommend">  
    <div class="recommend-content">
      <swiper>
        <swiper-item v-for="item in bannerList" :key="item.index">
           <a>
             <img :src = "item.imageUrl" alt="">
           </a>
        </swiper-item>
      </swiper>
      <div class="Recomlist-wrapper list-wrapper">
        <div class="List-top">
          <span>推荐歌单</span>
          <div class="jiantou"></div>
        </div>

        <div class="List-bottom">
          <div class="List-items" 
               v-for="item in RecommendList" :key="item.index"
               @click="selectItem(item)">
              <img v-lazy="item.picUrl">   
              <p>{{item.name}}</p>
            <div class="items-playCount">
              <div class="erji"></div>
              {{item.playCount | showPlaycount}}
            </div>
          </div>      
        </div>
      </div>
    </div>  
  </div>

  <div class="loading-container" v-show=!RecommendList.length>
    <loading></loading>
  </div>

  <router-view></router-view>
</div>

</template>

<script>
import {Swiper, SwiperItem} from 'base/swiper/index'
import { Home_getBanner,Home_getPersonalizedList} from 'api/index'
import {getGedan} from 'api/music-list'
import loading from 'base/loading/163loading'
import { CODE } from 'common/js/config'
import {mapGetters,mapMutations} from 'vuex'


export default {
   components: { 
      Swiper,
      SwiperItem,
      loading,
  },
  data() {
    return {
      bannerList: [],
      RecommendList: [],
      NewList: [],
      songlist:{
      listdetail:[], // 歌单详情
      collection:0   // 歌单收藏量
      }
    }
  },
  
  computed:{
  ...mapGetters([
    'fullScreen',
  ])
 },

  created(){
     this._getBanner()
     setTimeout(() => {
       this.getDiscList()
     }, 1000);
  },
  
  methods: {
    // 获取轮播图数据
    _getBanner(){
       Home_getBanner().then(res => {
         //console.log(res);
         if (res.data.code === CODE) {
          this.bannerList = res.data.banners
        }
      })
    },

    //获取歌单数据
    getDiscList() {
      Home_getPersonalizedList().then(res => {
           //console.log(res);
           if (res.data.code === CODE) {
           this.RecommendList = res.data.result.slice(0, 6)
        }
      })
    },
    
    // 获取歌单详情
    selectItem(item) {
      this.$router.push('/disc/' + item.id)
      getGedan(item.id).then(res => {
        //console.log(res);
        if (res.data.code === CODE) {
         this.songlist.listdetail = res.data.playlist.tracks
         this.songlist.collection = res.data.playlist.subscribedCount
         this.$bus.$emit('listdetailsend',this.songlist)
       }
      })
      this.setList(item)
    },

    ...mapMutations({
     setList:'SET_LIST'
    })
  },
  
  // 过滤器的使用
  filters:{
  showPlaycount(playCount) {
    let num
    if (playCount > 100000) {
      num = parseInt(playCount / 10000)
    } else {
      return parseInt(playCount)
    }
    return num > 10000 ? num + '亿' : num + '万'
    }
  }
  
}

</script>

<style scoped>

  .home {
    height:100vh
  }

  .content {
    height:calc(100% - 148px)
  }

  .recommend-content {
    height: 100%;
    overflow: hidden;
  }

  .slider-wrapper {
    position: relative;
    width: 100%;
    overflow: hidden;
  }

  .list-wrapper {
     height: 100%;
     box-sizing:border-box;
  }

  .list-wrapper>div {
    box-sizing:border-box;
  }

  .List-top {
     display: flex;
     margin-top: 25px;
     margin-bottom:10px;
  }

  .List-top span {
    font-size:15px;
    font-weight:500;
    margin-left: 10px;
  }

  .List-top i {
    font-size:28px;
    position:relative;
  }

  .List-bottom {
    display:flex;
    flex-wrap:wrap;
  }

  .List-items {
    flex: 1;
    width:115px;
    height:100%;
    position:relative;
    margin-bottom:40px;
    margin-left: 5px;
  }


  .List-items img {
    width:110px;
    height:110px;
    border-radius:7px;
  }

  .List-items p {
    font-size:12px;
    color:#cccc;
    line-height:15px;
    margin-top:15px;
  }

  .items-playCount {
     display: flex;
     position:absolute; 
     right:11px;
     top:3px;
     color:#fff;
     font-size:14px
  }


  .erji {
    width: 14px;
    height: 14px;
    background-image: url(../../assets/img/erji.svg);
    background-repeat:no-repeat;
    background-size: 100%,100%;
    margin-right: 3px;
  }

  .jiantou {
    width: 15px;
    height: 15px;
    background-image: url(../../assets/img/right-jiantou.svg);
    background-repeat:no-repeat;
    background-size: 100%,100%;
    margin-left: 3px;
    margin-top: 1px;
  }

  .loading-container {
    position: absolute;
    width:100%;
    top: 50%;
    transform: translateY(-50%);
  }

</style>