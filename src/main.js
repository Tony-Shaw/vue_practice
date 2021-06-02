// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/style/index.css'
Vue.use(ElementUI);
Vue.config.productionTip = false
axios.defaults.timeout = 100000;   // 超时时间
axios.defaults.baseURL = 'http://127.0.0.1:8888/'
Vue.prototype.$http = axios
import moduleA from './store/moduleA/index.js';
/* eslint-disable no-new */

Vue.use(Vuex)

let store = new Vuex.Store({
  //在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误。这能保证所有的状态变更都能被调试工具跟踪到。
  //*严格模式会深度监测状态树来检测不合规的状态变更——请确保在发布环境下关闭严格模式，以避免性能损失。
  strict: process.env.NODE_ENV !== 'production',//自动在生产环境下关闭严格模式
  modules: {
    moduleA,
  }
})

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
