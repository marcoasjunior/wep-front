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

      // APenas para teste

      newData.avatar = 'https://res.cloudinary.com/dxblalpv2/image/upload/v1590157243/clo_gac9pl.jpg'

      const user = await axios.post(process.env.VUE_APP_BASE_URL + '/user', newData).catch((err) => console.log(err))

      return user

    }
  }
}
