<template>
  <div class="search" v-show="!fullScreen">
    <div class="search-box-wrapper">  
      <search-box ref="searchBox" @query="onQueryChange"></search-box>  
    </div>

  <div class="shortcut-wrapper"  v-show="!query"> 
      <scroll class="shortcut" :data="shortcut" ref="shortcut">
        <div>
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li class="item" v-for="item in hotkey" :key="item.first" @click="addQuery(item.first)">
                <span>{{item.first}}</span>
              </li>
            </ul>
          </div>

           <div class="search-history" v-show="searchHistory.length">
            <h1 class="titlehistory">
                  <span class="text">搜索历史</span>
                  <img src="../../assets/img/lajitong.svg" @click="deleteAll">
            </h1>
            <search-history :history="searchHistory"
                            @selectItem="addQuery"
                            @delectOne="delectOne">
            </search-history>
          </div>
        </div>
      </scroll>                      
  </div>
      
     <search-list :query="query" v-show="query" @select="saveSearch"></search-list>
    
  </div>
</template>

<script>
  import SearchBox from 'base/search-box/searchbox'
  import SearchList from 'base/search-list/searchlist'
  import SearchHistory from 'base/search-history/searchistory'
  import Scroll from 'base/scroll/Scroll'
  import {getSearchHot} from 'api/search'
  import { CODE } from 'common/js/config'
  import {mapGetters,mapActions} from 'vuex'
  export default {

   data() {
     return {
       hotkey:[],
       query:''
     }
   },

    computed:{
    shortcut() {
            return this.hotkey.concat(this.searchHistory)
          },
    ...mapGetters([
      'fullScreen',
      'searchHistory'
    ])
  },

   components:{
     SearchBox,
     SearchList,
     SearchHistory,
     Scroll
   },

   created() {
     this._getSearchHot()
   },

   methods:{
     _getSearchHot() {
       getSearchHot().then(res => {
         if(res.data.code === CODE) {
           this.hotkey = res.data.result.hots.slice(0, 10)
         }
      })
     },
     
     addQuery(query) {
       this.$refs.searchBox.setQuery(query)
     },
     
     onQueryChange(query) {
        this.query = query
     },

     saveSearch() {
       this.saveSearchHistory(this.query)
     },
     
     delectOne(item) {
       this.deleteSearchHistory(item)
     },

     deleteAll() {
       this.clearSearchHistory()
     },

     ...mapActions([
       'saveSearchHistory',
       'deleteSearchHistory',
       'clearSearchHistory'
     ])
   },
   watch:{
     query(newQuery) {
        if (!newQuery) {
          setTimeout(() => {
            this.$refs.shortcut.refresh()
          }, 20)
        }
      }
   }
}
</script>

<style scoped>
  .shortcut-wrapper {
    position: fixed;
    top: 60px;
    bottom: 0;
    width: 100%;
  }

  .shortcut {
    height: 100%;
    overflow: hidden;
  }
  
  
  .hot-key {
    margin: 0 20px 20px 20px;
  }

  .title {
    margin-bottom: 20px;
    font-size: 14px;
    color: #b82525;
  }

  .item {
    display: inline-block;
    padding: 5px 10px;
    margin: 0 20px 10px 0;
    border-radius: 6px;
    background:#222;
    font-size: 13px;
    color: #ccc;
    border:1px solid #ddd
  }


  .search-history {
    position: relative;
    margin: 0 20px;
  }


  .titlehistory {
     display: flex;
     align-items: center;
     height: 40px;
     font-size:14px;
     color: #b82525;
  }

  .text{
    flex: 1 
  }

</style>