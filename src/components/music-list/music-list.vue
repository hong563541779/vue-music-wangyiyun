<template>
  <div class="music-list">
    <div class="header" ref="header">
      <div class="back">
        <i class="icon-back" @click="back">back</i>
      </div>
      <h1 class="title" v-html="title"></h1>
    </div>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class="filter" ref="filter"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll
      :probe-type="probeType"
      :listen-scroll="listenScroll"
      @scroll="scroll"
      :data="songs"
      class="list"
      ref="list">
      <!--div为了控制song-list-wrapper的样式-->
      <div class="song-list-wrapper">
        <song-list @select="selectItem" :songs="songs"></song-list>
      </div>
      <loading v-show="!this.songs.length" class="loading-content"></loading>
    </scroll>
  </div>
</template>
<script type="text/ecmascript-6">
import SongList from 'base/song-list/song-list'
import Scroll from 'base/scroll/scroll'
import {prefixStyle} from 'common/js/dom'
import Loading from 'base/loading/loading'
import {mapGetters, mapActions} from 'vuex'

const RESERVED_HEIGHT = 44
const transform = prefixStyle('transform')
const backdrop = prefixStyle('backdrop-filter')
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
      type: Array
      //  default: []
    }
  },
  data () {
    return {
      scrollY: 0
    }
  },
  components: {
    SongList,
    Scroll,
    Loading
  },
  computed: {
    bgStyle () {
      return `background-image:url(${this.bgImage})`
    },
    ...mapGetters([
      'playlist'
    ])
  },
  created () {
    this.probeType = 3
    this.listenScroll = true
  },
  mounted () {
    this.$refs.list.$el.style.top = `${this.$refs.bgImage.clientHeight}px`
    this.imageHeight = this.$refs.bgImage.clientHeight
    this.minTranslateY = -this.imageHeight + RESERVED_HEIGHT
  },
  watch: {
    scrollY (newY) {
      let translateY = Math.max(this.minTranslateY, newY)
      let zIndex = 0
      let scale = 1
      let blur = 0
      this.$refs.layer.style[transform] = `trnslate3d(0,${translateY}px,0)`
      const percent = Math.abs(newY / this.imageHeight)
      if (newY > 0) {
        scale = 1 + percent
        zIndex = 10
      } else {
        blur = Math.min(20 * percent, 20)
      }
      //  高斯模糊
      this.$refs.filter.style[backdrop] = `blur(${blur})px`
      //  当滚动带顶部
      if (newY < this.minTranslateY) {
        zIndex = 10
        this.$refs.bgImage.style.paddingTop = 0
        this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`
        this.$refs.bgImage.style.background = `rgba(212, 68, 57, ${percent})`
      } else {
        //  否则图片设置为10：7的比例
        this.$refs.bgImage.style.paddingTop = '70%'
        this.$refs.bgImage.style.height = 0
        this.$refs.bgImage.style.background = `url(${this.bgImage})`
      }
      this.$refs.bgImage.style.zIndex = zIndex
      this.$refs.bgImage.style[transform] = `scale(${scale})`
    }
  },
  methods: {
    back () {
      this.$router.back()
    },
    scroll (pos) {
      this.scrollY = pos.y
    },
    selectItem (item, index) {
      this.selectPlay({
        list: this.songs,
        index: index
      })
      console.log(this.playlist)
    },
    ...mapActions([
      'selectPlay'
    ])
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
    .bg-layer {
      position: relative
      height: 100%
      background: $color-background
    }
    .list {
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background: $color-background
      .song-list-wrapper {
      }
      .loading-content {
        position: fixed
        width: 100%
        top: 50%
        transform: translateY(-50)
      }
    }
  }
</style>
