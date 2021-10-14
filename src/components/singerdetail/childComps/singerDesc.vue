<template>
  <div class="bigbox2">
    <div class="one">
      <div class="jianjie">简介</div>
      <div class="content"> {{singerdesc.briefDesc}}</div>
    </div>

    <div v-for="item in singerdesc.introduction" :key="item.index" class="one">
       <div class="jianjie">{{item.ti}}</div>
       <div class="content">{{item.txt}}</div>
    </div>

  </div>
</template>

<script>
export default {

  props:{
    singerdesc:{
      type:Object
    }
  }
}
</script>

<style scoped>

  .bigbox2 {
    margin-top: 30px;
  } 
   
  .one {
    padding-left: 15px;
    padding-right: 15px;
    margin-top: 30px;
  }

  .jianjie {
    width: 100px;
  }

  .content {
    width: 100%;
    height: 100%;
    /* 首行缩进 */
    text-indent: 2em; 
    /* 行间距 */
    line-height: 2em;
    font-size: 13px;
    margin-top: 5px;
    color: #828385;
  }

</style>