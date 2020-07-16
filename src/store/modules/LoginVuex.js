import axios from '../../util/axios'

export default {

  namespaced: true,

  state: {

 

  },

  getters: {


  },

  mutations: {

  },

  actions: {

    async authLogin (context, newData) {

      console.log(newData)

      const autho = await axios.post(process.env.VUE_APP_BASE_URL + '/user/auth', newData)

      return autho

    }

  }
}
