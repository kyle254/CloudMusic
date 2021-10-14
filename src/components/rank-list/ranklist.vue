<template>
 <div class="disc" v-show="!fullScreen">
  <nav-bar class="navbar">
   <div slot="left" class="back1" @click="goback">
     <img src="../../assets/img/leftback.svg" alt="">
   </div>
  </nav-bar>
  <!-- 专辑图片 -->
  <div class="bg-image1"  :style="bgimage"></div> 
   
<div class="List-middle" ref="middle">
  <div class="bofan">
    <img src="../../common/img/play.png">
  </div>
  <div>
      播放全部<span>(共{{songs.length}}首)</span>
  </div>
   
     <div class="noCollect">
       <img src="../../common/img/add.png">
       收藏({{collection | showPlaycount}})
     </div>
</div> 
  
  <song-list :songs="songs" @select="selectItem"></song-list>
</div> 
</template>

<script>
  import NavBar from 'base/navbar/NavBar'
  import SongList from 'base/songlist/songlist'
  import {mapGetters,mapActions} from 'vuex'
  export default {
   
     data() {
      return{
        songs:[],  // 歌单
        collection:0 // 收藏量
      }
    },

    mounted() {
      console.log(this.ranklist);
    // 如果在此页面刷新，返回父级路由
     if(!this.ranklist.id) {
       this.$router.push('/rank')
       return
     }
     this.$bus.$on('ranklistsend', (data) => {
     this.songs = data.listdetail
     this.collection = data.collection
    })
  },

    computed:{
      bgimage() {
        return  {backgroundImage:(`url(${this.ranklist.coverImgUrl})`)}
      },
      ...mapGetters([
        'ranklist',
        'fullScreen'
      ])
    },

    components:{
     NavBar,
     SongList,
     
   },

   methods:{
     goback() {
       this.$router.go(-1);
     },
     
      selectItem(item, index) {
        console.log(item);
        this.selectPlay({
        list: this.songs,
        index
      })
    }, 

     ...mapActions([
      'selectPlay',
      'randomPlay'
      ])
   },


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
   .disc {
    position: relative;
    height: 100vh;
  }

  .content2 {
    position: absolute;
    top:0px;
    bottom: 0px;
    left: 0;
    right: 0;
  }

  .nav-bar {
   position: fixed;
   z-index: 999;
  }

 .back1 img {
   width: 25px;
   height: 25px;
   margin-left: 0;
   margin-top: 10px;
 }

 .bg-image1 {
   width:100%;
   height:0;
   padding-top: 70%;
   transform-origin: top;
   background-size: cover;
   /* background-size: 30%,30%; */
   /* background: no-repeat; */
 }

   .List-middle {
   display:flex;
   justify-content:flex-start;
   align-items:stretch;
   width: 100%;
   padding:0 0 0 20px;
   box-sizing:border-box;
   height:50px;
   margin-top: 20px;
   z-index:5;
   position:relative;
   top:-25px;
   background:#222222;
   border-top-left-radius:20px;
   border-top-right-radius:20px;
   overflow:hidden
   /* border-bottom:1px solid #cccc!important; */
 }

  .List-middle>div {
    text-align:center;
 }

 .List-middle>div:nth-child(1) {
   flex: 0.5;
   text-align: center;
   align-items: center;
 }

 .List-middle>div:nth-child(2) {
   flex: 3;
   text-align:left;
   font-size:15px;
   margin-top: 20px;
   /* border-bottom:1px solid #e2e3e4!important; */
 }

.List-middle>div:last-child {
   flex: 2;
   color:#fff;
   text-align:left;
   background-color: #b82525;
   padding-left: 10px;
   padding-top: 15px;
   font-size:15px;
}

.bofan img {
   width:30px;
   height:30px;
   margin-right:20px!important;
   position:relative;
   top:13px;
}

.noCollect img {
  width:15px;
  height:15px;
  text-align: center;
  align-items: center;
  line-height: 20px;
  /* margin-right:0!important; */
  position:relative;
  top:3px;
}

.List-middle>div>span {
   font-size:13px;
   color:#979798;
   margin-left:7px;
}

 .name {
    font-size: 15px;
    color: #ffff;
 }
</style>