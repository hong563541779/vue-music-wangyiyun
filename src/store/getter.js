//  组件从getters中取数据
//  import state from './state'

export const singer = state => state.singer

export const playing = state => state.playing

export const fullScreen = state => state.fullScreen

export const playlist = state => state.playlist

export const sequence = state => state.sequence

export const mode = state => state.mode

export const currentIndex = state => state.currentIndex

//  当前播放第几首歌曲
export const currentSong = (state) => {
  return state.playlist[state.currentIndex] || {}
}
