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

      const user = await axios.get(process.env.VUE_APP_BASE_URL+`/user/mail/${decodedToken.data}`);

      return user.data;
    }
        
  }
}
