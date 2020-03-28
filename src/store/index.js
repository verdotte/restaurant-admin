import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import restaurant from './modules/restaurant'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    restaurant
  },
})
