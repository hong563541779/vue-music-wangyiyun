<template>
  <transition name="slide">
    <!--<div class="singer-detail">-->
      <!--详情页面-->
    <!--</div>-->
    <music-list
      :title="title"
      :bg-image="bgImage"
      :songs="songs"></music-list>
  </transition>
</template>
<script type="text/ecmascript-6">
import {mapGetters} from 'vuex'
import {getSingerDetail} from 'api/singer'
import {ERR_OK} from 'common/js/config'
import {createSong} from 'common/js/song'
import MusicList from 'components/music-list/music-list'
export default {
  data () {
    return {
      node: null,
      songs: []
      //  title: '',
      //  bgImg: ''
    }
  },
  components: {
    MusicList
  },
  computed: {
    ...mapGetters([
      'singer'
    ]),
    title () {
      return this.singer.name
    },
    bgImage () {
      return this.singer.avatar
    }
  },
  created () {
    //  console.log(this.singer)
    this._getDetail()
  },
  methods: {
    _getDetail () {
      //  若在当前页面刷新得不到id，则回退到上一个页面
      if (!this.singer.id) {
        this.$router.push('/singer')
      }
      getSingerDetail(this.singer.id).then((res) => {
        if (res.status === ERR_OK) {
          console.log(res)
          this.songs = this._normalizeSongs(res.data.hotSongs)
        }
      })
    },
    _normalizeSongs (list) {
      let ret = []
      list.forEach((item) => {
        ret.push(createSong(item))
      })
      return ret
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  /* 动画样式 */
  .slide-enter-active, .slide-leave-active
    transition: all 0.2s
  .slide-enter, .slide-leave-to
    transform: translate3d(30%, 0, 0)
    opacity: 0
  .singer-detail
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    z-index: 100
    background: $color-background

</style>
