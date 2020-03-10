<template>
  <div id="app">
    <Header> </Header>
    <Tab></Tab>
   <!-- <LessDemo></LessDemo> -->
    <router-view></router-view>
    <!-- 播放器组件 -->
    <Player></Player>
    <!-- <My></My> -->
  </div>
</template>
<script>
// import LessDemo from './demo/less/LessDemo/index'
import Player from 'components/Player'
import Header from './components/Header'
import Tab from './components/Tab'
// import My from './components/My'
export default {
     components:{ Header ,Tab,Player}
}
</script>
<style lang="less" scoped>
@import './style/index.less';
#app{
  background: @black2;
  .w(375);
  height: 100vh;
}
</style>
