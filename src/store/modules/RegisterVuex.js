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

    async register (context, newData) {

      // const formData = new FormData()

      // formData.append('avatar', newData.avatar)
      // formData.append('email', newData.email)
      // formData.append('password', newData.password)
      // formData.append('name', newData.name)
      // formData.append('whatssap', newData.whatssap)

      const user = await axios.post(process.env.VUE_APP_BASE_URL + '/user', newData)

      return user.data

    }
  }
}
