import Vue from 'vue'
import App from './App.vue'

import es7 from 'es7-shim/es7-shim'
es7.shim()

new Vue({
  el: '#app',
  render: h => h(App)
})
