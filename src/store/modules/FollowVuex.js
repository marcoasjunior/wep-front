import axios from '../../util/axios'


export default {

  namespaced: true,

  state: {
    users: [],

    following: [],
  },

  getters: {

    usersData: state => state.usersData

  },

  mutations: {
 
    setUsers(state, newState){
        state.users = newState
    },

    setFollowing(state, newState){
        state.following = newState
    }

  },

  actions: {

    async getUsers(context){
        const users = await axios.get(process.env.VUE_APP_BASE_URL+'/user');

        const [thisUser] = users.data.filter(item => localStorage.id == item.id);

        users.data.splice(users.data.indexOf(thisUser), 1)

        await context.commit('setUsers', users.data);

        return users.data;
    },

    async doFollow(context, new_follow_id){
        const follow = await axios.put(process.env.VUE_APP_BASE_URL+`/user/${new_follow_id}/follow`);

        return follow.data;
    },

    async getFollowing(context){
        const following = await axios.get(process.env.VUE_APP_BASE_URL+`/user/${localStorage.id}/following`);

        await context.commit('setFollowing', following.data);

        return following.data;
    }
        
  }
}