import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getter'
import state from './state'
import mutations from './mutation'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

//  export一个Vuex.Store的实例
export default new Vuex.Store({
  strict: debug, //  开启严格模式
  plugins: debug ? [createLogger()] : [],
  actions,
  getters,
  state,
  mutations
})
