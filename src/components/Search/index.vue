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
           <div class="sparwa" v-if="show">
             <div class="lists">
               <ul>
                 <li class="songlist" v-for="(el,index) in songlist" 
                 :key="index" @click="songplay(index)">
                    <p>{{el.name}}-{{el.singer}}</p>
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
import {getSearchlist,getSongUrlByMid} from "api/api.js";
import BS from  'better-scroll';
import { mapMutations } from "vuex";
export default {
  data(){
    return{
      list:['我们的家','冰雪奇缘2','张杰','桥边姑娘','星辰大海','哪吒 李宇春','左手指月','邓紫棋','酒醉的蝴蝶','左肩'],//关键词
      songlist:[],//歌曲仓库
      kws:'',
      show:false
    }
  },
  methods:{
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
      console.log('字段变了',this.kws)
      this.kws = item
      if(this.kws != ''){
        this.show = true
        this.getSearch(this.kws)
      }
    },
    del(){
      this.kws = null
      this.show = false
    },
    //手动搜素
    songplay(){},
    //滚动
    initBs(){},
    //关键字数据
    getSearch(kw){
       getSearchlist(kw).then((res)=>{
        this.songlist = res.data.song.itemlist
        console.log(this.songlist)
      })  
      }
  },
async created(){
  this.getSearch()
 
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
 .sparwa{
   .w(375);
   position: fixed;
   left: 0;
   height: 100vh;
   background:#222;
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

https://y.gtimg.cn/music/photo_new/T001R300x300M000000JKutf0nVaSU.jpg?max_age=2592000
http://imgcache.qq.com/music/photo/mid_album_58/j/0/001ys2aS1sU6j0.jpg
https://y.gtimg.cn/music/photo_new/T002R300x300M000000657sU1wUTIM.jpg?max_age=2592000
http://ustbhuangyi.com/music/api/lyric?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&songmid=003HHPxJ4638xA&platform=yqq&hostUin=0&needNewCode=0&categoryId=10000000&pcachetime=1584146190779
https://y.gtimg.cn/music/photo_new/T002R300x300M000000TIBdC0xuRPc.jpg?max_age=2592000
000TIBdC0xuRPc
http://ustbhuangyi.com/music/api/search?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&w=%E5%BC%A0%E6%9D%B0&p=1&perpage=20&n=20&catZhida=1&zhidaqu=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&remoteplace=txt.mqq.all&uin=0&needNewCode=1&platform=h5
http://ustbhuangyi.com/music/api/search?g_tk=1928093487&w=zhangjie
000JKutf0nVaSU