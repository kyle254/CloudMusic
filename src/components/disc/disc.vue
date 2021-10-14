<template>
  <div class="disc" v-show="!fullScreen">
  <scroll class="content2">
    <nav-bar class="navbar">
     <div slot="left" class="back1" @click="goback">
       <img src="../../assets/img/leftback.svg" alt="">
     </div>
    </nav-bar>

    <!-- 专辑图片 -->
    <div class="bg-image1"  :style="bgimage"></div> 
     <div class="bg-secondimage1">  
        <div class="sonimage1" :style="bgimage"></div> 
        <div class="items-playCount">
          <div class="erji"></div>
          {{list.playCount | showPlaycount}}
        </div>
        <div class="jiesao1">
          <div class="div1">{{list.name}}</div>
        </div>
     </div>

  <div class="List-middle" ref="middle">
    <div class="bofan">
      <img src="../../common/img/play.png">
    </div>
    <div>
        播放全部<span>(共{{songs.length}}首)</span>
    </div>
     
       <div class="noCollect">
         <img src="../../common/img/add.png">
         收藏({{collection}})
       </div>
  </div> 
    
    <song-list :songs="songs" @select="selectItem"></song-list>
  </scroll>
</div> 
</template>

<script>
  import NavBar from 'base/navbar/NavBar'
  import Scroll from 'base/scroll/Scroll'
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
       if(!this.list.id) {
        this.$router.push('/recommend')
        return
       }
      this.$bus.$on('listdetailsend', (data) => {
         this.songs = data.listdetail
         this.collection = data.collection                  
      })
    },

    computed:{
     bgimage() {
       return  {backgroundImage:(`url(${this.list.picUrl})`)}
     },

     ...mapGetters([
       'list',
       'fullScreen'
     ])
    },

    components:{
    NavBar,
    SongList,
    Scroll
    },

    methods:{
      goback() {
         this.$router.go(-1);
      },

       selectItem(item, index) {
        console.log(item);
        this.selectPlay({
        list: item,
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
 },

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
     filter: blur(10px);
  }

  .bg-secondimage1 {
    position: fixed;
    top:60px;
    left: 15px;
    display: flex;
    /* margin-top: 60px; */
    /* margin-left: 15px; */
    z-index: 999;
  }

  .sonimage1 {
    position: fixed;
    width:140px;
    height: 140px;  
    background-size: cover;
    border-radius: 10px; 
  }

  .jiesao1 {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100px;
    margin-left: 160px;
    margin-top: 5px;
    z-index: 999;
  }

  .div1 {
    width: 150px;
    height: 30px;
    font-size: 18px;
    line-height: 30px;
  }

  .items-playCount {
   display: flex;
   position:absolute; 
   right:0px;
   top:6px;
   margin-right: 175px;
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