<template>
  <div class="bigbox3">
    <div v-for="item in singerlike" :key="item.index" class="boxlike">
      <img v-lazy="item.img1v1Url" alt="">
      <div class="itemname">{{item.name}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    singerlike:{
      type:Array
    }
  }
}
</script>

<style scoped>
  .bigbox3 {
    display: flex;
    flex-wrap: wrap;
    }

   .bigbox3 .boxlike {
    flex: 1;
    margin: 10px 5px 10px 5px;
   }
    .boxlike img {
      width: 110px;
      height: 110px;
      border-radius:7px;
    }
  
    .boxlike .itemname {
      margin-top: 5px;
      font-size: 13px;
      text-align: center;
    }



</style>