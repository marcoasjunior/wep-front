<template>
    <div>

        <v-card v-if="cardData" class="rounded-xl ac" max-height="900px" max-width="600px">

            <v-app-bar color="white" class="d-flex align-center" dense>

                <v-avatar size="36" color="orange" class="mr-3">
                    <v-icon v-if="!cardData.user.avatar" dark>mdi-account-circle</v-icon>
                    <img v-else :src="cardData.user.avatar" alt="avatar">
                </v-avatar>
                
                |

                <div class="ml-3">{{cardData.user.name}}</div>


                <div class="ml-3">{{cardData.eventDate}}</div>

            </v-app-bar>

            <v-img contain max-width="600px" max-height="600px" :src="cardData.img"></v-img>

            <v-card-title>
                <h2>{{cardData.title}}</h2>
            </v-card-title>

            <v-card-text>
                <p>{{cardData.description}}</p>
            </v-card-text>

            <v-expansion-panels>
                <v-expansion-panel>
                    <v-expansion-panel-header>Comentários</v-expansion-panel-header>
                        <v-expansion-panel-content>

                            <div v-if="cardDataArray[0].comments != '' ">
                                <div class="d-flex" v-for="(item, i) in cardDataArray" :key="i">

                                    <v-avatar size="36" color="orange">
                                        <v-icon v-if="!item.comments[i].user.avatar" dark>mdi-account-circle</v-icon>
                                        <img v-else :src="item.comments[i].user.avatar" alt="avatar">
                                    </v-avatar>

                                        <strong class="ml-2 mt-1">{{ item.comments[0].user.name }}:</strong> 

                                        <p class="ml-2 mt-1">{{ item.comments[0].comment }}</p>
                                </div>
                            </div>

                            <div>

                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum, magni dicta. Dignissimos doloribus cum, similique corrupti consequatur quod! Deserunt, sequi!
                                <!-- {{ userData }} -->
                                <!-- <v-avatar size="36" color="orange">
                                    <v-icon v-if="!item.comments[i].user.avatar" dark>mdi-account-circle</v-icon>
                                    <img v-else :src="item.comments[i].user.avatar" alt="avatar">
                                </v-avatar>

                                <v-textarea
                                    outlined
                                    v-model="newComent"
                                    color="black"
                                    label="Comentário"
                                    :counter="500"
                                ></v-textarea>

                                <div class="d-flex justify-space-between">           
                                    <v-btn color="orange" dark class="ml-a" @click="createComent">
                                        Enviar
                                    </v-btn>
                                </div> -->

                            </div>
                        </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>

        </v-card>

    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    name: 'Card',
    props: ['cardData'],
    data:() => ({
        cardDataArray: [],
        newComent:''
    }),

    computed:{
        ...mapGetters({
            userData: 'userData'
        })
    },

    methods:{


        createComent(){
            
        }
    },

    created(){
        this.cardDataArray.push(this.cardData)
    }

}
</script>

<style lang="scss" scoped>





</style>