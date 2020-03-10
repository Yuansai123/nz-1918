<template>
  <div class='rank'>
      <!-- 滚动的列表 -->
      <div class='wrapper' ref='Wrapper'>
        <div class='content'>
            <ul class="list">
              <li class='' v-for="(item,index) in rankAll"
              :key = 'index'> 
              <div class="box" @click="goTopsinger(item.id)">
                <div class="left">
                  <img :src="item.picUrl" alt="">
                </div>
                <div class="right" >
                  <p v-for="(ele,index) in songList[index]"
                :key='index'>{{index+1}}.{{ele.songname}}-{{ele.singername}}</p>
                </div>
                </div>
              </li>
            </ul>
        </div>
      </div>
      <!-- 嵌套路由 -->
     <transition
        enter-active-class="animated slideInRight"
        leave-active-class="animated slideOutRight"
      >
        <router-view></router-view>
      </transition>
  </div>
</template>
<script>
import { Indicator } from 'mint-ui';
import {getTopList} from 'api/api.js'
import BS from  'better-scroll'
export default {
  data(){
    return{
      rankAll:[],
      songList:[]
    }
  },
  methods:{
    goTopsinger(topid){
      this.$router.push(`/rank/${topid}`)
      // this.changeIndex(index)
    },
    //滚动
    initBs(){
    let wrapper = this.$refs.wrapper
    this.bs = new BS('.wrapper',{
      pullDownRefresh:{
        threshold: 50,
          stop: 20
      },
      pullUpLoad: {
          threshold: 50
        },
        click:true
    })
    },
    gett(firstname){
     getTopList(firstname).then((res)=>{
       this.rankAll = res.data.topList
        let index=0
       let sList=[]
       for(index;index<this.rankAll.length;index++){
          for(var i=0;i<3;i++){
            sList.push(this.rankAll[index].songList[i])
        }
        this.songList.push(sList)
        sList=[]
       }
      //  return {songList,rankAll}
     })
    }
  },
  created() {
    // 初始化数据 把移动距离挂载到this对象下
    console.log(111)
   this.gett()
  },
  mounted(){
    console.log('排行挂载')
    getTopList().then((res)=>{
       this.rankAll = res.data.topList
     }),
     this.initBs() 
  }
  
  
}
</script>
<style lang="less" scoped>
@import '../../style/index.less';
.rank{
  .wrapper{
  position: fixed;
  top: 88px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
    .content{
      .w(375);
      .list{
        li{
          padding-top:20px ;
          margin: 0 20px;
          .box{
            width: 335px;
            height: 100px;
            background: #333;
          }
          .left{
            width: 100px;
            height: 100px;
            float: left;
            img{
              width: 100%;
              height: 100%;
            }
          }
          .right{
            width: 195px;
            height: 80px;
            padding:10px 20px;
            float: left;
            p{
              width: 195px;
              height: 26px;
              color: rgba(255, 255, 255, 0.3);
              font-size: @fs-xs;
              overflow: hidden;
              line-height: 26px;
            }
          }
        }
      }
    }
  }
}  
</style> 