import Vue from 'vue'
import Vuex from 'vuex'
import RegisterVuex from './modules/RegisterVuex'
import LoginVuex from './modules/LoginVuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    coordinateSelected:''
  },
  getters:{
    coordinateSelected: state => state.coordinateSelected,
  },
  mutations: {
    setCoordinateSelected(state, newSate){
      state.coordinateSelected = newSate
    },
  },
  actions: {
  },
  modules: {
    RegisterVuex,
    LoginVuex
  }
})
