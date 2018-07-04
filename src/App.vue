<template>
  <div id="app">
      <m-header></m-header>
      <tab></tab>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      <player></player>
  </div>
</template>

<script type="text/ecmascript-6">
import MHeader from 'components/m-header/m-header.vue'
import Tab from 'components/tab/tab.vue'
import Player from 'components/player/player'
export default {
  components: {
    MHeader,
    Tab,
    Player
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  #app
    /*color: $color-theme*/
    position: fixed
    top: 0
    height: 100%
    width: 100%
    overflow: hidden
</style>
