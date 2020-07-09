import axios from 'axios'

export default {

  namespaced: true,

  state: {

  },

  getters: {},

  mutations: {

  },

  actions: {

    async authorizeLogin(context, newData) {

      const units = await axios.get(process.env.VUE_APP_PROD_URL + '/unit')

      context.commit('setUnitData', units.data)

    }

  }
}
