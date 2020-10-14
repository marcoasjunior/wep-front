<template>
  <div>
    <v-card
      v-if="cardData"
      class="rounded-xl ac"
      max-height="900px"
      max-width="600px"
    >
      <v-app-bar color="white" class="d-flex align-center" dense>
        <v-avatar size="36" color="orange" class="mr-3">
          <v-icon v-if="!cardData.user.avatar" dark>mdi-account-circle</v-icon>
          <img v-else :src="cardData.user.avatar" alt="avatar" />
        </v-avatar>

        |

        <div class="ml-3">{{ cardData.user.name }}</div>

        <div class="ml-3">{{ cardData.eventDate }}</div>
      </v-app-bar>

      <v-img
        contain
        max-width="600px"
        max-height="600px"
        :src="cardData.img"
      ></v-img>

      <v-card-title>
        <h2>{{ cardData.title }}</h2>
      </v-card-title>

      <v-card-text>
        <p>{{ cardData.description }}</p>
      </v-card-text>

      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header>Comentários</v-expansion-panel-header>
          <v-expansion-panel-content>
            <div>
              <div
                class="d-flex mt-4"
                v-for="comment in cardData.comments"
                :key="comment.id"
              >

                <v-avatar size="33" color="orange" class="mr-4">
                  <v-icon v-if="!comment.user.avatar" dark
                    >mdi-account-circle</v-icon
                  >
                  <img v-else :src="comment.user.avatar" alt="avatar" />
                </v-avatar>

                {{ comment.user.name }} - {{ comment.comment }}
              </div>

            </div>

            <div class="mt-5">
              <div class="d-flex">
                <v-avatar size="47" color="orange" class="mr-4">
                  <v-icon v-if="!userData.avatar" dark
                    >mdi-account-circle</v-icon
                  >
                  <img v-else :src="userData.avatar" alt="avatar" />
                </v-avatar>

                <v-textarea
                  outlined
                  v-model="newComent"
                  class="text-area-coment"
                  :counter="500"
                  auto-grow
                  filled
                  color="black"
                  label="Comente no evento 🗯"
                  rows="1"
                ></v-textarea>
              </div>

              <div class="d-flex justify-space-between">
                <v-btn
                  color="orange"
                  dark
                  class="ml-a"
                  @click="createComent(cardData)"
                >
                  Enviar
                </v-btn>
              </div>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Card",
  props: ["cardData"],
  data: () => ({
    // cardDataArray: [],
    newComent: "",
    url: process.env.VUE_APP_BASE_URL,
  }),

  computed: {
    ...mapGetters({
      userData: "FeedVuex/userData",
    }),
  },

  methods: {
    createComent(param) {
      if (!this.newComent) {
        this.$toast.error("Verifique se existe algum campo vazio", "Atenção!", {
          position: "topCenter",
        });
      } else {
        let body = {
          comment: this.newComent,
        };
        let eventId = param.id;

        // this.$http.post(this.url + `/comment/${eventId}`, body).then(resp => {
        //     console.log(resp)
        // })

        axios
          .post(this.url + `/comment/${eventId}`, body)
          .then((resp) => {
            // console.log(resp)
          })
          .catch((err) => {
            this.$toast.error("Erro no registro!", "Putz", {
              position: "topCenter",
            });
          });
      }
    },
  },

  created() {
    // this.cardDataArray.push(this.cardData)
    console.log(this.cardData.comments);
  },
};
</script>

<style lang="scss">
.text-area-coment {
}
</style>