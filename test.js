import Vue from 'vue'
import Test from './Test.vue'
import Vuex from 'vuex'
import cmps from './index.js';

Vue.use(cmps);
Vue.use(Vuex);

const store = new Vuex.Store( {
  state : {},
} )

Vue.config.productionTip = false

new Vue({
  render: h => h(Test),
  store,
}).$mount('#app')
