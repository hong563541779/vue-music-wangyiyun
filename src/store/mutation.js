import * as types from './mutation-types'

//  修改state
const mutations = {
  //  第一个state,第二个是payload，参数
  [types.SET_SINER] (state, singer) {
    state.singer = singer
  }
}

export default mutations
