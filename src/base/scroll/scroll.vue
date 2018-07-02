<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>
<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
export default {
  props: {
    probeType: { //  知道滚动的位子，屏幕滑动超过一定事件后，派发scroll事件
      type: Number,
      default: 1
    },
    click: {//  点击列表是都派发click事件
      type: Boolean,
      default: true
    },
    //  列表数据
    data: {
      type: Array,
      default: null
    },
    //  是否开启横向滚动
    scrollX: {
      type: Boolean,
      default: false
    },
    //  是否派发滚动事件
    listenScroll: {
      type: Boolean,
      default: false
    },
    //  是否派发顶部下拉的事件，用于下拉刷新
    pulldown: {
      type: Boolean,
      default: false
    },
    //  是否派发列表滚动开始的事件
    beforeScroll: {
      type: Boolean,
      default: false
    },
    //  当数据更新后，刷新scroll的延时
    refreshDelay: {
      type: Number,
      default: 20
    }
  },
  mounted () {
    //  异步加载，确保DOM已经渲染后在初始化better-scroll
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  methods: {
    //  初始化better-scroll
    _initScroll () {
      if (!this.$refs.wrapper) {
        return
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        scrollY: true,
        click: this.click
      })
      //  是否派发滚动事件
      if (this.listenScroll) {
        //  要保留当前的vue实例，并非scroll实例
        let me = this
        this.scroll.on('scroll', (pos) => {
          me.$emit('scroll', pos)
        })
      }
      //  是否派发滚动到底部事件，用于上拉加载
      if (this.pullup) {
        this.scroll.on('scrollEnd', () => {
          if (this.scroll.y <= (this.scroll.maxScrollY) + 50) {
            this.$emit('scrollEnd')
          }
        })
      }
      //  是否派发顶部下拉事件，用于下拉刷新
      if (this.pulldown) {
        this.scroll.on('touched', (pos) => {
          if (pos.y > 50) {
            this.$emit('pulldown')
          }
        })
      }
      //  是否派发滚动开始的事件
      if (this.beforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          this.$emit('beforeScroll')
        })
      }
    },
    //  代理better-scroll的enable事件
    enable () {
      this.scroll && this.scroll.enable()
    },
    //  代理better-scroll的disable事件
    disable () {
      this.scroll && this.scroll.disable()
    },
    //  代理better-scroll的refresh事件
    refresh () {
      this.scroll && this.scroll.refresh()
    },
    //  代理better-scroll的scrollTo事件
    scrollTo () {
      //  this.scroll指向的是better scroll的实例
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    //  代理better-scroll的scrollToElement事件
    scrollToElement () {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  },
  watch: {
    //  监听data数据的变化，延时refreshDelay事件后调用refresh方法重新计算，保证滚动效果正常
    data () {
      setTimeout(() => {
        this.refresh()
      }, this.refreshDelay)
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
