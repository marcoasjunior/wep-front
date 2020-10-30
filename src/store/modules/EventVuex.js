
import axios from '../../util/axios'


export default {

  namespaced: true,

  state: {
    eventDataId:''
  },

  getters: {
    eventDataId: state=> state.eventDataId
  },

  mutations: {
    setEventDataId(state, newState){
      state.eventDataId = newState
    }
  },

  actions: {

    async getEventById(context, newData) {

      const eventResult = await axios.get(process.env.VUE_APP_BASE_URL + `/event/${newData}`)

      try {

        context.commit('setEventDataId', eventResult.data)
        return eventResult.data

      } catch (error){

        console.log(error)

      }

    },

    async likeEvent(context, newData) {

      try {

        const result = await axios.post(process.env.VUE_APP_BASE_URL + `/like/${newData.userId}/${newData.eventId}`)

        return result.data

      } catch (error){

        console.log(error)

      }

    },

    async unlikeEvent(context, newData) {

      try {

        const result = await axios.delete(process.env.VUE_APP_BASE_URL + `/like/${newData.userId}/${newData.eventId}`)

        return result.data

      } catch (error){

        console.log(error)

      }

    },

  }
}
