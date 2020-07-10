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

    async authLogin (context, newData) {
      const formData = new FormData()

      formData.append('email', newData.email)
      formData.append('password', newData.password)

      const autho = await axios.post(process.env.VUE_APP_BASE_URL + '/user/auth', newData)

      return autho.data

    }

  }
}
