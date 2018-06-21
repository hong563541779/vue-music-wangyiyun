<template>
  <scroll class="recommend" :data="recommendList" :pulldown="pulldown">
    <div class="recommend-content">
      <!-- 轮播图-->
      <div>
        <div v-show="banners.length" class="decorate" v-if="banners.length"></div>
        <div v-if="banners.length" class="slider-wrapper">
          <slider>
            <div v-for="item in banners" :key="item.id">
              <a :href="item.picUrl">
                <img :src="item.picUrl">
              </a>
            </div>
          </slider>
        </div>
        <!--推荐歌单-->
        <div class="recomend-list">
          <h1 class="list-title">推荐歌单<i class="iconfont icon-search"></i></h1>
          <div v-show="!this.recommendList.length" class="loading-content">
            <loading></loading>
          </div>
          <ul>
            <li class="item" v-for="item in recommendList" :key="item.id">
              <div class="icon">
                <div class="gradients"></div>
                <!--懒加载图片，减少流量-->
                <img v-lazy="item.picUrl">
              </div>
              <p class="play-count">
                {{Math.floor(item.playCount / 10000)}}万
              </p>
              <div class="text">
                <p class="name">{{item.name}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </scroll>
</template>
<script type="text/ecmascript-6">
import {getBanner, getRecommendList} from 'api/recommend'
import {ERR_OK} from 'common/js/config'
import Slider from 'base/slider/slider'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
export default {
  data () {
    return {
      banners: [],
      recommendList: [],
      pulldown: true
    }
  },
  components: {
    Slider,
    Scroll,
    Loading
  },
  created () {
    this._getBanner()
    this._getRecommendList()
  },
  methods: {
    //  获取轮播图数据
    _getBanner () {
      getBanner().then((res) => {
        if (res.status === ERR_OK) {
          this.banners = res.data.banners
        }
      })
    },
    //  获取推荐歌单列表
    _getRecommendList () {
      getRecommendList().then((res) => {
        if (res.status === ERR_OK) {
          this.recommendList = res.data.result
        }
      })
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
@import "~common/stylus/mixin"
.recommend
  position: fixed
  width: 100%
  top: 88px
  bottom: 0
  z-index: 100
  .recommend-content
    width: 100%
    height: auto
    overflow: hidden
    .decorate
      position: absolute
      top: -30vh
      z-index: -10
      background: $color-theme
      width: 100%
      height: 50vh
      vertical-align: inherit
    .slider-wrapper
      width: 96%
      margin: 0 auto
      border-radius: 5px
      overflow: hidden
    .recomend-list
      position: relative
      box-sizing: border-box
      width: 100%
      text-align: center
      .loading-content
        position: fixed
        width: 100%
        top: 50%
        transform: translateY(-50)
      .list-title
        height: 50px
        line-height: 50px
        padding-left: 1.5%
        text-align: left
        font-size: $font-size-medium
        font-weight: bold
        color: $color-text
      .item
        display: inline-block
        position: relative
        box-sizing: border-box
        width: 33%;
        padding: 0 1%
        img
          width: 100%
          height: 100%
          border-radius: 3%
        .play-count
          position: absolute
          top: 5px
          right: 5px
          font-size: $font-size-small-s
          color: $color-text-l
        .text
          height: 34px
          line-height: 16px
          text-align: left
          font-size: $font-size-small
          color: $color-text
          text-overflow: ellipsis
          overflow: hidden
          white-space: wrap
</style>
