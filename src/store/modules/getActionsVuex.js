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

    async listPublicEvents(context, newData) {

      console.log(newData)
        let privated = newData

      await axios.get(process.env.VUE_APP_BASE_URL + `/event/${privated}`)
      .then(resp => {
          console.log(resp)
      })
      

    },

    async listAllEvents(context, newData) {

      console.log(newData)

      await axios.get(process.env.VUE_APP_BASE_URL + '/event/list')
      .then(resp => {
          console.log(resp)
      })
      

    },

  }
}
