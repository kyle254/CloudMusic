<template>
  <div>
    <div class="box">
      <ul class="tab">
        <li v-for="(item,index) in titles" :key="index" class="tabitem" 
         @click="itemClick(index)" 
         :class="{active1: index === currentIndex}">
         {{item}}</li>
      </ul>
   </div>
  </div>
 
</template>

<script>

  export default {
   data(){
     return {
      currentIndex:0,
      titles:['专辑','MV','详情','相似歌手']                     
     }
   },

   methods:{
      itemClick(index) {
         this.currentIndex = index
         this.$emit('item-click',index) //事件名称
      }
   }
}
</script>

<style scoped>
  .box {
    margin-top: 25px;
    margin-bottom: 15px;
  }

  .tab {
    width: 100%;
    display: flex;
  }

  .tab li:nth-child(-n+3){
    padding-left: 20px;
  }
  

  .tab li:nth-child(3){
    padding-right: 20px;
  }

  .tab li:nth-child(4){
    padding-right: 10px;
  }

  .tabitem {
    flex: 1;
  }

  .active1 {
    color: #c62f2f;
  }


</style>