<template>
  <div id="app_p">
      <router-view/>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {

  methods:{
      ...mapActions({
          getuserData: 'FeedVuex/getuserData'
      }),
  },

  created(){
    this.getuserData()
  }
}
</script>