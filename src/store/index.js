import Vue from 'vue'
import Vuex from 'vuex'
import EventVuex from './modules/EventVuex'
import FeedVuex from './modules/FeedVuex'
import RegisterVuex from './modules/RegisterVuex'
import LoginVuex from './modules/LoginVuex'
import ProfileVuex from './modules/ProfileVuex'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    apiLoading: false,
    coordinateSelected:'',
    uploadedFile:'',
  },
  getters:{
    coordinateSelected: state => state.coordinateSelected,
    uploadedFile: state => state.uploadedFile,
    apiLoading: state => state.apiLoading,
  },
  mutations: {
    setCoordinateSelected(state, newSate){
      state.coordinateSelected = newSate
    },
    setUploadedFile(state, newSate){
      state.uploadedFile = newSate
    },
    setApiLoading(state, newSate){
      state.apiLoading = newSate
    },
  },
  actions: {
  },
  modules: {
    EventVuex,
    RegisterVuex,
    FeedVuex,
    LoginVuex,
    ProfileVuex
  }
})
