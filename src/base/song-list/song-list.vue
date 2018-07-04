<template>
  <div class="song-list">
    <ul>
      <li @click="selectItem(song,index)" v-for="(song, index) in songs" class="item" :key="song.id">
        <p class="count">{{index+1}}</p>
        <div class="content">
          <h2 class="name">{{song.name}}</h2>
          <p class="desc">{{getDesc(song)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    songs: {
      type: Array
    }
  },
  components: {
  },
  methods: {
    getDesc (song) {
      if (song.aliaName) {
        return `${song.singer}-${song.aliaName}`
      } else {
        return `${song.singer}`
      }
    },
    selectItem (item, index) {
      this.$emit('select', item, index)
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .song-list {
    background: $color-background
    .item {
      display: flex
      align-items: center
      height: 60px
      border-bottom: 1px solid #e4e4e4
      .count {
        width: 10%
        text-align: center
        color: #757575
        font-size: $font-size-medium
      }
      .content {
        width: 90%
        .name {
          color: $color-text
          font-size: $font-size-medium-x
          line-height: 20px
          no-wrap()
        }
        .desc {
          color: $color-dialog-background
          no-wrap()
          width: 80%
          margin-top: 5px
        }
      }
    }
  }
</style>
