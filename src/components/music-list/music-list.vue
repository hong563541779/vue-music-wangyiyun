<template>
  <div class="music-list">
    <div class="header">
      <div class="back">
        <i class="icon-back" @click="back">back</i>
      </div>
      <h1 class="title" v-html="title"></h1>
    </div>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class="filter"></div>
    </div>
    <scroll :data="songs" class="list" ref="list">
      <div class="song-list-wrapper">
        <song-list :songs="songs"></song-list>
      </div>
    </scroll>
  </div>
</template>
<script type="text/ecmascript-6">
import SongList from 'base/song-list/song-list'
import Scroll from 'base/scroll/scroll'
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    bgImage: {
      type: String,
      default: ''
    },
    songs: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  components: {
    SongList,
    Scroll
  },
  computed: {
    bgStyle () {
      return `background-image:url(${this.bgImage})`
    }
  },
  mounted () {
    this.$refs.list.$el.style.top = `${this.$refs.bgImage.clientHeight}px`
  },
  methods: {
    back () {
      this.$router.back()
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .music-list {
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    width: 100%
    background: $color-background
    .header {
      position: fixed
      top: 0
      height: 44px
      width: 100%
      color: $white
      z-index: 100
      .back {
        position: absolute
        top: 0px
        left: 6px
        z-index: 50
        .icon-back {
          position: absolute
          left: 0
          line-height: 44px
        }
      }
      .title {
        position: absolute
        left: 70px
        line-height: 44px
        font-size: $font-size-medium-x
      }
    }
    .bg-image {
      /*设置背景图片为10:7比例*/
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      z-index: 10
    }
    .list {
      position: fixed
      top: 0
      bottom: 0
      width: 100%
    }
  }
</style>
