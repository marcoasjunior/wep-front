<template>
    <div>
        <ToolBar />

        <v-container v-if="loading" style="height: 400px;">
            <v-row class="fill-height" align-content="center" justify="center">
                <v-col class="subtitle-1 text-center" cols="12">
                    Carregando eventos...
                </v-col>
                <v-col cols="6">
                    <v-progress-linear color="deep-purple accent-4" indeterminate rounded height="6"></v-progress-linear>
                </v-col>
            </v-row>
        </v-container>

        <section v-else>
            <h1 class="alg-txt-c headline mt-3">Feed</h1>

            <div class="p15 mt-10 ac" v-for="(item, i) in cardsEventData" :key="i">


                <FeedCard :cardData="cardsEventData[i]" @deleted="deleted($event)"/>

                    <!-- <div v-if="cardData.privated == true">
        evento do seu amigo
    </div> -->

            </div>
        </section>
    </div>
</template>

<script>

import ToolBar from '@/components/cpmToolBar'
import FeedCard from '../../components/cpmCard'
import {
    mapActions,
    mapGetters,
    mapMutations
} from 'vuex'

export default {
    components: {
        ToolBar,
        FeedCard
    },

    data: () => ({
        imageURL: './img-card-0.png',
        loading: null,

        itens: [{
                id: '1',
                date: 'SEX, 07 FEV - 20:00 ás --:--',
                title: 'Design Party',
                user: 'Pedro Lopes',
                imageEvent: './img-card-0.png'
            },
            {
                id: '2',
                date: 'SEG, 12 JAN - 19:40 ás --:--',
                title: 'Design Party',
                user: 'Marco Antônio',
                imageEvent: './img-card-0.png'
            },
            {
                id: '3',
                date: 'TER, 23 DEZ - 21:30 ás 23:30',
                title: 'Design Party',
                user: 'Liam Cabral',
                imageEvent: './img-card-0.png'
            },
            {
                id: '4',
                date: 'SEX, 07 FEV - 20:00 ás 23:30',
                title: 'Design Party',
                user: 'Pedro Lopes',
                imageEvent: './img-card-0.png'
            },
            {
                id: '5',
                date: 'SEX, 07 FEV - 20:00 ás 23:30',
                title: 'Design Party',
                user: 'Pedro Lopes',
                imageEvent: './img-card-0.png'
            },
        ]
    }),
    computed: {

        ...mapGetters({

            cardsEventData: 'FeedVuex/cardsEventData',

        }),

    },

    async created() {

        this.loading = true

        try {

            await this.getEvents()

        } catch (error) {

            console.log(error)

        } finally {

            this.loading = false

        }


    },

    methods: {
        ...mapActions({
            getEvents: 'FeedVuex/getEvents',
            getPublicEvents: 'FeedVuex/getPublicEvents',
        }),

        ...mapMutations({
            deleteEvent: "FeedVuex/deleteEvent"
        }),

        deleted(event){
            this.deleteEvent(event)
        },

        test(){
            this.getPublicEvents()
        }
    }
}
</script>

<style scoped>

.progress {

    width: 700px;


}

</style>