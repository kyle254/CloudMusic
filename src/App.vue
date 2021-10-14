<template>
  <div id="app">  
         <div v-show="!$route.meta.show">
            <m-header></m-header>
            <tab></tab>
         </div>               
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>


  import MHeader from 'cpnts/m-header/m-header'
  import Tab from 'cpnts/tab/tab'
  import Player from 'cpnts/player/player'

  export default {
    name: 'App',
    components:{
      MHeader,
      Tab,
      Player
    }
  } 
</script>


<style scoped>  
</style>
