<template>
  <div class="m-header">
    <div class="icon"></div>
    <h1 class="text">云音乐</h1>
  </div>
</template>

<script type="text/ecmascript-6">
export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .m-header
    position : relative
    height : 44px
    line-height 44px
    width : 100%
    text-align : center
    background : $color-theme
    z-index: 1001
    .icon
      display : inline-block
    .text
      display : inline-block
      font-weight : bold
      line-height : 44px
      color : $color-text-l
      letter-spacing : 3px
      font-size: $font-size-medium-x
</style>
