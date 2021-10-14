<template>
   <div class="progress-bar" ref="progressBar">
     <div class="bar-inner" ref="bg">
       <div class="progress" ref="progress"></div>
       <div class="progress-btn-wrapper" 
            ref="progressBtn"
            @touchstart="touchstart"
            @touchmove="touchmove"
            @touchend="touchend"
            >
          <div class="progress-btn"></div>
       </div>
     </div>
   </div>
</template>

<script>


// 按钮的宽度
const progressBtnWidth = 16;

export default {
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },

   created() {
      this.touch = {}
    },

  methods:{
   touchstart(e) {
      //console.log(e);
      this.init = true
      this.touch.pageX = e.touches[0].pageX
      this.touch.left = this.$refs.progress.clientWidth
      this.touch.maxWidth = this.$refs.bg.clientWidth
   },

   touchmove(e) {
     if (!this.init) return
      const moveX = e.touches[0].pageX - this.touch.pageX
      //console.log(moveX);
      /*
        Math.min 限制移动最大值为100%
        Math.max 限制移动最小值为0%
        两者结合可限制移动范围在0% ~ 100%
      */
      this.percentage = Math.max(0, (Math.min(this.touch.maxWidth - 0.8, moveX + this.touch.left)) / (this.touch.maxWidth - 0.8))
      //console.log(this.percentage);
      this.offset(this.percentage)
      this.$emit('touchmove', this.percentage)
   },

   touchend() {
      this.init = false
      this.$emit('touchend', this.percentage)
   },

  //  progressClick(e) {
    //  const rect = this.$refs.progressBar.getBoundingClientRect()
    //  const offsetWidth = e.pageX - rect.left
    //  this.offset(offsetWidth)
    //  const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
    //  const percent = this.$refs.progress.clientWidth / barWidth
  //  },

   offset(number) {
    const num = number * 100
    this.$refs.progress.style.width = `${num}%`
    this.$refs.progressBtn.style.marginLeft = `${num}%`    
   },
  },

  watch: {
    percent(newPercent) {
      if(newPercent >= 0 && !this.init) {    
        this.offset(newPercent)                                
      }
    }
  }
}
</script>

<style>
   .progress-bar {
     height: 30px;
   }

   .bar-inner {
     position: relative;
     top: 13px;
     height: 4px;
     background: rgba(0, 0, 0, 0.3);
   }

   .progress {
     position: absolute;
     height: 100%;
     background: #c62f2f;
   }

   .progress-btn-wrapper {
     position: absolute;
     left: -8px;
     top: -13px;
     width: 30px;
     height: 30px;
   }

   .progress-btn {
     position: relative;
     top: 7px;
     left: 7px;
     box-sizing: border-box;
     width: 16px;
     height: 16px;
     border: 3px solid #c62f2f;
     border-radius: 50%;
     background: #ffff;
 
   }


</style>