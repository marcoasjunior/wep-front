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
      const formData = new FormData()

      formData.append('username', newData.username)
      formData.append('password', newData.password)

      const autho = 'penis'

      context.commit('setAutho', autho.data)

      return autho
    }

  }
}
