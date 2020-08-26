import axios from '../../util/axios'


export default {

  namespaced: true,

  state: {
    cardsEventData:''
  },

  getters: {

    cardsEventData: state => state.cardsEventData

  },

  mutations: {
    setFeedEventsData(state, newSate){
      state.cardsEventData = newSate
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
        
  }
}
