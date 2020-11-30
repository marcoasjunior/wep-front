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
            <h1 class="alg-txt-c headline mt-3"> <v-chip outlined class="title chip">Feed</v-chip>  </h1>

            
            <div v-if="cardsEventData == '' && !loading">
                <h1 class="alg-txt-c mt-14">Nenhum evento foi encontrado 😥</h1>
                <img class="ac d-block mt-12" src="https://res.cloudinary.com/dvzbogxib/image/upload/v1574897432/gifs/giphy_oorqsn.gif" alt="">

                <div class="container-not-found-message d-block ac mt-6">
                <p>Mas não se preocupe, seja o primeiro a postar um evento e compartilhar com seus amigos.</p>
                </div>
            </div>

            <div class="p15 mt-10 ac" v-for="(item, i) in cardsEventData" :key="i">

                <FeedCard :cardData="cardsEventData[i]" @deleted="deleted($event)"/>

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

        following: '',
        followers: '',

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

            userData: 'FeedVuex/userData',
            cardsEventData: 'FeedVuex/cardsEventData',
        }),

    },

    async created() {
        
        this.loading = true

        try {
            
            // await this.getEvents()
            await this.getPublicEvents()

        } catch (error) {
            
            console.log(error)

        } finally {
            
            this.loading = false

        }

        this.getAllFollowing();

    },

    methods: {
        ...mapActions({
            getEvents: 'FeedVuex/getEvents',
            getPublicEvents: 'FeedVuex/getPublicEvents',
            getFollowing: "ProfileVuex/getFollowing",
            getFollowers: "ProfileVuex/getFollowers",
        }),

        ...mapMutations({
            deleteEvent: "FeedVuex/deleteEvent"
        }),

        //Delete o evento do vuex
        deleted(event){
            this.deleteEvent(event)
        },

        async getAllFollowing(){
            let responseFollowing = await this.getFollowing();
            let responseFollowers = await this.getFollowers();
            this.following = responseFollowing
            this.followers = responseFollowers

        }
    }
}
</script>

<style lang="scss">

.container-not-found-message{
    text-align: center;
    max-width: 20%;
    width: 100%;

    p{
        font-size: 19px;
        font-weight: 600;
    }

    @media screen and (max-width: 700px){
        max-width: 80%;
        width: 100%;
    }
}



.progress {
    width: 700px;
}

</style>