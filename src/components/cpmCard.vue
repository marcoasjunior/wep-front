<template>
    <div>

        <v-card class="rounded-xl" max-height="900px" max-width="600px">

            <v-app-bar color="white" class="d-flex align-center" dense>

                <v-avatar size="36" color="orange">
                   <v-icon v-if="!card.user.avatar" dark>mdi-account-circle</v-icon>
                    <img v-else :src="card.user.avatar" alt="avatar">
                </v-avatar>

                <div class="ml-3">{{card.name}}</div>
                
                |

                <div class="ml-3">{{card.user.name}}</div>


                <div class="ml-3">{{card.eventDate}}</div>

            </v-app-bar>

            <v-img contain max-width="600px" max-height="600px" :src="card.img"></v-img>

            <v-card-title>
                <h2>{{card.title}}</h2>
            </v-card-title>

            <v-card-text>
                <p>{{card.description}}</p>
            </v-card-text>

            <!-- <v-card-subtitle>
                <p>Criado em {{card.createdAt}}</p>
            </v-card-subtitle> -->

            <v-expansion-panels>
                <v-expansion-panel>
                    <v-expansion-panel-header>Comentários</v-expansion-panel-header>
                        <v-expansion-panel-content v-for="(comment, i) in card.comments" :key="i">
                            <!-- {{comment.user}}: {{comment.comment}} -->
                        <!-- <v-avatar size="35">
                            <v-img :src="user.avatar"></v-img>
                        </v-avatar> -->
                            {{comment.user.name}}: {{comment.comment}}
                        </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>

        </v-card>

    </div>
</template>

<script>
export default {
    name: 'Card',
    props: ['cardData'],
    data() {
        return {
            card: this.cardData
        }
    },

}
</script>

<style lang="scss" scoped>





</style>