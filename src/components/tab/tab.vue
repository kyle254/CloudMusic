<template>
  <div class="tab" v-show="!fullScreen">
     <!-- tag属性表示被渲染成什么标签 -->
    <router-link to="/recommend" tag="div" class="tab-item">
      <span class="tab-link">推荐</span>
    </router-link>

    <router-link to="/singer" tag="div" class="tab-item">
      <span class="tab-link">歌手</span>
    </router-link>
    
    <router-link to="/rank" tag="div" class="tab-item">
      <span class="tab-link">排行</span>
    </router-link>

    <router-link to="/mine" tag="div" class="tab-item">
      <span class="tab-link">我的</span>
    </router-link>
   
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  computed:{
  ...mapGetters([
    'fullScreen',
  ])
   
 },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .tab
    display: flex
    position: relative
    height: 44px
    line-height: 44px
    font-size: 18px
    z-index 999
    background-color #222
    .tab-item
      flex: 1
      text-align: center
      .tab-link
        padding-bottom: 5px
        // router-link-active 表示被点击时的状态
      &.router-link-active
        .tab-link
          color: #c62f2f
          border-bottom: 2px solid #c62f2f
</style>