import Vue from 'vue'
import Vuex from 'vuex'
import postActionVuex from './modules/postActionVuex'
import RegisterVuex from './modules/RegisterVuex'
import LoginVuex from './modules/LoginVuex'
import ProfileVuex from './modules/ProfileVuex'

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
    postActionVuex,
    RegisterVuex,
    LoginVuex,
    ProfileVuex
  }
})
