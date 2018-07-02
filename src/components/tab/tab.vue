<template>
  <div class="tab">
    <router-link tag="div" class="tab-item" to="/recommend">
      <span class="tab-link">推荐</span>
    </router-link>
    <router-link tab="div" class="tab-item" to="/singer">
      <span class="tab-link">歌手</span>
    </router-link>
    <router-link tab="div" class="tab-item" to="/rank">
      <span class="tab-link">排行</span>
    </router-link>
    <router-link tab="div" class="tab-item" to="/search">
      <span class="tab-link">搜索</span>
    </router-link>
  </div>
</template>
<script type="text/ecmascript-6">
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"
  .tab
    display: flex
    line-height: 44px
    height: 44px
    width: 100%
    font-size: $font-size-medium
    background: $color-theme
    position: relative
    .tab-item
      flex: 1
      text-align: center
      color: $color-text-ll
      .tab-link
        padding-bottom: 3px
      &.router-link-active
        .tab-link
          color: $color-text-l
          font-weight: bold
          border-bottom: 2px solid $color-text-l
</style>
