<template>
    <div>

        <v-card v-if="cardData" class="rounded-xl" max-height="900px" max-width="600px">

            <v-app-bar color="white" class="d-flex align-center" dense>

                <v-avatar size="36" color="orange">
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
                        <v-expansion-panel-content v-for="(comment, i) in cardData.comments" :key="i">
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
            
        }
    },

}
</script>

<style lang="scss" scoped>





</style>