<template>
  <div class="playlist" v-show="showFlag" @click="hide">
    <div class="list-wrapper" @click.stop>
      <!-- 头部 -->
      <div class="list-header">
        <h1 class="title">
          <div :class="typeClass" @click="setType"></div>
          <span class="text"></span>
          <img src="../../assets/img/lajitong.svg" alt="">
        </h1>
      </div>
      
      <!-- 列表 -->
      <scroll ref="listContent" :data="sequenceList" class="list-content">
        <ul>
          <li class="item" v-for="(item,index) in sequenceList" :key="item.name" @click="selectItem(item,index)">
            <div :class="getlaba(index)"></div>
            <span class="text">{{item.name}}</span>
            <img src="../../assets/img/quxiao.svg" class="clear" @click.stop="deleteOne(item)">
          </li>
        </ul>
      </scroll>

      <!-- 关闭 -->
      <div class="list-close" @click="hide">
        <span>关闭</span>
      </div>

    </div>
  </div>
</template>

<script>
  import {mapGetters,mapMutations,mapActions} from 'vuex'
  import Scroll from 'base/scroll/Scroll'
  import {playMode} from 'common/js/config'
  export default {
    data() {
      return {
        showFlag:false,
      }
    },

    components:{
      Scroll
    },

    computed:{
      ...mapGetters([
        'sequenceList',
        'mode',
        'playItem',
        'playIndex',
        'playList',
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
    },

    methods:{
      show() {
        this.showFlag = true;
        // 重新计算高度
        setTimeout(() =>{
          this.$refs.listContent.refresh()
        },20)
      },

      hide() {
        this.showFlag = false; 
      },

      setType() {
         const mode = (this.mode + 1) % 3
         this.setPlayMode(mode)
      },

       getlaba(index) {
       if(this.playIndex === index) {
         return 'laba'
       }
         return ''
      },

      selectItem(item,index) {
        if(this.mode === playMode.random) {
          index = this.playlist.findeIndex((song) => {
            return song.id === item.id
          })
        }
        this.setPlayIndex(index)
        this.setPlayingState(true)
      },
    

      deleteOne(item){
        this.deleteSong(item)
      },


      ...mapMutations({
      setFullScreen:'SET_FULL_SCREEN',
      setPlayingState:'SET_PLAYING_STATE',
      setPlayIndex:'SET_PLAY_INDEX',
      setPlayMode:'SET_PLAY_MODE',
      setPlayList:'SET_PLAYLIST'
      }),

      ...mapActions([
        'deleteSong'
      ])
    }
  }
</script>

<style scoped>
   .playlist {
    position: fixed;
    left: 0;
    right: 0;
    top: 215px;
    bottom: 0px;
    z-index: 200;
    /* background-color: #323232; */
   }

   .list-wrapper {
     position: absolute;
     left: 0;
     bottom: 0;
     width: 100%;
     background-color: #323232;
   }

   .list-header {
     position: relative;
     padding: 20px 30px 10px 20px;
     background-color:#323232
   }

   .list-header>div {
     width: 50px;
     height: 50px;
   }

   .title {
     display: flex;
     align-items: center;
   }

   .list-wrapper .text {
     flex: 1;
     font-size: 14px;
     color: #ccc;
   }

   .list-content {
     /* height:800px; */
     max-height: 240px;
     overflow: hidden;
   }

   .laba {
      width: 30px;
      height: 30px;
      background-image: url(../../assets/img/laba.svg);
      background-repeat:no-repeat;
      margin-top:10px;
   }

   .item {
     display: flex;
     align-items: center;
     height: 40px;
     padding: 0 30px 0 20px;
     overflow: hidden;
   }


   .list-close {
     text-align: center;
     line-height: 50px;
     background: #323232;
     font-size: 15px;
     color: 15px;
   }


   .danqu {
     width: 40px;
     height: 40px;
     background-image: url(../../assets/img/danqu-22.svg);
     background-repeat:no-repeat;
     background-size: 70%,70%;
    }

   .suiji {
     width: 40px;
     height: 40px;
     background-image: url(../../assets/img/suiji-22.svg);
     background-repeat:no-repeat;
     background-size: 70%,70%;
    }
 
    .liebiao {
       width: 40px;
       height: 40px;
       background-image: url(../../assets/img/liebiao-22.svg);
       background-repeat:no-repeat;
       background-size: 70%,70%;
     }      


</style>