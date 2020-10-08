import axios from '../../util/axios'


export default {

  namespaced: true,

  state: {
    cardsEventData:'',
    userData:'',
  },

  getters: {

    cardsEventData: state => state.cardsEventData,
    userData: state => state.userData

  },

  mutations: {
    setFeedEventsData(state, newSate){
      state.cardsEventData = newSate
    },
    setUserData(state, newSate){
      state.userData = newSate
    },

  },

  actions: {
    async getEvents(context){

      await axios.get(process.env.VUE_APP_BASE_URL+'/event/list')
      .then(resp => {
          console.log(resp)
          context.commit('setFeedEventsData',resp.data)
          return resp.data;
      })

    },

    async getuserData(context){
      
      let userId = localStorage.getItem('id');
      await axios.get(process.env.VUE_APP_BASE_URL+`/user/${userId}`)
      .then(resp => {
          console.log(resp)
          context.commit('setUserData', resp.data)

          return resp.data;
      })

    }
        
  }
}
