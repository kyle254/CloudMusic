<template>
  <div class="bigbox">
    <div v-for="item in singeralbum" :key="item.index" class="boxalbum">
      <img v-lazy="item.blurPicUrl" alt="" @click="imgClick(item.id, item.blurPicUrl)" >
      <div class="itemname">{{item.name}}</div>
    </div>
  </div>
</template>

<script>

export default {
  props:{
    singeralbum:{
      type:Array
    }
  },

  methods:{
    imgClick(id,pic) {
       console.log(id);
       this.$emit('img-click',id, pic)
    },
  }
}
</script>

<style scoped>
  
  .bigbox {
  display: flex;
  flex-wrap: wrap;
  }

 .bigbox .boxalbum {
  flex: 1;
  margin: 10px 5px 10px 5px;
 }

  .boxalbum img {
    width: 110px;
    height: 110px;
    border-radius:7px;
  }
  
  .boxalbum .itemname {
    margin-top: 5px;
    font-size: 13px;
    width: 110px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }

</style>