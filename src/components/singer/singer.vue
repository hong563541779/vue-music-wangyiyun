<template>
  <div>
    歌手页面
  </div>
</template>
<script type="text/ecmascript-6">
import {getSingers} from 'api/singer'
import {ERR_OK} from 'common/js/config'
export default {
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
          let s = res.data.list.artists
          console.log(res,s)
        }
      })
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
