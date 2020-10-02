<template>
    <div>
        <ToolBar />
        <v-progress-linear v-if="loading" class="progress mx-auto" indeterminate color="purple"></v-progress-linear>

        <section v-else>
            <h1 class="alg-txt-c headline mt-3">Feed</h1>


            <div class="p15 mt-10 ac" v-for="(item, i) in cardsEventData" :key="i">


                <FeedCard :cardData="cardsEventData[i]"/>


                <!-- <v-card max-width="600" class="ac cp card-style-1">

                    <img :src='item.img' class="img-size">

                    <div class="p10 alg-txt-s">
                        <h4 class="clr-red">{{ item.eventDate }}</h4>
                        <h1 class="mt-1">{{ item.title }}</h1>
                        <span class="mt-2 display-b">Criado por <strong>{{ item.user.name }}</strong> </span>
                    </div>

                </v-card> -->

            </div>
        </section>

    </div>
</template>

<script>

import ToolBar from '@/components/cpmToolBar'
import FeedCard from '../../components/cpmCard'
import {
    mapActions,
    mapGetters
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
            getEvents: 'FeedVuex/getEvents'
        }),
    }
}
</script>

<style scoped>

.progress {

    width: 700px;


}

</style>