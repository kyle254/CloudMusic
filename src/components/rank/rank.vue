<template>
  <div class="rank" v-show="!fullScreen">
    <div class="toplist">
      <div class="ban">官方榜</div>
      <div class="item" v-for="item in toplist" :key="item.id" @click="selectItem(item)">
          <div class="imgbox">
          <img v-lazy="item.coverImgUrl">
          </div>
       <div class="songlist">
          <ul>
           <li class="song" v-for="(item,index) in item.tracks" :key="index">
            <div>{{index + 1}}. </div>
            <div class="secondspan">{{item.first}}-{{item.second}}</div>
           </li>
          </ul>
       </div>                                            
      </div>
    </div>
  </div>
</template>

<script>
  import {getRank} from 'api/rank'
  import { CODE } from 'common/js/config'
  import {getGedan} from 'api/music-list'
  import {mapGetters,mapMutations} from 'vuex'

  export default {
     data() {
       return {
         toplist:[],
          ranklist:{
           listdetail:[], // 歌单详情
           collection:0   // 歌单收藏量
          }
       }
     },

     created() {     
      this._getRank()     
     },

     computed:{
        ...mapGetters([
        'fullScreen',
     ])
    },

     methods:{
       _getRank() {
        getRank().then(res=> {
          if (res.data.code === CODE){
            this.toplist = res.data.list.slice(0,4)
           // console.log(res);
          }
        
        })
       },

       selectItem(item) {
         console.log(item);
         this.$router.push('/rank/' + item.id) 
         getGedan(item.id).then(res => {
           if (res.data.code === CODE) {
             console.log(res);
             this.ranklist.listdetail = res.data.playlist.tracks
             this.ranklist.collection = res.data.playlist.subscribedCount
             this.$bus.$emit('ranklistsend',this.ranklist)
           }
         })
         this.setRankList(item)
       },

      ...mapMutations({
        setRankList:'SET_RANK_LIST'
       })

     }
  }

</script>

<style scoped>
  .rank {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom:0;
  }


  .toplist {
    height: 100%;
    overflow: hidden;
  }

  .ban {
    margin-left: 20px;
    margin-top:10px ;
    font-size: 15px;
    font-weight:bold
  }

  .item {
    display: flex;
    margin: 0 20px;
    padding-top: 20px;
    height: 100px;
  }

  .imgbox {
    width: 100px;
    height: 100px;
    margin-right: 5px;
  }

  .imgbox img {
    width: 100%;
    height: 100%;
    border-radius:5%
  }

  .songlist {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 20px;
    height: 100px;
    overflow: hidden;
    /* background-color: #c62f2f; */
    color: white;
    font-size: 13px;
    border-radius:5%
  }

  .songlist>ul li {
    margin-bottom: 6px;
  }


  .son {
    flex: 1;
  }

  .song {
    display: flex;
    line-height: 26px
  }

  .secondspan {
    height:26px;
    width:180px;
    text-overflow:ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }



</style>