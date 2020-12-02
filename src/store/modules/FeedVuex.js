import axios from '../../util/axios'


export default {

  namespaced: true,

  state: {
    cardsEventData: '',
    cardsEventDataPrivated: [],
    userData: '',
  },

  getters: {

    cardsEventDataPrivated: state => state.cardsEventDataPrivated,
    cardsEventData: state => state.cardsEventData,
    userData: state => state.userData

  },

  mutations: {
    deleteEvent(state, data) {
      const index = state.cardsEventData.indexOf(data);
      state.cardsEventData.splice(index, 1);
    },
    setFeedEventsData(state, newSate) {
      state.cardsEventData = newSate;
    },
    setFeedEventsDataPrivated(state, newState){
      state.cardsEventDataPrivated = newState;
    },
    setUserData(state, newSate) {
      state.userData = newSate
    },

  },

  actions: {
    async getPublicEvents(context) {

      await axios.get(process.env.VUE_APP_BASE_URL + `/event/privated/${false}`)
        .then(resp => {
          // console.log(resp)

          // console.log('aqui' + resp.data)
          context.commit('setFeedEventsData', resp.data)
          return resp.data;
        })

    },
    async getPrivatedEvents(context) {

      await axios.get(process.env.VUE_APP_BASE_URL + `/event/privated/${true}`)
        .then(resp => {
          console.log(resp.data)
          context.commit('setFeedEventsDataPrivated', resp.data)
          return resp.data;
        })

    },

    async getuserData(context) {

      let userId = localStorage.getItem('id');
      await axios.get(process.env.VUE_APP_BASE_URL + `/user/${userId}`)
        .then(resp => {
          // console.log(resp)
          context.commit('setUserData', resp.data)

          return resp.data;
        })

    },

    async deleteEvent(context, data) {
      const response = await axios.delete(process.env.VUE_APP_BASE_URL + `/event/${data}`);

      return response.data;
    }


  }
}
