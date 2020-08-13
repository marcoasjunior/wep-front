import axios from '../../util/axios'
import uploadCloudinary from '../../util/cloudinary'

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

      const user = await axios.post(process.env.VUE_APP_BASE_URL + '/user', newData).catch((err) => console.log(err))

      return user

    }

 
  }
}
