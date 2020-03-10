<template>
  <div class="ranksinger">
    <!-- 头部导航 -->
    <div class="top">
      <span @click="back" class="iconfont back">&#xe610;</span>
      <span class="nam">{{name}}</span>
    </div>
    <!-- 头像 -->
    <div class="avator" :style="{'background-image':`url(${avator})`}" ref="img">
      <div class="shadow"></div>
      <div class="tbn" @click="allPlay">
          <i class="iconfont">&#xe624;</i>
          <span class="text">随机播放全部</span>
        </div>
    </div>
    <!-- 歌曲列表 -->
    <div class="songlist" ref="wrapper">
      <div class="content">
        <ul>
          <li v-for="(item,index) in list" :key="index" 
          @click="openPlay(index)">
            <span class="num">{{index+1}}</span>
            <div class="right">
              <h4>{{item.albumname}}</h4>
              <p>
                <span>
                  {{item.singers}}
                </span>- {{item.albumname}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import BS from "better-scroll";
import { getSongList,getSongUrlByMid ,getRecSongData} from "api/api.js";
import Store from "../../store/index.js";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      list: [],
      name: "请稍等。。。",
      avator: "",
      Alllist: []
    };
  },
  methods: {
    ...mapMutations(["addSongList", "changeCurrendIndex", "changeScreen",'upLoop']),
    back() {
      this.$router.go(-1);
    },
    openPlay(index) {
      // 点击歌的li 显示播放器
      this.addSongList(this.list);
      // 确定点击的是那首歌
      this.changeCurrendIndex(index);
      // 点击屏幕变大
      this.changeScreen(true);
    },
    //随机播放设置
    allPlay(list){
      for(let index=0;index<this.list.length;index++){
        this.changeCurrendIndex(index);
      }
      this.addSongList(this.list);
      this.changeScreen(true);
      this.upLoop(3);
    },
    //滚动设置
    initBs() {
      let img = this.$refs.img;
      let imgH = img.clientHeight;
      let wrapper = this.$refs.wrapper;
      this.bs = new BS(wrapper, { probeType: 3, click: true });
      this.bs.on("scroll", ({ y }) => {
        // 获取图片的元素和高度
        if (y >= 0) {
          //下拉放大
          let precent = 1 + y / imgH;
          img.style.transform = `scale(${precent})`;
          img.style.zIndex = 1;
        } else {
          //向上滚动
          // 没有到顶部 滚动层的层级高
          // 到达顶部额时候 图片的层级高
          if (Math.abs(y) > imgH - 40) {
            img.style.zIndex = 1;
            img.style.paddingTop = "0%";
            img.style.height = "40px";
          } else {
            img.style.zIndex = -1;
            img.style.paddingTop = "70%";
            img.style.height = 0;
          }
        }
      })
    },
    //歌曲数据处理
     handleList(list) {
      let result = [];
      let mids = [];
      result = list.map((item, index) => {
        let { albummid, albumname,singer, songmid, songname } = item;
        let albumUrl = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${albummid}.jpg?max_age=2592000`;
        mids.push(songmid);
        return { albummid, albumname, singer,songmid, songname,albumUrl};
      });
      return { result, mids };
    }
  },
  async created() {
    //获取到  diss的id
    let  {disstid}  = this.$route.params;
    //根据id获取  diss数据
    let {cdlist} = await getRecSongData(disstid);
    let cdlists = cdlist[0]
     let lists = cdlists.songlist
    //赋值  歌曲  榜名  头像
    this.name = cdlists.dissname;
    this.avator = cdlists.logo;
    // 处理cdlists数据
    let {result,mids} = this.handleList(lists);
    //通过接口  将mids  歌曲的媒体id  换成  音乐地址  之后数据合并
    let {urls} = await getSongUrlByMid(mids);
    let finalData = [];
    let sing = "";
    for (let index = 0; index<result.length;index++){
       for(let i=0;i<result[index].singer.length;i++){
         sing += result[index].singer[i].name+'/'
         result[index].singers=sing.substring(0,sing.length-1)
         
       }
       sing = '';
       result[index].audioUrl = urls[index]
      if(urls[index]){
        //清除不能播放的歌曲
        finalData.push(result[index]);
      }
    }
    console.log(finalData);
    this.list = finalData;
    //滚动处理
    this.$nextTick(()=>{
      this.initBs();
    })
  }
};
</script>
<style lang="less" scoped>
@import "../../style/index.less";
.ranksinger {
  .w(375);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #222;
  //头部
  .top {
    .w(375);
    height: 40px;
    color: #fff;
    font-size: @fs-xl;
    position: absolute;
    top: 5px;
    left: 10px;
    z-index: 3;
    .back {
      position: absolute;
      left: 10px;
      font-size: 26px;
      color: rgba(255, 255, 255, 0.7);
      font-weight: bolder;
    }
    .nam {
      display: inline-block;
      width: 100%;
      text-align: center;
    }
  }
  //   头像
  .avator {
    .w(375);
    padding-top: 70%;
    background-size: cover;
    position: absolute;
    top: 0px;
    z-index: -1;
    .shadow {
      position: absolute;
      top: 0;
      background: rgba(7, 17, 27, 0.4);
      width: 100%;
      height: 100%;
    }
    .tbn{
      position: absolute;
      top: 80%;
      left:120px ;
      box-sizing: border-box;
      padding: 7px 0;
      width:135px ;
      height: 32px;
      border: 1px solid #FFCd32;
      border-radius: 100px;
        position: absolute;
        i{
          position: absolute;
          left: 10%;
          display: inline-block;
          margin-right: 6px;
          vertical-align: middle;
          font-size: 16px;
          color: #FFCd32;
        }
        span{
          position: absolute;
          left: 30%;
          display: inline-block;
          vertical-align: middle;
          font-size: @fs-xs;
          color: #FFCd32;
        
      }
    }
  }
  //歌曲
  .songlist {
    position: fixed;
    background: #222;
    top: 270px;
    bottom: 0;
    left: 0;
    right: 0;
    //   overflow: hidden;
    .content {
      padding: 10px 30px;
      background: #222;

      li {
        font-size: @fs-s;
        color: #fff;
        height: 61px;
        .num {
          float: left;
          width: 40px;
          margin-right: 15px;
          margin-top:16px ;
          color: yellow;
          font-size: 20px;
          text-align: center;
        }
        .right {
          float: left;
          width: 260px;
          display: inline-block;
          margin-top: 10px;
          h4 {
            height: 20px;
            width: 200px;
            display: inline-block;
            line-height: 20px;
            overflow: hidden;
          }
          p {
            margin-top: 0px;
            height: 20px;
            color: rgba(255, 255, 255, 0.3);
            line-height: 20px;
            overflow: hidden;
          }
        }
      }
    }
  }
}
</style>
