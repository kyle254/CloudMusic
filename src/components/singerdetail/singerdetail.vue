<template>
     <div class="detail"  v-show="!fullScreen">
       <div v-if="show">
        <nav-bar class="navbar1">
          <div slot="left" class="back" @click="backClick">
            <img src="../../assets/img/leftback.svg" alt="">
          </div>
        </nav-bar>

        <div class="left">       
          <div class="imgbox">
           <img :src="detail.cover" alt="">
          </div>

          <div class="right">
            <div class="name">
              <div class="geshou">歌手</div>
              <div class="singername">{{detail.name}}</div>
            </div>
            <div class="count">
              <div class="size">单曲数：{{detail.musicSize}}</div>
              <div class="size">专辑数：{{detail.albumSize}}</div>
              <div class="size">mv数：{{detail.mvSize}}</div>
            </div>
          </div>
        </div>    
         
        <list-tab v-on:item-click="cpnClick"></list-tab>

        <singer-album v-if="currentIndex === 0" :singeralbum="singeralbum"  v-on:img-click="imgClick"></singer-album>
        <singer-mv    v-if="currentIndex === 1" :singermv="singermv"></singer-mv>
        <singer-desc  v-if="currentIndex === 2" :singerdesc="singerdesc"></singer-desc>
        <singer-like  v-if="currentIndex === 3" :singerlike="singerlike"></singer-like>
       </div> 
      <music-list v-if="showif" 
                  :songs="songs"
                  @back-click="back1Click" 
                  :album="album"                
       ></music-list> 
     </div> 
     
</template>

<script>

  import NavBar from 'base/navbar/NavBar'
  import ListTab from 'cpnts/singerdetail/childComps/ListTab'
  import MusicList from 'cpnts/music-list/music-list'
  import SingerAlbum from './childComps/singerAlbum.vue'
  import SingerMv from './childComps/singerMv.vue'
  import SingerDesc from './childComps/singerDesc.vue'
  import SingerLike from './childComps/singerlike.vue'

  import {mapGetters} from 'vuex'
  import {getSinerDetail} from 'api/singerdetail'
  import {getSinerAlbum,getSinerMv,getSinerDesc,getSinerlike} from 'api/singerdetail'
  import {getAlbum} from 'api/music-list'
  import { CODE } from 'common/js/config'

  

  export default {
  components:{
      NavBar,
      ListTab,
      SingerAlbum,
      SingerMv,
      SingerDesc,
      SingerLike,
      MusicList
   },

   data () {
     return {
       detail: {},
       currentIndex:0,
       singeralbum:[], // 歌手专辑
       singermv:[], // 歌手Mv
       singerdesc:[], // 歌手详情
       singerlike:[],  // 相似歌手  
       songs:[],  // 专辑歌曲
       album:{},  // 专辑内容
       show:true,
       showif:false,
       
     }  
   },
   computed: {
     ...mapGetters([
       'singerId',
       'fullScreen'
     ])  
  },

  activated() {
   this._getSinerDetail()
   this._getSinerAlbum()
  },


  methods:{
    _getSinerDetail() {
      getSinerDetail(this.singerId).then(res => {
          if(res.data.code === CODE) {
            //console.log(res);
            this.detail = res.data.data.artist
          }
      })
    },

    backClick() {
      this.$router.go(-1);
    },

    cpnClick(index) {
     console.log(index);
     this.currentIndex = index
     if(this.currentIndex == 0) {
       this._getSinerAlbum()
     } else if(this.currentIndex == 1) {
       this._getSinerMv()
     } else if(this.currentIndex == 2) {
       this._getSinerDesc()
     } else {
       this._getSinerlike()
     }       
    },

    imgClick(id) {
      this.show = !this.show
      this.showif = !this.showif
      getAlbum(id).then(res => {
        if(res.data.code === CODE) {
          console.log(res);
          this.songs = res.data.songs
          this.album = res.data.album
          console.log(this.songs);
          //console.log(this.album)
        }
      })
   },
    
    back1Click() {
      this.show = true 
      this.showif = false   
    },

    _getSinerAlbum() {
    getSinerAlbum(this.singerId).then(res => {
    if(res.data.code === CODE) {
      console.log(res);
      this.singeralbum = res.data.hotAlbums
      console.log(this.singeralbum);
    }
   })
  },

   _getSinerMv() {
    getSinerMv(this.singerId).then(res => {
      if(res.data.code === CODE) {
        console.log(res);
        this.singermv = res.data.mvs
       }
    })
  },

   _getSinerDesc() {
   getSinerDesc(this.singerId).then(res => {
     if(res.data.code === CODE) {
       console.log(res);
       this.singerdesc = res.data
      }
   })
  },

   _getSinerlike() {
   getSinerlike(this.singerId).then(res => {
      if(res.data.code === CODE) {
         console.log(res);
         this.singerlike = res.data.artists
        }
     })
   },

 }
    
  }
</script>

<style scoped>
   .back img {
       margin-left: 0;
       margin-top: 10px;
   }
  .left {
    display: flex;
    margin: 10px 0 0 15px
  }
  .imgbox img {
    width: 140px;
    height: 140px;
    border-radius: 10px;
  }

  .navbar1{
    position: relative;
  }

  .back img {
    width: 25px;
    height: 25px;
    margin-left: 0;
    margin-top: 10px;
 }

  .right {
    margin-left: 20px;
    margin-top: 15px;
  }

   .name {
    display: flex;
    width: 200px;
  }

  .name .geshou {
    width: 30px;
    height: 20px;
    line-height: 20px;
    background-color: #c62f2f;
    font-size: 12px;
    margin-right: 5px;
    text-align: center;
  }
  
  .name .singername {
     width: 120px;
     height: 20px;
     line-height: 20px;
     font-size: 18px;
  }

  .count {
    margin-top: 15px;
  }

  .size {
    width: 100px;
    height: 20px;
    font-size:14px;
    margin-top:5px;
  }
  


</style>