<template>
  <div class="player" v-show="playlist.length > 0">
    <!--全屏播放-->
    <transition name="normal"
                @enter="enter"
                @after-enter="afterEnter"
                @leave="leave"
                @after-leave="afterLeave">
      <div class="normal-player" v-show="fullScreen">
        <div class="background">
          <div class="filter"></div>
          <img :src="currentSong.image" width="100%" height="100%">
        </div>
        <div class="top">
          <div class="back">
            <i class="icon-back" @click="back">返回</i>
          </div>
          <h1 class="title" v-html="currentSong.name"></h1>
          <h2 class="subtitle" v-html="currentSong.singer"></h2>
        </div>
        <div class="middle">
          <div class="middle-l">
            <div class="cd-wrapper" ref="cdWrapper">
              <div class="cd">
                <img class="image" :src="currentSong.image">
              </div>
            </div>
            <div class="playing-lyric-wrapper">
              <div class="playing-lyric"></div>
            </div>
            <div class="lyric-wrapper">
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="dot-wrapper">
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
          <div class="progress-wrapper">
          </div>
          <div class="operators">
            <div class="icon i-left"></div>
            <div class="icon i-left">
              <i class="icon-prev"></i>
            </div>
            <div class="icon i-left">
              <i class="icon-prev"></i>
            </div>
            <div class="icon i-center">
              <i></i>
            </div>
            <div class="icon i-right">
              <i class="icon-next"></i>
            </div>
            <div class="icon icon-right">
              <i class="icon"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!--底部播放-->
    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" @click="open">
        <div class="icon">
          <img :src="currentSong.image">
        </div>
        <div class="text">
          <h2 class="name" v-html="currentSong.name"></h2>
          <p class="desc" v-html="currentSong.singer"></p>
        </div>
        <div class="control"></div>
        <div class="control">
          <i class="icon-playlist"></i>
        </div>
      </div>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
import {mapMutations, mapGetters} from 'vuex'
import animations from 'create-keyframe-animation'
export default {
  computed: {
    ...mapGetters([
      'fullScreen',
      'playlist',
      'currentSong'
    ])
  },
  mounted () {
    console.log(this.currentSong)
  },
  methods: {
    back () {
      this.setFullScreen(false)
    },
    open () {
      this.setFullScreen(true)
    },
    _getPosAndScale () {
      const targetWidth = 40
      const paddingLeft = 40
      const paddingBottom = 30
      const paddingTop = 80
      const width = window.innerWidth * 0.8
      const scale = targetWidth / width
      const x = -(window.innerWidth / 2 - paddingLeft)
      const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
      return {
        x,
        y,
        scale
      }
    },
    // vue钩子函数，进入时的动画
    enter (el, done) {
      //  获取坐标轴变化值
      const {x, y, scale} = this._getPosAndScale()
      let animation = {
        0: {
          transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
        },
        60: {
          transform: `translate3d(0,0,0) scale(1.1)`
        },
        100: {
          transform: `translate3d(0,0,0) scale(1)`
        }
      }
      animations.registerAnimation({
        name: 'move',
        animation,
        presets: {
          duration: 200, // 动画时长
          easing: 'linear'// 动画曲线
        }
      })
      animation.runAnimation(this.$refs.cdWrapper, 'move', done)
    },
    afterEnter () {
      animations.unregisterAnimation('move')
      this.$refs.cdWrapper.style.animation = ''
    },
    leave (el, done) {
      const {x, y, scale} = this._getPosAndScale()
      let animation = {
        0: {
          transform: `translate3d(0,0,0) scale(1)`
        },
        60: {
          transform: `translate3d(0,0,0) scale(1.1)`
        },
        100: {
          transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
        }
      }
      animations.registerAnimation({
        name: 'out',
        animation,
        presets: {
          duration: 200,
          easing: 'linear'
        }
      })
      animations.runAnimation(this.$refs.cdWrapper, 'out', done)
    },
    afterLeave () {
      animations.unregisterAnimation('out')
      this.$refs.cdWrapper.style.animation = ''
    },
    ...mapMutations({
      'setFullScreen': 'SET_FULL_SCREEN'
    })
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .player
    .normal-player
      position: fixed
      left: 0
      right: 0
      top: 0
      bottom: 0
      background: $color-background
      z-index: 150
      .background
        position: absolute
        left: -50%
        top: -50%
        width: 300%
        height: 300%
        z-index: -1
        opacity: 0.6s
        filter: blur(30px)
        .filter
          position: absolute
          width: 100%
          height: 100%
          background: black
          opacity: 0.4
      .top
        position: relative
        margin-bottom: 25px
        .back
          position: absolute
          top: 0
          left: 6px
          z-index: 50px
          .icon-back
            display: block
            padding: 9px
        .title
          width: 70%
          margin: 0 auto
          line-height: 40px
          text-align: center
          font-size: $font-size-medium
          color: $color-text
          @include no-wrap()
        .subtitle
          width: 70%
          margin: 0 auto
          line-height: 20px
          text-align: center
      .middle
        display: flex
        align-items: center
        position: fixed
        width: 100%
        top: 80px
        bottom: 170px
        white-space: nowrap
        font-size: 0px
        .middle-l
          display: inline-block
          vertical-align: top
          position: relative
          width: 100%
          height: 0
          padding-top: 80%
          .cd-wrapper
            position: absolute
            left: 10%
            top: 0
            width: 80%
            height: 100%
            .cd
              width: 100%
              height: 100%
              border-radius: 50%
              box-sizing: border-box
              border: 15px solid rgba(255, 255, 255, 0.1)
              .image
                position: absolute
                left: 0
                top: 0
                width: 100%
                height: 100%
                border-radius: 50%
      .bottom
        position: absolute
        bottom: 50px
        width:100%
        .progress-wrapper
          display: flex
          align-items: center
          width: 80%
          margin: auto
          padding: 10px 0
        .operators
          display: flex
          align-items: center
          .icon
            flex: 1
            color: $color-theme
            &.disable
              color: $color-theme-d
            i
              font-size: 30px
          .icon-left
            text-align: right
          .icon-center
            padding: 0 20px
            text-align: center
            i
              font-size: 40px
          .icon-right
            text-align: left
          .icon-favorite
            color: $color-theme-d
      &.normal-enter-active, &.normal-leave-active
        transition: all 0.4s
        .top, .bottom
          transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
      &.normal-enter, &.normal-leave-to
        opacity: 0
        .top
          transition: translate3d(0,-100px,0)
        .bottom
          transform: translate3d(0, 100px, 0)
    .mini-player
      display: flex
      align-items: center
      position: fixed
      left: 0
      bottom: 0px
      z-index: 180
      height: 60px
      width: 100%
      background: #fff
      &.mini-enter-active, &.mini-leave-active
        transition: all 0.4s
      &.mini-enter, &.mini-leave-to
        opacity: 0
      .icon
        flex: 0 0 40px
        width: 40px
        padding: 0 10px 0 20px
        img
          border-radius: 50%
          width: 100%
          heght: 100%
      .text
        display: flex
        flex-direction: column
        justify-content: center
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          margin-bottom: 2px
          font-size: $font-size-medium
        .desc
          font-size: $font-size-small
      .control
        flex: 0 0 30px
        width: 30px
        padding: 0 10px
        .icon-play-mini, .icon-pause-mini, .icon-playlist
          font-size: 30px
        .icon-mini
          font-size: 30px
          position: absolute
          left: 0
          top: 0
</style>
