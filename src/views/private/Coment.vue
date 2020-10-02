<template>
    <div>
        <EventCard :cardData="dataEventResult"/>
    </div>
</template>
<script>
import EventCard from '../../components/cpmCard'
import {
  mapActions, mapGetters
} from 'vuex'
export default {
    components:{
        EventCard
    },
    data:() => ({

        dataEventResult:'',

    }),
    computed:{
        ...mapGetters({
            eventDataId: 'EventVuex/eventDataId'
        })
    },

    methods:{

        ...mapActions({
            getEventById: 'EventVuex/getEventById'
        }),

        async getEventComents(){
            
            let resultRequest = await this.getEventById(3)
            this.dataEventResult = resultRequest
        }

    },

    created(){
        this.getEventComents()
    }
}
</script>