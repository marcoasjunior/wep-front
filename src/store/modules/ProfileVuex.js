import axios from '../../util/axios'


export default {

  namespaced: true,

  state: {
    following: [],
    followers: []
  },

  getters: {


  },

  mutations: {
    setFollowing(state, data){
      for(let i = 0; i < data.length; i++){
        data[i].following = true;
      }
      state.following = data;
    },
    setFollowers(state, data){
      const filtred = data.filter(user => {
        state.following.find(e => {
          if(e.id == user.id){
            user.following = true;
          }
        })
      })
      state.followers = data;
    }
  },

  actions: {
    async getUser(context) {

      const user = await axios.get(process.env.VUE_APP_BASE_URL + `/user/this`);
      return user.data;
    },

    async updateUser(context, newData) {
      const retorno = await axios.put(process.env.VUE_APP_BASE_URL + '/user', newData);

      return retorno.data;
    },

    async getMyEvents(contex) {
      const events = await axios.get(process.env.VUE_APP_BASE_URL + '/event/user');

      return events.data;
    },

    async updateAvatar(context, newAvatar) {
      const retorno = await axios.post(process.env.VUE_APP_UPLOAD_URL + '/upload/image', newAvatar);

      return retorno.data;
    },

    async getFollowing(context) {
      const following = await axios.get(process.env.VUE_APP_BASE_URL + `/user/${localStorage.id}/following`);

      await context.commit('setFollowing', following.data);

      return following.data;
    },

    async getFollowers(context) {
      const followers = await axios.get(process.env.VUE_APP_BASE_URL + `/user/${localStorage.id}/followers`);

      await context.commit('setFollowers', followers.data);

      return followers.data;
    }

  }
}
