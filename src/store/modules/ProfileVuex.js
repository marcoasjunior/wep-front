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
    async getUser(context){
      const token = localStorage.getItem('token');
      const decodedToken = await axios.post(process.env.VUE_APP_BASE_URL+'/user/authToken', token);

      console.log(decodedToken)

      const user = await axios.get(process.env.VUE_APP_BASE_URL+`/user/mail/${decodedToken.data}`);
      return user.data;
    },

    async updateUser(context, newData){
      const retorno = await axios.put(process.env.VUE_APP_BASE_URL+'/user', newData);

      return retorno.data;
    },

    async getMyEvents(contex){
      const events = await axios.get(process.env.VUE_APP_BASE_URL+'/event/user');

      return events.data;
    },

    async updateAvatar(context, newAvatar){
      const retorno = await axios.post(process.env.VUE_APP_UPLOAD_URL+'/upload/image', newAvatar);

      return retorno.data;
    }
        
  }
}
