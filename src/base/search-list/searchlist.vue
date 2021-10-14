<template>
  <div>
  <div class="suggest" v-show="show">
    <div class="suggesttitle" v-show="singerName">
      <div class="title">
        <img src="../../assets/img/geshou.svg" alt="">
        <span>歌手</span>   
      </div>    
      <div class="singername" v-for="item in singerName" :key="item.id" @click="singernameBtn(item)">
         <div>{{item.name}}</div>
      </div>
    </div>

    <div class="suggesttitle">
      <div class="title">
         <img src="../../assets/img/music.svg" alt="">
         <span>单曲</span>   
      </div>

      <div class="list">
        <ul class="suggest-list">
          <li class="suggest-item" v-for="item in songs" :key="item.id" @click="listBtn">
            <div class="name"><p class="text">{{item.name}}-{{item.artists[0].name}}</p></div>
          </li>
        </ul>
      </div>                    
    </div> 

     <div class="suggesttitle">
        <div class="title">
          <img src="../../assets/img/album.svg" alt="">
          <span>专辑</span>   
        </div>    
        <div class="singername" v-for="item in album" :key="item.id">
          <div>{{item.name}}</div>
        </div>
     </div>
    
  </div>

  <div class="search" v-show="!show">
     <div class="search-item" v-for="(item,index) in searchss" :key="item.id" @click="selectItem(index,item)">
       <h2>{{item.name}}</h2>
       <p>{{item.author}}</p>
     </div>
  </div>
</div>
</template>

<script>
  import { getSearch_Suggest,getSearch_Search} from 'api/search'
  import { CODE } from 'common/js/config'
  import { mapMutations,mapActions } from 'vuex'

export default {
  data() {
    return {
      songs:[],
      singerName:'',
      album:[],
      searchss:[],
      show:true,
    }
  },

  props:{
    query:{
      type: String,
      default: ''
    },
  },

  created() {
   this.$bus.$on('clearQuery', () => {
         this.show = !this.show
         if(!this.show) {
           this.show = !this.show
         }
         this.searchss = []
     })
  },

  methods:{
    search() {
     getSearch_Suggest(this.query).then(res => {
        if(res.data.code === CODE) {
           console.log(res);
           this.songs = res.data.result.songs
           this.singerName = res.data.result.artists
           this.album = res.data.result.albums
        }
     })
    },
    
    // 跳转到歌手详情
    singernameBtn(item) {
      console.log(item);
       this.$router.push('/detail/' + item.id)
        this.setSinger(item.id)
    },
    
  
    selectItem(index) {
      this.selectPlay({
        list: this.searchss,
        index: index
      })
      this.$emit('select')
    },

    listBtn() {
      this.show = !this.show
      getSearch_Search(this.query).then(res => {
         if(res.data.code === CODE) {
           console.log(res);
           // this.searchss = res.data.result.songs.slice(0, 15)
           this._setsearchData(res.data.result.songs.slice(0, 15))
         }
      })
    },
    
    // 处理搜索结果数组
    _setsearchData(list) {
      console.log(list);
       const returnData = []
       for (const x in list) {
       const data = {}
       data.id = list[x].id
       data.name = list[x].name
       data.author = list[x].artists[0].name + ' - ' + list[x].album.name
       data.backgroundImage = list[x].artists[0].img1v1Url
       data.status =  list[x].status
       returnData.push(data)
      }
      this.searchss = returnData
    },

    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),
    ...mapActions([
      'insertSong',
      'selectPlay'
    ])
  },

  watch:{
    query() {
      this.search()
    }
  }

}
</script>

<style scoped>
   
   .suggesttitle {
     margin-left: 20px;
     margin-bottom: 20px; 
   }

   .title{
     display: flex;
     color: #c62f2f;
   }

   .title>span {
     margin-left: 5px;
   }

   .suggest {
     width: 100%;
     height: 100%
    }

   .suggest-item {
     display: flex;
     margin: 10px 0 0 5px;
     font-size:14px;
   }

    .singername {
      display: flex;
      margin: 10px 0 0 5px;
      font-size:14px;
   }

   .name {
      font-size: 14px;
      padding-bottom: 10px;
   }

   .search {
     width:100%;
     height: 100%;
   }

   .search-item{
     height:40px;
     width:80%;
     margin-top: 20px;
     margin-left: 20px;
     /* background-color: orange; */
     border-bottom:1px solid #ddd;
     box-sizing:border;
   }

   .search-item h2 {
     font-size:14px;
   }
   
   .search-item p {
     font-size:14px;
     color:#666;
     margin-top:10px;
   }




</style>
