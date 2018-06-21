<template>
  <scroll
    ref="listview"
    class="listview"
    :data="data"
  >
    <ul>
      <li v-for="group in data" class="list-group" :key="group.id">
        <h2 class="list-group-title">{{ group.title }}</h2>
        <ul>
          <li v-for="item in group.items" class="list-group-item" :key="item.id">
            <img v-lazy="item.avatar" class="avatar">
            <span class="name">{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart="onShortcutStart"
         @touchmove.stop.prevent="onShortcutMove">
      <ul>
        <li v-for="(item, index) in shortcutList"
            :data-index="index"
            class="item"
            :key="item.id"
            :class="{current: currentIndex == index}">{{item}}</li>
      </ul>
    </div>
  </scroll>
</template>
<script>
import Scroll from 'base/scroll/scroll'
import {getData} from 'common/js/dom'

const ANCHOR_HEIGHT = 20
export default {
  components: {
    Scroll
  },
  props: {
    data: {
      type: Array
    }
  },
  data () {
    return {
      currentIndex: '0'
    }
  },
  created () {
    this.touch = {}
    this.listenScroll = true
    this.listHeight = []
    this.probeType = 3
  },
  methods: {
    onShortcutStart (e) {
      let anchorIndex = getData(e.target, 'index')
      let firstTouch = e.touches[0]
      this.touch.y1 = firstTouch.pageY
      this.touch.anchorIndex = anchorIndex
      this._scrollTo(anchorIndex)
    },
    onShortcutMove (e) {
      let firshTouch = e.touches[0]
      this.touch.y2 = firshTouch.pageY
      let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
      let anchorIndex = parseInt(this.touch.anchorIndex) + delta
      this._scrollTo(anchorIndex)
    },
    _scrollTo (index) {
      if (!index && index !== 0) { }
    }
  },
  computed: {
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
}
</style>
