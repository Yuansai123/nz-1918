<template>
  <div class='search' >
     <div class="content">
       <!-- 搜素框 -->
       <div class="inp">
         <input class="ip1 iconfont" type="submit" value=" 🔍 "
><input class="ip2" type="text" placeholder=" 搜索歌曲｀歌手"  v-model="kws" 
        @keyup.enter="search" @input="search($event)">
        <span class="del" @click="del">x</span>
       </div>
       <div class="box">
         <div class="center">
           <!-- list覆盖 -->
           <div class="wrapper" v-if="show" ref="wrapper">
             <div class="lists">
               <ul>
                 <li class="songlist" v-for="(el,index) in songlist" 
                 :key="index" @click="songplay(index)">
                    <p>{{el.songname}}-{{el.singer[0].name}}</p>
                 </li>
               </ul>
             </div>
           </div>
           <!-- 搜索 -->
           <h2 class="ss">热门搜索</h2>
           <div class="listspan">
           <span v-for="(item,index) in list"
           :key="index" @click="btnsearch(item)" 
           >{{item}}</span>
           </div>
         </div>
       </div>
     </div>
  </div>
</template>
<script>
import {getSearchlist,getSongUrlByMid,getRecSongData} from "api/api.js";
import BS from  'better-scroll';
import { mapMutations } from "vuex";
export default {
  data(){
    return{
      list:['我们的家','冰雪奇缘2','张杰','桥边姑娘','星辰大海','哪吒 李宇春','左手指月','邓紫棋','酒醉的蝴蝶','左肩'],//关键词
      songlist:[],//歌曲仓库
      kws:'',
      show:false,
    }
  },
  methods:{
    ...mapMutations(['addSongList','changeCurrendIndex','changeScreen']),
    //热搜
    search(event){
     let ccValue= event.currentTarget.value
     if(ccValue!=''){
      this.getSearch(ccValue)
     }else{
       this.show = false
     }
    },
    btnsearch(item){
      // console.log('字段变了',this.kws)
      this.kws = item
      if(this.kws != ''){
        this.show = true
        this.getSearch(this.kws)
      }
      return this.kws
    },
    //点击清空字段
    del(){
      this.kws = null
      this.show = false
    },
    //点击跳转播放
    songplay(index){
      // 点击歌的li 显示播放器
      this.addSongList(this.songlist)
      // 确定点击的是那首歌
      this.changeCurrendIndex(index)
      // 点击屏幕变大
      this.changeScreen(true)
    },
    //滚动
    // initBs(){
    //   let wrapper = this.$refs.wrapper
    //   this.bs = new BS(wrapper,{probeType:3,click:true})
    // },
    //关键字数据
   async getSearch(kw){
      let mids=[]
       getSearchlist(kw).then((res)=>{
        let cclist=res.data.song.list
        let result=cclist.map((item,index)=>{
        let {albummid,albumname,singer,songmid,songname,audioUrl}=item
        mids.push(songmid)
        let albumUrl=`https://y.gtimg.cn/music/photo_new/T002R300x300M000${albummid}.jpg?max_age=2592000`
        return {albummid,albumname,singer,songmid,songname,albumUrl,audioUrl}
      })
      //获取歌曲播放地址
      let finalData=[]
      
      let cc= getSongUrlByMid(mids).then((ret)=>{
        let urls = ret.urls
        // console.log(urls)
      for(let index=0;index<result.length;index++){
          result[index].audioUrl=urls[index]
          if(urls[index]){
          // 将不能播放的歌曲去除
          finalData.push(result[index])
          }
        }
        // console.log(finalData)
        this.songlist = finalData
        return finalData
        })
       })  
      },
  },
created(){
  //滚动处理、
  // this.initBs()
  },
updated(){
}
}
</script>
<style lang="less" scoped>
@import '../../style/index.less';
.search{
  .w(375);
  height: 44px;
  display: flex;
  color: green;
  .content{
    .w(375);
    box-sizing: border-box;
    //搜素框
    .inp{
      height: 40px;
      margin:10px auto;
      width: 90%;
      box-sizing: border-box;
      position: relative;
      input{
        height: 40px;
        outline: none;
        font-size: @fs-s;
        background: #333;
        float: left;
      }
      .ip1{
        padding:0 6px;
        width: 16%;
        position: absolute;
        border:1px #333 solid ;
        border-radius:8px 0 0 8px;
      }
      .ip2{
        width: 84%;
        position: absolute;
        right: 0;
        height: 38px;
        margin-left:-1px ;
        width: 85%;
        border: none;
        color: rgba(255, 255, 255, 0.3);
        border-radius:0 8px 8px 0;
        border:1px #333 solid ;
      }
      .del{
        display: inline-block;
        color: rgba(255, 255, 255, 0.3);
        font-size: 14px;
        border-radius: 50%;
        width: 15px;
        background-color: #222;
        position: absolute;
        top:10px;
        right: 5px;
        text-align: center;
      }
    }
    .box{
      .w(375);
      .center{
        padding:0 20px;
        h2{
          font-size: @fs-s;
          color:rgba(255, 255, 255, 0.3);
          margin: 30px 0 10px 0;
        }
        .listspan{
          
          span{
            display: inline-block;
            font-size: @fs-s;
            color:rgba(255, 255, 255, 0.3);
            margin: 0 20px 10px 0;
            padding: 5px 10px;
            border-radius:8px;
            background: #333;
          }
          
        }
      }
    }
  }
}
//歌曲列表
 .wrapper{
   .w(375);
   position: fixed;
   left: 0;
   height: 100vh;
   background:#222;
   overflow: hidden;
   .lists{
     width: 90%;
     margin: auto;
     .songlist{
       font-size: @fs-s;
       color:rgba(255, 255, 255, 0.3);
       padding-top: 20px;
       p{
         width: 100%;
         height: 20px;
         text-align: left;
         overflow: hidden;
       }
     }
   }
 }
</style>
http://ustbhuangyi.com/music/api/lyric?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&songmid=000JKutf0nVaSU&platform=yqq&hostUin=0&needNewCode=0&categoryId=10000000&pcachetime=1584169709477

https://y.gtimg.cn/music/photo_new/T002R300x300M000001ZaCQY2OxVMg.jpg?max_age=2592000
000JKutf0nVaSU
http://ustbhuangyi.com/music/api/getCdInfo?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&disstid=102051467&type=1&json=1&utf8=1&onlysong=0&platform=yqq&hostUin=0&needNewCode=0

http://ustbhuangyi.com/music/api/search?w=cc
http://ustbhuangyi.com/music/api/search?format=json&w=cc
0: "http://aqqmusic.tc.qq.com/amobile.music.tc.qq.com/C4000038uc1C1XF1lY.m4a?guid=909025638&vkey=9D480AA058CA3E35F18A58F408C23A3767BD4D0288AABB1C2535D6260FE3B42AC7530DC66C76BAB9EE6E4C7B5A35BE3CADFA0C752EC98D90&uin=0&fromtag=66"





