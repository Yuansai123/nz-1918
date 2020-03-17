<template>
  <div class='header'>
    <!-- 如果图片在public目录直接用根路径 -->
    <img src="../../../public/0.jpg" alt="">
    <span>MUSIC</span>
    <!-- <router-link to='/my' tag='div' active-class="sel">  -->
      <span class="iconfont" @click='tomy'>&#xe607;</span>
    <!-- </router-link> -->
  </div>
</template>
<script>
export default {
  data(){
    return {}
  },
  methods:{
    tomy(){
      this.$router.push('/My')
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../style/index.less';
.header{
  color: @yellow;
  font-size:@fs-l;
  display: flex;
  justify-content: center;
  align-items: center;
  .w(375);
  height: 44px;
  img{
    width: 18px;
    height: 18px;
  }
  .iconfont{
    display: inline-block;
    position: absolute;
    top:10px;
    left: 85%;
    font-size: @fs-xl;
  }
}
</style>