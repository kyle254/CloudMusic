<template>
   <div class="player" v-if="playList.length > 0">
     <div class="normal-player" 
          v-show="fullScreen" 
          >
       <!-- 背景图 -->
       <div class="background">
         <img width="100%" height="100%" :src="imgClass">
       </div>
       <!-- 顶部 -->
       <div>
          <nav-bar>
            <div slot="left" class="back" @click="display">
              <img src="../../assets/img/bottomback.svg" alt="">
            </div>
            <div slot="center" class="title">
              <h1>{{playItem.name}}</h1>
              <!-- <h2>{{playItem.ar[0].name}}</h2> -->
              <h2>{{playItem.author}}</h2>
            </div>
          </nav-bar>
          <h1 class="subtitle"></h1>
       </div>
       <!-- 中部 -->
       <div class="middle">
         <div class="middle-l">
           <div class="cd-wrapper">
             <div class="cd">
               <img :src="imgClass" class="image">
             </div>
           </div>
         </div>
       </div>
       <!-- 底部 -->
       <div class="bottom">
         <div class="dot-wrapper">
           <span class="dot"></span>
           <span class="dot"></span>
         </div>
         <div class="progress-wrapper">
            <span class="time time-l">{{format(currentTime)}}</span>
            <div class="progress-bar-wrapper">
              <pro-bar 
                      @touchmove="touchMove"
                      @touchend="touchEnd"
                      :percent="percentageNum">
              </pro-bar>
            </div>
            <span class="time time-r">{{format(sumTime)}}</span>
          </div>
          <div class="operators">
           <div :class="typeClass" @click="setType"></div>
           <div class="lastsong" @click="lastsong"></div>
           <div :class="this.playIng?'parse':'play'" @click="togglePlaying"></div>
           <div class="nextsong" @click="nextsong"></div>
           <div class="songlist"></div>
          </div>
       </div>
     </div>
    
     <div class="mini-player" v-show="!fullScreen" @click="open">
        <div class="icon">
          <img :src="imgClass" class="image" width="40" height="40">
        </div>
        <div class="text">
          <!-- <h2 class="name">{{playItem.ar[0].name}}</h2> -->
          <h2 class="name">{{playItem.author}}</h2>
          <p class="desc">{{playItem.name}}</p>
        </div>
        <!-- .stop 阻止冒泡反应到父元素，而打开播放器 -->
        <div :class="this.playIng?'min-parse':'min-play'" @click.stop="togglePlaying"></div> 
        <div class="min-sonlist" @click.stop="showPlaylist"></div>
     </div>
     
     <playlistss ref="playlist"></playlistss>
     
     <audio ref="audio" 
            :src="musicSrc" 
            @canplay="ready" 
            @error="error"
            @timeupdate="updateTime"
            @ended="ended">                 
     </audio>

   </div>
</template>

<script>
  
  import NavBar from 'base/navbar/NavBar' 
  import ProBar from 'base/probar/probar'
  import Playlistss from 'cpnts/playlist/playlistss'
  import {getUrl} from 'api/music-list'
  import { CODE } from 'common/js/config'
  import {playMode} from 'common/js/config'
  import {shuffle} from 'common/js/utils'
  import {mapGetters,mapMutations} from 'vuex'
  

  export default {

    data() {
     return{
       musicSrc:'',
       songReady:false,
       currentTime:0,
       sumTime:0,
       percentageNum:0
     }
    },

    computed:{
    ...mapGetters([
      'fullScreen',
      'playList',
      'playItem',
      'playIng',
      'playIndex',
      'mode',
      'sequenceList',
    ]),
     
    typeClass() {
      let className = null
      if(this.mode == playMode.sequence) {
        className = 'liebiao'
      }else if(this.mode == playMode.loop) {
        className = 'danqu'
      }else {
        className = 'suiji'
      }
      return className
     },

    imgClass() {
      let classimgName = ''
      if(this.playItem.status == 0) {
        classimgName = this.playItem.backgroundImage
      }else {
        classimgName = this.playItem.al.picUrl
      }
      return classimgName
    },

   },

    components:{
      NavBar,
      ProBar,
      Playlistss
    },
    
    created(){
      console.log(this.playItem);
    },

    methods:{
      display() {
       this.setFullScreen(false)
       // 兄弟组件。传递给music-list组件
       this.$bus.$emit('showmulist')
      },

      open() {
        this.setFullScreen(true)
        this.$bus.$emit('showmulist')
      },
      
      _getMusicSrc(id){
        getUrl(id).then(res => {
        if (res.data.code === CODE) {
          if (res.data.data[0].url === null) {
            setTimeout(() => {
              alert('您还未购买这首歌的版权')
            }, 300)
            return
          }
          this.musicSrc = res.data.data[0].url
          // 在下次 DOM 更新循环结束之后执行延迟回调  在下一次DOM更新循环结束后播放最新获取的歌曲
          this.$nextTick(() => {
            this.$refs.audio.play()
            // this.audioReady = true
          })
        }
      })
      },

      togglePlaying() {
        if(!this.songReady) return
        this.playIng ? this.$refs.audio.pause() : this.$refs.audio.play()
        this.setPlayingState(!this.playIng)
      },

      lastsong() {
         if(!this.songReady) return
         let index = this.playIndex - 1
         if(index === -1) {
            index = this.playList.length - 1
         }
         this.setPlayIndex(index)
         if(!this.playIng) {
           this.togglePlaying()
         }
         this.songReady = false
      },

      nextsong() {
        if(!this.songReady) return
        let index = this.playIndex + 1
        if(index === this.playList.length) {
           index = 0
        }
        this.setPlayIndex(index)
        if(!this.playIng) {
         this.togglePlaying()
        }
         this.songReady = false
      },

      loop() {
      this.$refs.audio.currentTime = 0
      this.$refs.audio.play()
      },

      updateTime(e) {
        if(!this.MoveSwitch) {
          this.currentTime = e.target.currentTime
          this.percentageNum = this.currentTime / this.sumTime
        }      
      },

      touchMove(percentage) {
      this.MoveSwitch = true
      this.currentTime = this.sumTime * percentage
      },

      touchEnd(percentage) {
      this.MoveSwitch = false
      this.$refs.audio.currentTime = this.sumTime * percentage
      if (!this.playIng) this.play()
      },

      format(time) {
      /*
        3 | 4 =  7
                转换为二进制之后011|100  相加得到111=7
      */
      time = time | 0
      const min = time / 60 | 0
      const second = time % 60
      return `${min < 10 ? '0' + min : min}:${second < 10 ? '0' + second : second}`
      },

      ready() {
        this.songReady = true
        this.sumTime = this.$refs.audio.duration
      },

      error() {
        this.songReady = true
      },

      setType() {
        const mode = (this.mode + 1) % 3 
        // console.log(mode);
        this.setPlayMode(mode)
        let list = null
        if(mode === playMode.random){
           list = shuffle(this.sequenceList)   // 随机播放
        }else {
           list = this.sequenceList   // 顺序或者循环播放
        }
        //console.log(list);
        this.resetCurrentIndex(list)
        this.setPlayList(list)
      },

      resetCurrentIndex(list) {
         let index = list.findIndex((item) => {
             return item.id === this.playItem.id 
         })
         this.setPlayIndex(index)
      },

      ended() {
        console.log(this.mode);
        if(this.mode == playMode.loop){
           this.loop();
        }else{
          this.nextsong()
        }
        
      },

      showPlaylist() {
        this.$refs.playlist.show();
      },
      
      ...mapMutations({
         setFullScreen: 'SET_FULL_SCREEN',
         setPlayingState:'SET_PLAYING_STATE',
         setPlayIndex:'SET_PLAY_INDEX',
         setPlayMode:'SET_PLAY_MODE',
         setPlayList:'SET_PLAYLIST'
      })
      },


    watch:{
      playItem(newList,oldList) {
        if(newList.id === oldList.id) return
        console.log(newList);
        console.log(oldList);
        this.$nextTick(() => {
        this._getMusicSrc(newList.id)
      })
      }
    }
  }
</script>

<style scoped>

    .normal-player{
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 150;
      /* background-color: orange; */
    }
     
     .background{
       position: absolute;
       left: 0;
       top: 0;
       width: 100%;
       height: 100%;
       z-index: -1;
       opacity: 1;
       filter: blur(30px);
     }   

     .back img {
       width: 50px;
       height: 50px;
     }

     
     .back1 {
       width: 25px;
       height: 25px;
       margin-left: 0;
     }

     .title {
       font-size: 16px;
     }

     .middle {
       position: fixed;
       width: 100%;
       top: 80px;
       bottom: 170px;
       white-space: nowrap;
       font-size: 0;
       margin-top: 50px;
     }

     .middle-l {
       display: inline-block;
       vertical-align: top;
       position: relative;
       width: 100%;
       height: 0;
       padding-top: 80%;
     }

     .cd-wrapper {
       position: absolute;
       left: 10%;
       top: 0;
       width: 80%;
       height: 100%;
     }

     .cd {
       width: 100%;
       height: 100%;
       box-sizing: border-box;
       border: 10px solid rgba(255, 255, 255, 0.1);
       border-radius: 50%;
     }

     .cd .play {
       animation: rotate 20s linear infinite
     }

     .cd .parse {
       animation-play-state: paused
     }

     .cd img {
       position: absolute;
       left: 0;
       top: 0;
       width: 100%;
       height: 100%;
       border-radius: 50%;
     }

     .bottom {
        position: absolute;
        bottom: 50px;
        width: 100%;
     }

     .dot-wrapper {
       text-align: center;
       font-size: 13px;
     }

     .dot {
       display: inline-block;
       vertical-align: middle;
       margin: 0 4px;
       width: 8px;
       height: 8px;
       border-radius: 50%;
       background: #ffff;
     }

     .progress-wrapper {
       display: flex;
       align-items: center;
       width: 80%;
       margin: 0px auto;
       padding: 10px 0;
     }

     .time {
       color: #ffff;
       font-size: 12px;
       flex: 0 0 30px;
       line-height: 30px;
       width: 30px;
     }
  
     .time-l {
       text-align: left
     }

     .time-r {
       text-align: right;
       margin-left: 10px;
     }
                                   
     .progress-bar-wrapper {
       flex: 1
     }  

     .operators{
       display: flex;
       align-items: center;
       margin-top: 5px;
       padding-left: 10px;
     }

     .operators>div {
       flex: 1;
       width: 80px;
       height: 50px;
     }

     .danqu {
       background-image: url(../../assets/img/danqu.svg);
       background-repeat:no-repeat;
       background-size: 70%,70%;
       margin-left: 20px;
     }


     .suiji {
        background-image: url(../../assets/img/suiji.svg);
        background-repeat:no-repeat;
        background-size: 65%,65%;
        margin-left: 20px;
      }
      
     .liebiao {
        background-image: url(../../assets/img/liebiao.svg);
        background-repeat:no-repeat;
        background-size: 77%,77%;
        margin-top: 7px;
        margin-left: 20px;
      }      

     .lastsong {
       background-image: url(../../assets/img/lastsong.svg);
       background-repeat:no-repeat;
       background-size: 60%,60%;
     }

      .play {
       background-image: url(../../assets/img/play.svg);
       background-repeat:no-repeat;
       background-size: 65%,65%;
       margin-right: 6px;
     }

     .parse {
        background-image: url(../../assets/img/parse.svg);
        background-repeat:no-repeat;
        background-size: 60%,60%;
        margin-right: 6px;
     }

     .nextsong {
        background-image: url(../../assets/img/nextsong.svg);
        background-repeat:no-repeat;
        background-size: 50%,50%;
        margin-top: 7px;
     }

     .songlist {
       background-image: url(../../assets/img/gedang.svg);
       background-repeat:no-repeat;
       background-size: 60%,60%;
     }

     .mini-player {
      display: flex;
      align-items: center;
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 180;
      width: 100%;
      height: 60px;
      background: #323232
     }

     .icon {
        flex: 0 0 40px; 
        width: 40px;
        padding: 0 10px 0 20px;
     }

     .icon img {
       border-radius: 50%
     }

     .text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1;
        line-height: 20px;
        overflow: hidden;
     }
    
    .name {
        margin-bottom: 2px;
        font-size: 13px;
        color: #fff;
    }
     
     .desc{
        font-size:12px;
        color: #ccc;
     }

     .min-parse {
        width: 30px;
        height: 30px;
        padding: 0 10px;
        background-image: url(../../assets/img/min-parse.svg);
        background-repeat:no-repeat; 
        background-size:100% 100%
     }

     .min-play {
       width: 30px;
       height: 30px;
       padding: 0 10px;
       background-image: url(../../assets/img/min-play.svg);
       background-repeat:no-repeat; 
       background-size:100% 100%
     }

     .min-sonlist {
       width: 30px;
       height: 30px;
       padding: 0 10px;
       background-image: url(../../assets/img/min-songlist.svg);
       background-repeat:no-repeat; 
       background-size:110% 110%;
       margin-right: 10px;
       margin-bottom: 2px;
     }
                


</style>