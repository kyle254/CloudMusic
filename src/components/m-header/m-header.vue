<template>
  <div @click="tosearch"  v-show="!fullScreen">
    <div class="search">
      <div class="title">
        <img src="../../assets/img/sou.svg" alt="">
        <div class="searchdiv">吴亦凡-大碗牢饭</div>    
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

export default {
   computed:{
  ...mapGetters([
    'fullScreen',
  ]),
   
 },

 methods:{
   tosearch() {
      setTimeout(() => {
        this.$router.push('/search')
      }, 300)
    }
 }
}
</script>

<style scoped>

   .search {
    width:100%;
    height:50px;
    line-height:85px;
    background:#cccc;
    padding-top:12.5px;
    box-sizing:border-box;
    position:relative;   
    z-index: 999;
    background-color:#222
   }

   .title {
     position: relative;
     display: flex;
   }

   .title img {
     position: absolute;
     left: 105px;
     top:8px
   }

   .searchdiv{
      width:308px;
      height:30px;
      text-align:center;
      line-height:30px;
      margin:auto;
      border-radius:10vw;
      background:#323232;
      color:#cccc;
      font-size:13px;
   }
</style>