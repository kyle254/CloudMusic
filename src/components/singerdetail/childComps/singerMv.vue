<template>
  <div class="bigbox1">
  <div v-for="item in singermv" :key="item.index" class="boxmv">
    <img v-lazy="item.imgurl" alt="">
    <div class="itemname">{{item.name}}</div>
  </div>
</div>
</template>

<script>
export default {
  props:{
    singermv:{
      type:Array
    }
  }
}
</script>

<style scoped>
  .bigbox1 {
    display: flex;
    flex-wrap: wrap;
    }

    .bigbox1 .boxmv {
    flex: 1;
    margin: 10px 5px 10px 5px;
    }

    .boxmv img {
      width: 110px;
      height: 110px;
      border-radius:7px;
    }

    .boxmv .itemname {
      margin-top: 5px;
      font-size: 13px;
      width: 110px;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }

</style>