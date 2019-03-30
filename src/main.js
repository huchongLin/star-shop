// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import 'vant/lib/index.css';
import router from './router'
import './icon/iconfont.css'
import  Vuex from 'vuex'

Vue.use(Vuex)
Vue.config.productionTip = false
//注册 Vuex

const store = new Vuex.Store({

})




/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
