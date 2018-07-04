import {playMode} from 'common/js/config'
// 保存状态对象
const state = {
  singer: {},
  //  默认不播放
  playing: false,
  //  全屏播放
  fullScreen: false,
  //  播放列表
  playlist: [],
  //  顺序列表
  sequenceList: [],
  //  当前播放模式
  mode: playMode.sequence,
  //  当前播放索引
  currentIndex: -1
}
export default state
