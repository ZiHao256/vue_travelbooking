<template>
  <div class="box">
    <el-carousel :height="imgHeight" :interval=3000 indicator-position="outside">
      <el-carousel-item v-for="(img,index) in sceneryList" :key="index">
        <img ref="imgH" :src="img.url" style="width: 100%" alt="" @load="imgLoad">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // 图片来源
        sceneryList: [
          {
            url: require('@/assets/scenery/6.jpg')
          },
          {
            url: require('@/assets/scenery/1.jpg')
          },
          {
            url: require('@/assets/scenery/2.jpg')
          },
          {
            url: require('@/assets/scenery/3.jpg')
          },
          {
            url: require('@/assets/scenery/4.jpg')
          },
          {
            url: require('@/assets/scenery/5.jpg')
          },

        ],
        //  高度自适应
        imgHeight: '0',
        bannerList: ['xxx']
      }
    },
    methods: {
      imgLoad() {
        this.$nextTick(() => {
          this.imgHeight = `${this.$refs.imgH[0].height}px`;
          // console.log(this.imgHeight)
        })
      }
    },
    mounted() {
      this.imgLoad();
      window.addEventListener("resize", this.imgLoad, false);
    },
    destroyed() {
      window.removeEventListener("resize", this.imgLoad, false);
    },
  }
</script>

<style>

</style>
