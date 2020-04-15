import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import restaurant from './modules/restaurant'
import food from './modules/food'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    restaurant,
    food
  },
})
