<template>
   <div class="album" v-show="!fullScreen" v-if="Object.keys(songs).length !== 0">
    <!-- 顶部导航 --> 
   <scroll class="content1"> 
      <nav-bar class="navbar">
        <div slot="left" class="back" @click="goback">
          <img src="../../assets/img/leftback.svg" alt="">
        </div>
      </nav-bar>
      
      <!-- 专辑图片 -->
      <div class="bg-image"  :style="bgStyle"></div> 
       <div class="bg-secondimage">
          <div class="sonimage" :style="bgStyle"></div> 
          <div class="jiesao">
            <div class="div1">{{album.name}}</div>
            <div class="div2">歌手:{{album.artists[0].name}}</div>
            <div class="div3">发行时间:{{album.publishTime | showDate}}</div>
          </div>
       </div>


       <div class="List-middle" ref="middle" @click="ramdomPlay">
           <div class="bofan">
             <img src="../../common/img/play.png">
           </div>
           <div>
               播放全部<span>(共10首)</span>
           </div>
            
              <div class="noCollect">
                <img src="../../common/img/add.png">
                收藏(1916)
              </div>
        </div>
            
       <!-- 专辑歌曲   -->
      <song-list :songs="songs" @select="selectItem"></song-list>
      </scroll>  
   </div>
</template>

<script>
 import NavBar from 'base/navbar/NavBar'
 import SongList from 'base/songlist/songlist'
 import Scroll from 'base/scroll/Scroll'
 import {formatDate} from 'common/js/utils'
 import {mapActions,mapGetters} from 'vuex'

  export default {

    data() {
     return{
       musicurl:''
     }
    },
   
     props:{
       songs: {
         type:Array
       },
       
       album:{
         type:Object
       }
     },

     components:{
       NavBar,
       SongList,
       Scroll
     },
      
     computed:{

    ...mapGetters([
      'fullScreen',
     ]),

    bgStyle() {
         return  {backgroundImage:(`url(${this.album.picUrl})`)}
       }
     },

     mounted() {
      this.$bus.$on('showmulist', () => {
         this.show = !this.show
      })
     },

     methods:{
       goback() {
          this.$emit('back-click')
       },

       selectItem(item,index) {
          console.log(this.songs);
          this.selectPlay({
            list: item,
            index
          })
       }, 

       ramdomPlay() {
         this.randomPlay({
           list:this.songs
         })
       },
       
       ...mapActions([
         'selectPlay',
         'randomPlay'
       ])
     },

     filters: {
		  showDate(value) {
        let date = new Date(value * 1000);
        return formatDate(date, 'yyyy-MM-dd')
      }
    }
  }
</script>

<style scoped>
 .album {
   position: relative;
   height: 100vh;
 }

 .content1 {
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


 .back img {
     width: 25px;
     height: 25px;
     margin-left: 0;
     margin-top: 10px;
 }

 .bg-image {
      width:100%;
      height:0;
      padding-top: 70%;
      transform-origin: top;
      background-size: cover;
      filter: blur(10px);
 }

 .bg-secondimage {
    position: fixed;
    top:60px;
    left: 15px;
    display: flex;
    z-index: 999;
 }

 .sonimage {
   position: fixed;
   width:140px;
   height: 140px;  
   background-size: cover;
   border-radius: 10px; 
 }

 .jiesao {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100px;
    margin-left: 160px;
    margin-top: 5px;
    z-index: 999;
 }

 .jiesao>div {
    flex:1
 }

 .div2 {
   font-size:13px;
   margin-top: 5px;
 }

 .div3 {
   font-size:13px;
   color:#fff
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