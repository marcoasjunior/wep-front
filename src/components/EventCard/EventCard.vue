<template>
    <div>
        <div class="p15 mt-10" v-for="(item, i) in dataEventResult" :key="i">

            <v-card max-width="500" class="ac cp card-style-1">

                <img :src='item.img' class="img-size">
                
                <div class="p10 alg-txt-s">
                    <h4 class="clr-red">{{ item.eventDate }}</h4>
                    <h1 class="mt-1">{{ item.title }}</h1>
                    <span class="mt-2 display-b">Criado por <strong>{{ item.user.name }}</strong> </span>
                </div>

                <v-divider class="mt-2"></v-divider>
                <div class="p10 d-flex">

                    <div class="d-block">
                        <v-avatar class="cp" color="orange" size="62">
                            <v-icon v-if="!item.user.avatar" dark>mdi-account-circle</v-icon>
                            <img v-else :src="item.user.avatar" alt="avatar" />
                        </v-avatar>
                    </div>

                </div>
               

            </v-card>

        </div>

        <!-- <h1>conteuno: {{ eventDataId }}</h1> -->
    </div>
</template>
<script>
import {
  mapActions, mapGetters
} from 'vuex'
export default {
    data:() => ({
        url:process.env.VUE_APP_BASE_URL,

        dataEventResult:[]
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
            // console.log("jusadiosaihdsahiudsaihduiah")
            // console.log(resultRequest)
            this.dataEventResult.push(resultRequest)
        }

    },

    created(){
        this.getEventComents()
    }
}
</script>
<style>
    .card-coment{
        display: block;
        border-top: 1px solid rgba(78, 78, 78, 0.644) !important
    }
</style>