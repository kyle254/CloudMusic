import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyload from 'vue-lazyload'
import 'common/stylus/index.styl'
import store from './store'


Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()


Vue.use(VueLazyload, {
  loading: require('common/img/loading.png')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

