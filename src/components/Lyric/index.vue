<template>
  <div class='lyric'>
     {{txt}}
  </div>
</template>
<script>
import {getLyricByMid} from 'api/api.js'
import Lyric from "lyric-parser"
import {Base64 } from 'js-base64'
import { mapState, mapGetters } from 'vuex'
export default {
  data(){
    return{
      txt:'暂无歌词'
    }
  },
  props:['play','seekTime'],
  computed:{
    ...mapGetters(['currentSong']),
  },
  methods:{//事件处理
    getLyric(songmid){
      getLyricByMid(songmid).then((res)=>{
        // 使用base64解码歌词
        let lyricString = Base64.decode(res.lyric)
       if(this.lyricObj){
        //  将之前的歌词播放停止
         this.lyricObj.stop()
       }
        this.lyricObj = new Lyric(lyricString,({txt})=>{
            //  console.log(txt)
             this.txt=txt
             
        })
        //解析完毕直接播放
        this.lyricObj.play()
      })
    },
  },
  watch:{//监察
    seekTime(newTime,oldTime){
      //发生改变说名  歌曲快进   歌词也要快进
      if(!this.lyricObj) return false
      this.lyricObj.seek(newTime*1000)
    },
    play(newPlay,oldPlay){
      if(!this.lyricObj) {return false}
      console.log('歌词播放状态',newPlay)
      this.lyricObj.togglePlay()
      
    },
    currentSong(newSong,oldSong){
      let {songmid}=newSong
      this.getLyric(songmid,1)
    },
   
  },
   mounted() {
      let {songmid}=this.currentSong
      this.getLyric(songmid,0)
    }, 
}
</script>
<style lang="less" scoped>
@import '~style/index.less';
.lyric{
  font-size: @fs-l;
  font-weight: bolder;
  color: purple;
}

</style>