<template>
  <div class="loading">
    <img src="./loading.gif" width="24" height="24">
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  methods: {},
  props: {
    title: {
      type: String,
      default: '正在载入...'
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .loading {
    width: 100%
    height: 100%
    text-align: center
    img {
      margin-top: 10px
    }
  }
</style>
