<template>
    <div>

        <v-card class="rounded-xl" max-height="900px" max-width="600px">

            <v-app-bar color="white" class="d-flex align-center" dense>

                <v-avatar size="36">
                    <v-img :src="avatar"></v-img>
                </v-avatar>

                <div class="ml-3">{{card.name}}</div>

                <div class="ml-3">{{card.date}}</div>

            </v-app-bar>

            <v-img contain max-width="600px" max-height="600px" :src="img"></v-img>

            <v-card-title>
                <h2>{{card.eventName}}</h2>
            </v-card-title>

            <v-card-text>
                <p>{{card.description}}</p>
            </v-card-text>

            <v-card-subtitle>
                <p>Criado em {{card.creationDate}}</p>
            </v-card-subtitle>

            <v-expansion-panels>
                <v-expansion-panel>
                    <v-expansion-panel-header>Comentários</v-expansion-panel-header>
                        <v-expansion-panel-content v-for="(comment, i) in card.comments" :key="i">
                            {{comment.user}}: {{comment.comment}}
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