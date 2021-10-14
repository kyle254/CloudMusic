<template>
  <div class="search-historys" v-show="history.length">
    <ul>
      <li class="search-item" v-for="item in history" :key = "item" @click="selectItem(item)"> 
        <span class="text">{{item}}</span>
        <img src="../../assets/img/quxiao.svg" @click.stop="delectOne(item)">
      </li>
    </ul>
  </div>
</template>

<script>
export default {
   props: {
      history: {
        type: Array,
        default: []
      }
    },
   
   methods:{
     selectItem(item) {
      this.$emit('selectItem', item)
     },
     delectOne(item) {
       this.$emit('delectOne',item)
     }
   }
}
</script>

<style scoped>

   .search-historys {
      width: 100%;
   }


   .search-item {
    width: 100%;
    display: flex;
    align-items: center;
    height: 40px;
    overflow: hidden;
   }

   .text {
     font-size: 13px;
     flex: 1;
     color: #fff;
   }
</style>