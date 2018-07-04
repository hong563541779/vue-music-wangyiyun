import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import fastclick from 'fastclick'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'
import 'lib-flexible/flexible'
//  Vue.config.productionTip = false
import "common/stylus/index.styl"

Vue.use(VueLazyload, {
  loading: require('common/image/default.png')
})

//  推荐写法，页面会去掉300ms的延迟
fastclick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  //  create Element的一个方法
  render: h => h(App),
  store,
  router
})
