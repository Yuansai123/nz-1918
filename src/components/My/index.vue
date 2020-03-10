<template>
  <div class="my">
    <div class="center">
      <div class="header">
          <span @click="back" class="iconfont">&#xe610;</span>
          <div class="wrapper">
            <ul class="text">
                <li>我喜欢的</li>
                <li>最近听的</li>
            </ul>
          </div>
      </div>
      <div class="play">
          <i class="iconfont">&#xe624;</i>
          <span>随机播放全部</span>
      </div>
    </div>
  </div>
</template>
<script>
import BS from  'better-scroll';
export default {
  data() {
      return{}
  },
  methods: {
    back() {
      this.$router.go(-1)
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../style/index.less";
.my {
  .w(375);
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #222;
  .center{
    .header{
        position: absolute;
        .w(375);
        height: 32px;
        margin:10px 0 30px ;
        span{
            position: absolute;
            display: inline-block;
            width: 22px;
            color: rgba(255, 255, 255, 0.7);
            font-size: 26px;
            margin:3px 15px ;
        }
        ul{
            position: absolute;
            left: 20%;
            width: 80%;
            li{
                list-style: none;
                float: left;
                color:  rgba(255, 255, 255, 0.3);
                font-size: @fs-s;
                width: 120px;
                padding: 8px;
                text-align: center;
            }
        }
    }
    .play{
        position: absolute;
      top: 72px;
      left:120px ;
      box-sizing: border-box;
      padding: 7px 0;
      width:135px ;
      height: 32px;
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 100px;
        position: absolute;
        i{
          position: absolute;
          left: 10%;
          display: inline-block;
          margin-right: 6px;
          vertical-align: middle;
          font-size: 16px;
          color:  rgba(255, 255, 255, 0.3);
        }
        span{
          position: absolute;
          left: 30%;
          display: inline-block;
          vertical-align: middle;
          font-size: @fs-xs;
          color:  rgba(255, 255, 255, 0.3);
      }
    }
    
  }
}
</style>