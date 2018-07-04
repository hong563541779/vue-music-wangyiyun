<template>
  <div class="player" v-show="playlist.length > 0">
    <!--全屏播放-->
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
          <div class="cd-wrapper">
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
    <!--底部播放-->
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
  </div>
</template>
<script type="text/ecmascript-6">
import {mapMutations, mapGetters} from 'vuex'
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
