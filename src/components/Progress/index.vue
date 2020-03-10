<template>
    <div class="progress">
        <span>{{startTime|handleTime}}</span>
        <div class="wrapper" ref="wrapper" @click="clickProgress">
            <div class="content" ref="content"></div>
            <div class="dot" ref="dot"
            @touchstart= 'touchStart'
            @touchmove= 'touchMove'
            @touchend= 'touchEnd'
            >
                <div class="red"></div>
            </div>
        </div>
        <span>{{endTime|handleTime}}</span>
    </div>
</template>
<script>
export default {
    methods:{
        jump(precent){
            let time = precent*this.endTime/100
            this.$emit('seekFa',time)
        },
        touchStart(e){
            this.touch = true
            this.distance = 0
        },
        touchMove(e){
            let left = this.$refs.wrapper.getBoundingClientRect().left
            let width = this.$refs.wrapper.clientWidth
            this.distance = e.touches[0].pageX -left
            if(this.distance>=0&&this.distance<=width){
                this.offsetMove(this.distance)
            }
        },
        touchEnd(){
            this.touch = false
            this.offsetMove(this.distance)
        },
        clickProgress(e){
            let x = e.pageX
            let left = this.$refs.wrapper.getBoundingClientRect().left
            let distance = x-left
            this.offsetMove(distance)
        },
        offsetMove(distance){
            let precent=(distance/this.$refs.wrapper.clientWidth)*100
            this.$refs.content.style.width = precent+'%'
            this.$refs.dot.style.transform = `translateX(${distance}px)`
            if(this.touch){return false}
            this.jump(precent)
        }
    },
    props:{
        startTime:{type:Number,default:0},
        endTime:{type:Number,default:0}
    },
    filters:{
        handleTime(data){
            let time = parseInt(data)
            let m = parseInt(time/60)
            let s = time%60
            s=s<=9?`0${s}`:s
            return m+':'+s
        }
    },
    watch:{
        startTime(newValue,oldValue){
            if(this.touch){return false}
            let precent = (this.startTime/this.endTime)*100
            this.$refs.content.style.width = precent+'%'
            let width = this.$refs.wrapper.clientWidth*precent/100
            this.$refs.dot.style.transform = `translateX(${width}px)`

        }
    },
    created(){

    }
}
/*
1. 显示开始时间 显示结束时间 v
2. 时间随着歌曲的播放改变 v
3. 进度条改变 v
4. 进度条可以点击控制歌曲 
   a.能点 v
   b.圆点移动到点击位置 v
   c.进度条移动到点击位置 v
   d.歌曲跳到规定的时间 v
5. dot可以拖动控制歌曲
   a.按下事件 记录按下的位置  移动事件 抬起事件
   b.圆点跟随手指移动
   c.进度条跟随手指移动
   d.歌曲跳到规定的时间 手指抬起的时候快进
*/
</script>
<style lang="less" scoped>
@import '~style/index.less';
.progress{
    .w(375);
    height: 30px;
    display: flex;
    font-size: @fs-s;
    align-items: center;
    justify-content: center;
    span{
        display: inline-block;
        width: 30px;
    }
    .wrapper{
        margin:0 10px;
        .w(270);
        height: 4px;
        background: rgba(0, 0, 0, 0.3);
        position: relative;
        .content{
            height: 4px;
            width: 0%;
            background: @yellow;
        }
    .dot{
        width:16px ;
        height: 16px;
        background: #fff;
        border-radius: 50%;
        position: absolute;
        transform: translateX(-8px);
        top:-6px;
        .red{
            position: absolute;
            top:2px;
            left: 2px;
            height: 12px;
            width: 12px;
            background: @yellow;
            border-radius: 50%;
        }
    }
    }
}

</style>