<template>
  <div class="search-box">
    <div class="title">
     <img src="../../assets/img/sou.svg">
     <img src="../../assets/img/quxiao.svg" v-show="query" @click="clear">
     <div class="box">
       <input type="text" v-model="query"  :placeholder="placeholder"> 
     </div>  
     <div class="cancle" @click="goback">取消</div>
    </div>  
  </div>
</template>

<script>
import {debounce} from 'common/js/utils'
export default {
  props:{
    placeholder:{
      type:String,
      default:'搜索歌曲，歌手'
    }
  },

  data() {
    return {
      query:''
    }
  },

  methods:{
    goback() {
      this.$router.back()
    },

    clear() {
      this.query = ''
      this.$bus.$emit('clearQuery')
    },

    setQuery(query) {
      this.query = query
    },

  },

  created() {
    this.$watch('query',debounce((newQuery) => {
      this.$emit('query',newQuery)
    }, 200))
  }
}
</script>

<style scoped>
  .search-box {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    padding: 0 6px;
    height: 60px;
    background:#222;
  }

  .title {
    width:100%;
    position: relative;
    display: flex;
  }

  .title img:nth-child(1) {
    position: absolute;
    left: 15px;
    top:8px
  }
  
  .title img:nth-child(2) {
    position: absolute;
    right: 70px;
    top:8px
  }


  .cancle {
    width:50px;
    line-height: 30px;
    margin-left: 5px;
  }
  
  .box {
    flex: 2;
    margin: 0 5px;
    height: 30px;
    line-height: 30px;
    background: #323232;
    padding-left: 30px;
    color:#cccc;
    font-size: 13px;
    border-radius: 6px;
  }

</style>