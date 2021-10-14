<template>
   <div v-show="!fullScreen">
    <!-- 导航 -->
   <div class="nav">
     <div class="box">
       <span>语种:</span>
       <div v-for="(item,index) in Languare" :key="index" :class="{active: index === current1}" @click="languageClick(index)">
        <span class="span1">{{item}}</span> 
       </div>
     </div>
     <div class="box">
       <span>分类:</span>
       <div v-for="(item,index) in maleslect" :key="index" :class="{active: index === current2}" @click="maleslectClick(index)">
         <span class="span1">{{item}}</span>
       </div>
     </div>
     <div class="box3">
       <span>筛选:</span>
       <div v-for="(item,index) in character" :key="index" :class="{active: index === current3}" @click="characterClick(index)">
         <span class="span1">{{item}}</span>
       </div>
     </div>
   </div>
   <!-- 内容 -->
   <div class="content">
     <div v-for="item in singers" :key="item.index" class="son" @click="selectSinger(item.id)" >
       <img v-lazy="item.picUrl">
       <!-- <router-link tag="div" :to="'/singer/'+item.id"></router-link> -->
       <div class="itemname">{{item.name}}</div>
     </div>
   </div>
 </div>
</template>

<script>
  import {getSinerList} from 'api/singer'
  import { CODE } from 'common/js/config'
  import { mapMutations } from 'vuex'
  import {mapGetters} from 'vuex'

export default {
    name:'SingerDetail',
    data() {
     return {
      singers:[],
      singerId:0,
      list:{
        type:-1,
        area:-1,
        initial:'a'
      },
      current1:0,
      current2:0,
      current3:0,
      Languare:['全部','华语','欧美','日本','韩国','其他'],
      maleslect:['全部','男歌手','女歌手','乐队组合'],
      character:['A','B','C','D','E','F','G','H','I','J','k','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
    }
  },

 computed:{
   ...mapGetters([
     'fullScreen',
   ])
    
  },

   created() {
   this._getSinerList(this.list.area,this.list.type,this.list.initial)
   },

 methods:{
  languageClick(index) {
    this.current1 = index
    switch(index){
    case 0:
    this.list.area = -1
    break
    case 1:
    this.list.area = 7
    break
    case 2:
    this.list.area = 96
    break
    case 3:
    this.list.area = 8
    break
    case 4:
    this.list.area = 16
    break
    case 5:
    this.list.area = 8
    break
    }
    this._getSinerList(this.list.area,this.list.type,this.list.initial)
   },

  maleslectClick(index) {
  this.current2 = index
  switch(index){
  case 0:
  this.list.type = -1
  break
  case 1:
  this.list.type = 1
  break
  case 2:
  this.list.type = 2
  break
  case 3:
  this.list.type = 3
  break
 }
  this._getSinerList(this.list.area,this.list.type,this.list.initial)
  },

  characterClick(index) {
    console.log(index);
   this.current3 = index
   switch(index){
   case 0:
   this.list.initial = 'a'
   break
   case 1:
   this.list.initial = 'b'
   break
   case 2:
   this.list.initial = 'c'
   break
   case 3:
   this.list.initial = 'd'
   break
   case 4:
   this.list.initial = 'e'
   break
   case 5:
   this.list.initial = 'f'
   break
   case 6:
   this.list.initial = 'g'
   break
   
   case 7:
   this.list.initial = 'h'
   break
   case 8:
   this.list.initial = 'i'
   break
   case 9:
   this.list.initial = 'j'
   break
   case 10:
   this.list.initial = 'k'
   break
   case 11:
   this.list.initial = 'l'
   break
   case 12:
   this.list.initial = 'm'
   break
   case 13:
   this.list.initial = 'n'
   break
   
   case 14:
   this.list.initial = 'o'
   break
   case 15:
   this.list.initial = 'p'
   break
   case 16:
   this.list.initial = 'q'
   break
   case 17:
   this.list.initial = 'r'
   break
   case 18:
   this.list.initial = 's'
   break
   case 19:
   this.list.initial = 't'
   break
   case 20:
   this.list.initial = 'u'
   break

   case 21:
   this.list.initial = 'v'
   break
   case 22:
   this.list.initial = 'w'
   break
   case 23:
   this.list.initial = 'x'
   break
   case 24:
   this.list.initial = 'y'
   break
   case 25:
   this.list.initial = 'z'
   break
   }
  this._getSinerList(this.list.area,this.list.type,this.list.initial)
  },

  selectSinger(id) {
   this.singerId = id
   this.$router.push('/detail/' + id)
   this.setSinger(this.singerId)
  },

  _getSinerList(area,type,initial) {
     const ar = area
     const ty = type
     const il = initial
     getSinerList(ar,ty,il).then(res => {
        if(res.data.code === CODE) {
          // console.log(res);
          this.singers = res.data.artists
        }
     })
   },

  ...mapMutations({
     setSinger: 'SET_SINGER'
  })

   }
}
</script>

<style scoped>

  .box{
    display: flex;
    margin: 10px 0 15px 15px;
    justify-content: center;
    text-align: center;
  }
  .box span {
     margin-right: 5px;
     color: #828385;
  }

/* .box .span1 { */
  /* border-right: 1px solid #c62f2f; */
  /* padding-left: 5px; */
/* } */
.box div {
   flex: 1;
   height: 20px;
   line-height: 20px;
   text-align: center;
   color: #828385;
   font-size: 16px;
   border-radius: 8%;
   border-right: 1px solid 828385;
}

.box3 {
  display: flex;
  flex-wrap: wrap;         
}
.box3 span {
   margin-left: 15px;
   color: #828385;
}

 .active span{
    color: #c62f2f;
 }

 .box3 div {
   flex: 1;
   height: 20px;
   line-height: 20px;
   text-align: center;
   color: #828385;
   font-size: 16px;
   border-radius: 8%;
   border-right: 1px solid 828385;
 }

 .content {
   display: flex;
   flex-wrap: wrap;
 }
 .content .son {
   flex: 1;
   margin: 10px 5px 10px 5px;
 }
 .content img {
   width: 110px;
   height: 110px;
   border-radius:7px;
 }
 .content .itemname {
   margin-top: 5px;
   font-size: 15px;
 }
</style>
