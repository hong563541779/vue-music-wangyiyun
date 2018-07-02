<template>
  <scroll
    ref="listview"
    class="listview"
    :data="data"
    :listenScroll="listenScroll"
    @scroll="scroll"
    :probeType="probeType"
  >
    <ul>
      <li v-for="group in data" class="list-group" :key="group.id" ref="listGroup">
        <h2 class="list-group-title">{{ group.title }}</h2>
        <ul>
          <li v-for="item in group.items"
              class="list-group-item"
              :key="item.id"
              @click="selectItem(item)">
            <img v-lazy="item.avatar" class="avatar">
            <span class="name">{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut"
         @touchstart="onShortcutStart"
         @touchmove.stop.prevent="onShortcutMove">
      <ul>
        <li v-for="(item, index) in shortcutList"
            :data-index="index"
            class="item"
            :key="item.id"
            :class="{current: currentIndex == index}">{{item}}</li>
      </ul>
    </div>
    <div v-show="!this.data.length" class="loading-content">
      <loading></loading>
    </div>
  </scroll>
</template>
<script>
import Scroll from 'base/scroll/scroll'
import {getData} from 'common/js/dom'
import Loading from 'base/loading/loading'

//  每个锚点的高度
const ANCHOR_HEIGHT = 20
export default {
  components: {
    Scroll,
    Loading
  },
  props: {
    data: {
      type: Array
    }
  },
  data () {
    return {
      currentIndex: '0',
      scrollY: -1
    }
  },
  created () {
    //  放在created中并不需要监听touch的变化
    this.touch = {}
    this.listenScroll = true
    this.listHeight = []
    this.probeType = 3
  },
  methods: {
    //  派发select事件，选中对应的
    selectItem (item) {
      this.$emit('select', item)
    },
    refresh () {
      this.$refs.listview.refresh()
    },
    scroll (pos) {
      this.scrollY = pos.y
    },
    onShortcutStart (e) {
      //  锚点
      let anchorIndex = getData(e.target, 'index')
      let firstTouch = e.touches[0] //  第一个手指的位置
      this.touch.y1 = firstTouch.pageY
      this.touch.anchorIndex = anchorIndex
      this._scrollTo(anchorIndex)
    },
    onShortcutMove (e) {
      let firshTouch = e.touches[0]
      this.touch.y2 = firshTouch.pageY
      //  向下取整 Math.floor((this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT))
      let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
      let anchorIndex = parseInt(this.touch.anchorIndex) + delta
      this._scrollTo(anchorIndex)
    },
    _scrollTo (index) {
      //  console.log(index)
      //  相当于index === null,点击右侧快速入口边缘的时候无效
      if (!index && index !== 0) {
        return
      }
      if (index < 0) {
        index = 0
      } else if (index > this.listHeight.length - 2) {
        index = this.listHeight.length - 2
      }
      //  需要手动去设置scrollY的位置
      this.scrollY = -this.listHeight[index]
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
    },
    //  计算高度
    _calculateHeight () {
      this.listHeight = []
      const list = this.$refs.listGroup
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    }
  },
  watch: {
    data () {
      //  数据变化到DOM的变化会有一个延迟，确保所有手机兼容性OK时，推荐写法
      setTimeout(() => {
        this._calculateHeight()
      }, 20)
    },
    //  判断滚动落在哪个区间
    scrollY (newY) {
      const listHeight = this.listHeight
      //  当滚动到顶部
      if (newY > 0) {
        this.currentIndex = 0
        return
      }
      //  在中间部分滚动
      for (let i = 0; i < listHeight.length - 1; i++) {
        let height1 = listHeight[i]
        let height2 = listHeight[i + 1]
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i
          //  console.log(this.currentIndex)
          return
        }
      }
      //  当股东到底部，且-newT大于最后一个元素的上线
      this.currentIndex = listHeight.length - 2
    }
  },
  computed: {
    //  获取右侧快速入口列表
    shortcutList () {
      return this.data.map((group) => {
        return group.title.slice(0, 1)
      })
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
.listview {
  .list-group {
    .list-group-title {
      height: 20px;
      line-height 20px;
      color: $white;
      padding-left 12px;
      background: rgba(0, 0, 0, 0.1)
    }
    .list-group-item {
      display: flex
      flex-direction: row
      margin: 8px 10px
      border-bottom: 1px solid #d3d3d3
      .avatar {
        width : 60px
        height: 60px
        border-radius: 5px
      }
      .name {
        color: $color-text
        font-size: $font-size-medium
        height: 70px
        line-height: 70px
        padding-left 10px
      }
      &:last-child {
        border-bottom: 0
      }
    }
  }
  /*右侧快速入口列表样式*/
  .list-shortcut {
    position: absolute
    right: 10px
    top: 50%
    transform: translateY(-50%)
    .item {
      min-width: 20px
      height: 20px
      line-height: 20px
      text-align: center
      color: $color-text
      &.current {
        color: #d44439
      }
    }
  }
  .loading-content{
    position: fixed
    width: 100%
    top: 50%
    transform: translateY(-50)
  }
}
</style>
