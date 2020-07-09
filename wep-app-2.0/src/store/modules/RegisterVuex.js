import axios from '../../util/axios'

export default {

  namespaced: true,

  state: {

    authorized: false

  },

  getters: {
    authorized: state => state.authorized

  },

  mutations: {

    setAutho (state, newState) {
      state.authorized = newState
    }

  },

  actions: {

    async authorizeLogin (context, newData) {
      const autho = await axios.post(process.env.VUE_APP_PROD_URL + '/unit', newData)

      context.commit('setAutho', autho.data)
    }

  }
}
