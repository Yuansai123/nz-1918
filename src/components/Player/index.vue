<template>
  <div class="player" v-if="songList.length">
    <div v-show="fullScreen" class="big">
      <!-- 头部 -->
      <div class="top">
        <span @click="changeScreen(false)" class="iconfont back">&#xe610;</span>
        <p>{{currentSong.songname}}</p>
      </div>
      <!-- 背景 -->
      <div class="bg">
        <img :src="currentSong.albumUrl" alt />
      </div>
      <!-- 歌手 -->
      <p class="name">{{currentSong.singer[0].name}}</p>
      <!-- 专辑图片 -->
      <div class="img">
        <img :class="cd" :src="currentSong.albumUrl" alt />
      </div>
      <!-- 歌词 -->
      <Lyric :seekTime="seekTime" :play="play"></Lyric>
      <!-- 进度条 -->
      <MyProgress :startTime="startTime" :endTime="endTime" @seekFa="seek"></MyProgress>
      <!-- 播放 -->
      <span class="iconfont xh" @click="btndd(loop)" ref="xh">&#xe647;</span>
      <span class="iconfont prev" @click="prev">&#xe7f3;</span>
      <div class="bao">
        <span class="iconfont play1" @click="togglePlay" ref="texttog">&#xe606;</span>
      </div>
      <span class="iconfont next" @click="next">&#xe7f4;</span>
      <span class="iconfont love" @click="love(currentSong,'lovecookie')" ref="love">&#xe613;</span>
      <!-- 播放器 -->
      <audio
        ref="audio"
        @ended="ended"
        @canplay="canplay"
        @timeupdate="timeupdate"
        :src="currentSong.audioUrl"
      ></audio>
    </div>
    <!-- 小屏 -->
    <div v-show="!fullScreen" class="small">
      <div class="letf-small">
        <div class="imge" @click="changeScreen(true)">
          <img class="cde" :src="currentSong.albumUrl" alt />
        </div>
        <div class="text" @click="changeScreen(true)">
          <p class="name1">{{currentSong.songname}}</p>
          <p class="name2">{{currentSong.singer[0].name}}</p>
        </div>
      </div>

      <!-- 按钮 -->
      <div class="right-small">
        <div class="bao">
          <span class="iconfont cc" @click="togglePlay" ref="texttoggle">&#xe624;</span>
        </div>
        <div class="bao">
          <span class="iconfont dd">&#xe640;</span>
        </div>
      </div>
      <!-- 播放器 -->
      <audio
        ref="audio"
        @ended="ended"
        @canplay="canplay"
        @timeupdate="timeupdate"
        :src="currentSong.audioUrl"
      ></audio>
    </div>
  </div>
</template>
<script>
import MyProgress from "components/Progress";
import Lyric from "components/Lyric";
import { mapState, mapMutations, mapGetters } from "vuex";

export default {
  components: { MyProgress, Lyric },
  data() {
    return {
      startTime: 0,
      endTime: 0,
      loops: ['&#xe647;', "&#xe60f;", "&#xe611;", "&#xe60e;"],
      play: false,
      seekTime: 0,
      lovecc: 0,
      loo:0
    };
  },
  computed: {
    ...mapState(["songList", "fullScreen", "loop"]),
    ...mapGetters(["currentSong"]),
    cd() {
      return this.play ? "cd" : "cd paused";
    }
  },
  methods: {
    ...mapMutations([
      "changeScreen",
      "nextCurrendIndex",
      "prevCurrendIndex",
      "changeCurrendIndex",
      "changeLoop"
    ]),
    //切换循环状态
    btndd(loop){
      this.changeLoop(this.loop)
      // console.log(loop)
      switch (loop) {
        case 1:
          //  单曲循环
          this.$refs.xh.innerHTML='&#xe60f;'
          break;
        case 2:
          // 列表相当于下一曲
          this.$refs.xh.innerHTML='&#xe611;'
          break;
        case 3:
          //随机播放
         this.$refs.xh.innerHTML='&#xe60e;'
         break;
        default:
          this.$refs.xh.innerHTML='&#xe647;'
          break;
      }
      
    },
    togglePlay() {
      this.play = !this.play;
    },
    timeupdate(e) {
      // 随着播放更新时间
      this.startTime = e.target.currentTime;
    },
    canplay() {
      // 歌曲可以播放
      this.audio = this.$refs.audio;
      //调用获取数据
      this.setcookie(this.currentSong, "songcookie");
      this.togglelove(this.currentSong);
      this.lovecc = 0;
      // console.log("可以播放了");
      this.audio.play();
      this.play = true;
      // 获取歌曲的总时长
      this.endTime = this.audio.duration;
    },
    seek(s) {
      console.log("父组件的方法");
      if (!this.audio) {
        return false;
      }
      // 更改播放的时间
      this.audio.currentTime = s;
      // 更改歌词的时间
      this.seekTime = s;
    },
    ended() {
      this.play = false;
      // console.log("播放完毕", this.loop);
      switch (this.loop) {
        case 1:
          //  单曲循环
          this.play = true;
          this.audio.play();
          break;
        case 2:
          // 列表相当于下一曲
          this.nextCurrendIndex();
          break;
        case 3:
          //随机播放
          let count = this.songList.length;
          let index = parseInt(Math.random() * count);
          console.log("随机", index);
          this.changeCurrendIndex(index);
        default:
          break;
      }
    },
    next() {
      //下一曲
      this.nextCurrendIndex();
    },
    prev() {
      // 上一曲
      this.prevCurrendIndex();
    },
    love(cc, lovecookie) {
      //收藏喜欢的歌曲
      this.lovecc++;
      if (this.lovecc % 2 != 0) {
        //收藏起来
        this.setcookie(cc, lovecookie);
        this.$refs.love.innerHTML = "&#xe60a;";
      } else {
        //删除本首歌曲
        this.$refs.love.innerHTML = "&#xe613;";
        let getcookie = JSON.parse(localStorage.getItem(lovecookie));
        var aa = false;
        let Index = null;
        getcookie.map((item, index) => {
          if (item.songname == cc.songname) {
            aa = true;
            Index = index;
          }
        });
        getcookie.splice(Index, 1);
        localStorage.setItem(lovecookie, JSON.stringify(getcookie), 3);
      }
    },
    //设置cookie
    setcookie(cc, songcookie) {
      // 设置cookie

      let token = [
        {
          albummid: cc.albummid,
          albumname: cc.albumname,
          songmid: cc.songmid,
          songname: cc.songname,
          albumUrl: cc.albumUrl,
          singer: cc.singers,
          audioUrl: cc.audioUrl,
          singer: cc.singer
        }
      ];
      // console.log(token)
      let getcookie = JSON.parse(localStorage.getItem(songcookie));
      var falg = true;
      //  console.log(getcookie)
      if (getcookie) {
        getcookie.map((item, index) => {
          if (item.songmid == cc.songmid) {
            getcookie.splice(index, 1);
          }
        });
        // console.log(1111);
        if (falg) {
          let dd = getcookie.push({
            albummid: cc.albummid,
            albumname: cc.albumname,
            songmid: cc.songmid,
            songname: cc.songname,
            albumUrl: cc.albumUrl,
            singers: cc.singers,
            audioUrl: cc.audioUrl,
            singer: cc.singer
          });
          // console.log(dd,11)
        }
        localStorage.setItem(songcookie, JSON.stringify(getcookie), 3);
      } else {
        localStorage.setItem(songcookie, JSON.stringify(token), 3);
      }
    },
    togglelove(lovedd) {
      // 根据歌曲是否被收藏来选择❤️的空心实心
      let lovett = JSON.parse(localStorage.getItem("lovecookie"));
      var ff = false;
      if (!lovett) {
        return false;
      }
      lovett.map((item, index) => {
        if (item.songname == lovedd.songname) {
          ff = true;
        }
      });
      if (ff) {
        this.$refs.love.innerHTML = "&#xe60a;";
      } else {
        this.$refs.love.innerHTML = "&#xe613;";
      }
    }
  },
  async created() {},
  mounted() {
    // this.setcookie()
  },
  updated() {},

  watch: {
    play(newValue, oldValue) {
      //换曲时清除
      this.lovecc = 0;
      //监听歌曲
      // this.togglelove(this.currentSong);
      // 监听当前歌曲
      this.setcookie(this.currentSong, "songcookie");
      // console.log("播放状态", newValue);
      if (!this.audio) return false;
      //点击按钮 还是循环console.log(this.currentSong )
      if (newValue) {
        this.audio.play();
        this.$refs.texttog.innerHTML='&#xe606;'
        this.$refs.texttoggle.innerHTML='&#xe606;'
      } else {
        this.audio.pause();
        this.$refs.texttog.innerHTML='&#xe624;'
        this.$refs.texttoggle.innerHTML='&#xe624;'
      }
    }
  }
};
/*
1.处理数据 
2.显示数据渲染界面 name 歌手 专辑图片
3.专辑图片能动
4.显示歌词 
5.控制器 前一曲 后一曲 循环模式  播放 收藏
6.进度条  
  a.随着时间动
  b.可以点击控制歌曲播放
  c.可以拖动控制歌曲的播放
 textt
*/
</script>
<style lang="less" scoped>
@import "~style/index.less";
.player {
  color: #fff;
  font-size: 28px;
  .big {
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0;
    right: 0;
    background: #222;
    .top {
      width: 100%;
      height: 26px;
      text-align: center;
      line-height: 26px;
      font-size: @fs-l;
      text-align: center;
      position: relative;
      overflow: hidden;
      span {
        float: left;
        width: 10%;
        position: absolute;
        left: 10px;
        top: 5px;
        color: rgba(255, 255, 255, 0.7);
        font-weight: bolder;
        z-index: 3;
      }
      p{
        width: 76%;
        position: absolute;
        left: 12%;
        right: 12%;
      }
    }
    .name {
      font-size: @fs-s;
      text-align: center;
      padding: 10px;
    }
    .bg {
      position: absolute;
      z-index: -9;
      top: 0px;
      width: 100%;
      height: 100%;
      filter: blur(15px);
      img {
        width: 100%;
        height: 100%;
      }
    }
    .img {
      text-align: center;
      // background: red;
      .w(375);
      padding: 20px;
      box-sizing: border-box;
      img {
        width: 85%;
        border-radius: 50%;
        border: 10px solid #ccc;
      }
      & .cd {
        animation: rotate 10s linear infinite;
      }
      & .paused {
        animation-play-state: paused;
      }
    }
  }
  .small {
    position: fixed;
    .w(375);
    bottom: 0px;
    height: 60px;
    background: #333;
    display: flex;
    align-items: center;
    .letf-small {
      width: 80%;
      .imge {
        float: left;
        width: 70px;
        height: 40px;
        padding: 0 10px 0 20px;
        .cde {
          width: 40px;
          height: 100%;
          border-radius: 50%;
        }
      }
      .text {
        float: left;
        .w(180);
        height: 42px;
        p {
          .w(180);
          height: 20px;
          margin: 0 0 2px;
        }
        .name1 {
          font-size: @fs-s;
          color: #fff;
        }
        .name2 {
          font-size: @fs-xs;
          color: rgba(255, 255, 255, 0.3);
        }
      }
    }
    .right-small {
      width: 20%;
      .bool {
        background: green;
      }
      // 播放按钮
      span {
        margin: 0 5px;
      }
    }
  }
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
.prev {
  display: inline-block;
  font-size: 28px;
  color: green;
  margin: 0 10px 0 50px;
}
.play1 {
  display: inline-block;
  font-size: 28px;
  color: green;
  margin: 0 10px;
}
.next {
  display: inline-block;
  font-size: 28px;
  color: green;
  margin: 0 10px;
}
.xh {
  margin:0 0 0 40px;
  font-size: 28px;
  color: green;
}

.love {
  display: inline-block;
  font-size: 28px;
  color: green;
  margin: 0 10px;
}
.cc {
  display: inline-block;
  font-size: 26px;
  color: yellow;
  margin: 0 10px;
}
.dd {
  display: inline-block;
  font-size: 26px;
  color: yellow;
  margin: 0 10px;
}
.bao {
  display: inline-block;
}
//头部返回按钮
.back {
  color: rgba(255, 255, 255, 0.7);
  font-size: 26px;
}
</style>