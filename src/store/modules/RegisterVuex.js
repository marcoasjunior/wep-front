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

      const cloudinary = await uploadCloudinary(newData.avatar)

      newData.avatar = cloudinary.data.secure_url

      const user = await axios.post(process.env.VUE_APP_BASE_URL + '/user', newData).catch((err) => console.log(err))

      return user

    }
  }
}
