<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item, index) in dots" :key="index" :class="{'active': currentPageIndex === index}"></span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import {addClass} from 'common/js/dom'
export default {
  data () {
    return {
      dots: [], //  所有的小圆点
      currentPageIndex: 0 //  当前第几呀
    }
  },
  props: {
    //  是否循环播放
    loop: {
      type: Boolean,
      default: true
    },
    //  自动轮播
    autoPlay: {
      type: Boolean,
      default: true
    },
    //  间隔
    interval: {
      type: Number,
      default: 4000
    }
  },
  mounted () {
    setTimeout(() => {
      this._setSliderWidth()
      this._init_Dots() //  initDot一定要在Slider之前
      this._initSlider()
      if (this.autoPlay) {
        this._play()
      }
    }, 20)
    //  对窗口屏幕进行监听事件
    window.addEventListener('oresize', () => {
      if (!this.slider) {
        return
      }
      this._setSliderWidth(true)
      this.slider.refresh()// 重新计算
    })
  },
  methods: {
    //  设置轮播宽度
    _setSliderWidth (isResize) {
      this.children = this.$refs.sliderGroup.children
      let width = 0
      let sliderWidth = this.$refs.slider.clientWidth
      for (let i = 0; i < this.children.length; i++) {
        const child = this.children[i]
        addClass(child, 'slider-item')
        child.style.width = sliderWidth + 'px'
        width += sliderWidth
      }
      //  若支持轮播，宽度增加2倍
      if (this.loop && !isResize) {
        width += 2 * sliderWidth
      }
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    //   初始化滑动
    _initSlider () {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: {
          loop: this.loop,
          threshold: 0.3,
          speed: 400
        },
        spanSpeed: 400,
        bounce: false, //  是否启用回弹动画效果
        stopPropgation: true
        //  click: true //防止fastClick事件
      })
      this.slider.on('scrollEnd', this._onScrollEnd)
    },
    //  滚动结束后
    _onScrollEnd () {
      let pageIndex = this.slider.getCurrentPage().pageX
      this.currentPageIndex = pageIndex
      if (this.autoPlay) {
        clearTimeout(this.timer)
        this._play()
      }
    },
    //  初始化小圆点
    _init_Dots () {
      //  console.log(this.children.length)
      this.dots = new Array(this.children.length)
    },
    _play () {
      //  let pageIndex = this.currentPageIndex + 1
      //  console.log(pageIndex)
      this.timer = setTimeout(() => {
        //  this.slider.goToPage(pageIndex, 0, 400)//  pageIndex代表当前页，0代表y方向横向轮播，400代表一个间隔
        this.slider.next()
      }, this.interval)
    }
  },
  destroyed () {
    clearTimeout(this.timer) //  有利于内存释放
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
.slider
  min-height: 1px
  position: relative
  .slider-group
    position: relative
    overflow: hidden
    white-space: nowrap
    .slider-item
      float: left
      -webkit-box-sizing: border-box
      -moz-box-sizing: border-box
      box-sizing: border-box
      overflow: hidden
      text-align: center
      a
        width: 100%
        height: auto
        img
          display: block;
          width: 100%
  .dots
    position: absolute
    right: 0
    left: 0
    bottom: 12px
    text-align: center
    font-size: 0px
    .dot
      display: inline-block
      margin: 0 4px
      width: 8px
      height: 8px
      border-radius: 50%
      background-radius: 5px
      background: $color-text-l
      &.active
        background: $color-theme
</style>
