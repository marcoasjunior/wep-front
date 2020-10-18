import axios from '../../util/axios'

export default {

  namespaced: true,

  state: {
    userData:''
  },

  getters: {
    userData: state=> state.userData
  },

  mutations: {
    setUserData(state, newState){
      state.userData = newState
    }
  },

  actions: {

    async authLogin (context, newData) {

      const autho = await axios.post(process.env.VUE_APP_BASE_URL + '/user/auth', newData)
      localStorage.setItem('id', autho.data[1])
      context.commit('setUserData', autho)
      return autho

    },

    async authToken (context) {

      const autho = await axios.post(process.env.VUE_APP_BASE_URL + '/user/authToken')

      return autho.data;

    },

  }
}
