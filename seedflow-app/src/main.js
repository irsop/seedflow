import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import $ from 'jquery';
window.jQuery = $;
window.$ = $;

window.Vue = Vue;

Vue.config.productionTip = false

window.app = new Vue({
  router,
  store,
  render: h => h(App)
});

window.app.$mount('#app');
