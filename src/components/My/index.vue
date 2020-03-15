<template>
  <div class="my">
    <div class="center">
      <div class="header">
        <span @click="back" class="iconfont">&#xe610;</span>
        <div class="nn">
          <ul class="text">
            <li  v-for="(item,index) in heads" :key='index'
            @click="toggle(index)" :class="{active:num==index}"
            >{{heads[index]}}</li>
          </ul>
        </div>
      </div>
      <div class="play" @click="allPlay">
        <i class="iconfont">&#xe624;</i>
        <span>随机播放全部</span>
      </div>
      <div class="wrapper" ref="wrapper">
        <div class="content">
          <ul class="list">
            <li class="songlist" v-for="(item,index) in list" :key="index" @click="openPlay(index)">
              <div class="box">
                <h4 class="songname">{{item.songname}}</h4>
                <p class="singernaem">{{item.singers}}-{{item.songname}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BS from "better-scroll";
import { mapState,mapMutations } from "vuex";
export default {
  data() {
    return {
      list: [],
      heads:['我喜欢的','最近听的'],
      num:0
    };
  },
  methods: {
    ...mapMutations(["addSongList", "changeCurrendIndex", "changeScreen",'upLoop']),
    back() {
      this.$router.go(-1);
    },
    //点击切换tab
    toggle(index){
      this.num = index;
      if(index==1){
        this.getcookie(true)
      }else{
        this.lovecookie()
      }
    },
    //随机播放
    allPlay() {
      // console.log(111)
      for (let index = 0; index < this.list.length; index++) {
        this.changeCurrendIndex(index);
      }
      
      this.addSongList(this.list);
      this.changeScreen(true);
      this.upLoop(3);
    },
    //歌曲点击播放
     openPlay(index){
      //  console.log(this.list)
      // 点击歌的li 显示播放器
      this.addSongList(this.list)
      // 确定点击的是那首歌
      this.changeCurrendIndex(index)
      // 点击屏幕变大
      this.changeScreen(true)
    },
    //滚动处理
    initBs() {
      let wrapper = this.$refs.wrapper;
      this.bs = new BS(wrapper, {
        pullDownRefresh: {
          threshold: 50,
          stop: 20
        },
        pullUpLoad: {
          threshold: 50
        },
        click: true
      });
    },
    getcookie(){
      //调用最近听的的cookie
      let getcookies = JSON.parse(localStorage.getItem("songcookie"));
      this.list =getcookies;
      // console.log(this.list);
    },
    lovecookie(){
      //获取我喜欢的 cookie
      let love = JSON.parse(localStorage.getItem("lovecookie"));
      this.list = [];
      this.list = love;
    }
  },
 async created (){
    //tab切换
    this.toggle(0)
    this.getcookie();
    this.lovecookie();
    //滚动
    this.$nextTick(() => {
      this.initBs();
    });
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
  .center {
    //头部
    .header {
      position: absolute;
      .w(375);
      height: 32px;
      margin: 10px 0 30px;
      //返回
      span {
        position: absolute;
        display: inline-block;
        .w(22);
        color: rgba(255, 255, 255, 0.7);
        font-size: 26px;
        margin: 3px 15px;
      }
      //头部 选项卡
      ul {
        position: absolute;
        left: 15%;
        width: 90%;
        color: rgba(255, 255, 255, 0.3);
        font-size: @fs-s;
        li {
          list-style: none;
          float: left;
          .w(120);
          padding: 8px;
          text-align: center;
        }
      }
    }
    //播放按钮
    .play {
      position: absolute;
      top: 12%;
      left: 33%;
      box-sizing: border-box;
      padding: 7px 0;
      .w(135);
      height: 32px;
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 100px;
      position: absolute;
      i {
        position: absolute;
        left: 10%;
        display: inline-block;
        margin-right: 6px;
        vertical-align: middle;
        font-size: 16px;
        color: rgba(255, 255, 255, 0.3);
      }
      span {
        position: absolute;
        left: 30%;
        display: inline-block;
        vertical-align: middle;
        font-size: @fs-xs;
        color: rgba(255, 255, 255, 0.3);
      }
    }
    //滚动容器  歌曲数据列表
    .wrapper {
      .w(375);
      height: 100vh;
      // background: red;
      position: absolute;
      top: 18%;
      overflow: hidden;
      .content {
        padding: 20px 30px;
        // background: green;
        ul {
          box-sizing: border-box;
          .w(315);
          .songlist {
            height: 54px;
            .box {
              height: 44px;
              margin: 10px 0 0;
              .songname {
                .w(315);
                font-size: @fs-s;
                overflow: hidden;
                color: #fff;
              }
              .singernaem {
                margin-top: 4px;
                .w(315);
                font-size: @fs-s;
                overflow: hidden;
                color: rgba(255, 255, 255, 0.3);
              }
            }
          }
        }
      }
    }
  }
}
.active{
  color: #fff;
  background-color: #333;
}
</style>