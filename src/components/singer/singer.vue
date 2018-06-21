<template>
  <div class="singer" ref="singer">
    <list-view :data="this.singers" class="singer-content"></list-view>
  </div>
</template>
<script type="text/ecmascript-6">
import {getSingers} from 'api/singer'
import listView from 'base/listview/listview'
import {ERR_OK} from 'common/js/config'
import Singer from 'common/js/singer'

const pinyin = require('pinyin')
const HOT_NAME = '热门'
const HOT_SINGERS = 10
export default {
  components: {
    listView
  },
  data () {
    return {
      singers: []
    }
  },
  created () {
    this._getSingers()
  },
  methods: {
    _getSingers () {
      getSingers().then((res) => {
        if (res.status === ERR_OK) {
          let s = res.data.artists
          s.map((item) => {
            let py = pinyin(item.name[0], {
              style: pinyin.STYLE_FIRST_LETTER
            })
            item.inital = py[0][0].toUpperCase()
          })
          this.singers = this._normalizeSinger(s)
          //  console.log(this.singers)
        }
      })
    },
    //  对数据进行操作
    _normalizeSinger (list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      list.forEach((item, index) => {
        if (index < HOT_SINGERS) {
          map.hot.items.push(new Singer({
            id: item.id,
            name: item.name,
            avatar: item.img1v1Url,
            aliaName: item.alias.join('/')
          }))
        }
        const key = item.inital
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer({
          id: item.id,
          name: item.name,
          avatar: item.img1v1Url,
          aliaName: item.alias[0] //  头像
        }))
      })
      // 为了得到有序列表，需要处理map
      let hot = []
      let ret = []
      for (const key in map) {
        let val = map[key]
        if (val.title.match(/[A-Z]/)) {
          ret.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.singer
  position: fixed
  top: 88px
  bottom: 0
  width: 100%
  z-index: 100
  .singer-content
      width: 100%
      height: 100%
      overflow: hidden
</style>
