<template>
  <div class="songlist">
    <ul>
      <li @click="selectItem(songs,index)" v-for="(item,index) in songs" :key="index" class="item">
        <div class="content3">
          <div class="title">
            <div class="number">{{index + 1}} </div>
            <h2 class="name33">{{item.name}}</h2>
          </div>
         
          <p class="desc">{{getDesc(item)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props:{
     songs: {
      type:Array
    }
  },

  methods: {
     
     selectItem(item, index) {
       this.$emit('select', item, index)
     },

     getDesc(item) {
        return `${item.ar[0].name} · ${item.name}`
      },
  }
}
</script>

<style scoped>
   .songlist {
     margin-left: 15px;
     margin-top: 5px;
   }
   .songlist .item {
      display: flex;
      align-items: center;
      box-sizing: border-box;
      height: 64px;
      font-size: 13px;
   }

   .title {
     display: flex;
   }


   .number {
     margin-right: 20px;
   }

   .content3 {
     flex: 1;
     display: flex;
     flex-direction: column;
     line-height: 20px;
     overflow: hidden;
   }

   .name33 {
     color: #fff;
     font-size: 15px;
   }

   .desc {
     margin-top: 4px;
     font-size: 13px;
     color: #828385;
     margin-left: 20px;
   }
</style>