<template>
  <div>
    <v-card
      v-if="cardData"
      class="rounded-xl ac mb-5"
      max-width="600px"
    >
      <v-app-bar color="white" class="d-flex align-center" dense>
        <v-avatar size="36" color="orange" class="mr-3">
          <v-icon v-if="!cardData.user.avatar" dark>mdi-account-circle</v-icon>
          <img v-else :src="cardData.user.avatar" alt="avatar" />
        </v-avatar>

        <v-divider vertical></v-divider>

        <div class="d-flex">


          <!-- <div class="ml-5 p20">{{ cardData.user.name }}</div> -->


          <div class="d-flex custom-header-card-margin-left" v-if="cardData.user.id == getId">

            <!-- <span class="d-block ml-a"></span> -->
            <DeleteEvent :deleteCardData="cardData"/>

            <div>
              <EditEvent :eventFields="cardData"/>
            </div>
            
          </div>
          <!--  -->

          <!-- <v-btn
            :loading="apiLoading"
            icon
            class="cp"
            @click="deleteComponentEvent()"
          >
            <v-icon color="red">mdi-delete</v-icon>
          </v-btn> -->
        </div>

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
        <p class="clr-red pl-5">{{ cardData.eventDate }}</p>  

        
        <div v-if="cardData.adress != '' && cardData.adress != null" class="pl-5">
          <button @click="sendPropsPoints(cardData)" class=" d-flex">
            <v-icon class="clr-blk mt-1">mdi-map-marker</v-icon>
            <h2 class="clr-blk">{{ cardData.adress }}</h2>
          </button>
        </div>

      <v-card-text>
        <!-- <p>{{ cardData.description }}</p> -->
        <span v-html="cardData.description"></span>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="d-flex justify-space-between">
        <p>
          <v-btn @click="thumbAction(cardData)" icon>
            <v-progress-circular
              v-if="apiLoading"
              indeterminate
              color="primary"
            ></v-progress-circular>

            <span v-else>
              <v-icon v-if="!checkLike" color="primary"
                >mdi-thumb-up-outline</v-icon
              >
              <v-icon v-else color="primary">mdi-thumb-up</v-icon>
            </span>
          </v-btn>
          <v-chip outlined>{{ cardData.liked.length }}</v-chip>
        </p>
        <p>
          <!-- <v-chip outlined>{{ cardData.comments || 0 }}</v-chip> -->
        </p>
      </v-card-text>

      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header
            >Comentários
            <span class="ml-2"><v-icon>mdi-comment</v-icon></span>
          </v-expansion-panel-header>
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

                {{ comment.user.name }} -

                <span class="ml-2" v-if="selectedCommentId != comment.id">
                  {{ comment.comment }}
                </span>

                <span
                  class="ml-2"
                  v-if="selectedCommentId == comment.id && !setUpdateinput"
                >
                  {{ comment.comment }}
                </span>

                <div class="d-flex" v-if="setUpdateinput">
                  <v-text-field
                    class="ml-3"
                    v-if="selectedCommentId == comment.id"
                    v-model="updateInputComment"
                    :counter="500"
                    label="First name"
                    outlined
                  ></v-text-field>

                  <div>
                    <v-icon
                      v-if="selectedCommentId == comment.id"
                      color="error"
                      class="d-block"
                      @click="setUpdateinput = false"
                    >
                      mdi-close
                    </v-icon>

                    <v-icon
                      v-if="selectedCommentId == comment.id"
                      color="primary"
                      @click="sendUpdateComment(comment)"
                    >
                      mdi-send-circle-outline
                    </v-icon>
                  </div>
                </div>

                <v-menu v-if="comment.user.id == userData.id" offset-x>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary"
                      dark
                      class="ml-a"
                      text
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon>mdi-buffer</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item
                      v-for="(item, index) in commentOptions"
                      :key="index"
                      link
                    >
                      <v-list-item-title @click="commentAction(item, comment)">
                        {{ item.name }}
                        <v-icon dark :color="item.color">{{
                          item.icon
                        }}</v-icon>
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
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
                  :loading="apiLoading"
                  @click="createComent(cardData)"
                >
                  Enviar <v-icon class="ml-1">mdi-send-circle-outline</v-icon>
                </v-btn>
              </div>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>


     <v-dialog
            v-model="mapsDialog"
            max-width="400"
          >
            <v-card>

                <v-toolbar dark color="orange">
                    
                    <v-toolbar-title>Local do evento</v-toolbar-title>
                    
                    <div class="ml-a">
                        <v-btn icon dark @click="mapsDialog = false">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </div>

                </v-toolbar>
             
              <div class="p15">

              </div>
   
              <v-card-text class="mt-2">
                <div>
                  <MapPoints :propsCoordinates="cardData" />
                </div>
              </v-card-text>

            </v-card>
          </v-dialog>

  </div>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";

import EditEvent from "@/components/cpmEditEvent";
import DeleteEvent from "@/components/cpmDeleteEvent";
import MapPoints from '@/components/cpmShowMapPoints'

export default {
  name: "Card",
  components: { EditEvent, DeleteEvent, MapPoints },
  props: ["cardData"],
  data: () => ({
    // cardDataArray: [],
    mapsDialog: false,
    newComent: "",
    updateInputComment: "",
    selectedCommentId: "",
    setUpdateinput: false,
    url: process.env.VUE_APP_BASE_URL,

    eventMapPoints:'',

    commentOptions: [
      { name: "Editar", icon: "mdi-pencil", color: "orange" },
      { name: "Deletar", icon: "mdi-trash-can", color: "error" },
    ],
    confirmDeleteEvent: false
  }),

  created() {
    console.log(this.cardData.user.id);
  },

  computed: {
    ...mapGetters({
      apiLoading: "apiLoading",
      userData: "FeedVuex/userData",
    }),

    getId() {
      return parseInt(localStorage.getItem("id"));
    },

    checkLike() {
      if (!this.cardData.liked) return;

      const setTocheck = new Set();

      this.cardData.liked.forEach((like) => setTocheck.add(like.user.id));

      if (setTocheck.has(this.getId)) return true;

      return false;
    },
  },

  methods: {
    ...mapActions({
      getEvents: "FeedVuex/getEvents",
      likeEvent: "EventVuex/likeEvent",
      unlikeEvent: "EventVuex/unlikeEvent",
      getMyEvents: "ProfileVuex/getMyEvents",
    }),

    sendPropsPoints(param){
      this.mapsDialog = true
      console.log(param)
    },

    createComent(param) {
      this.$store.commit("setApiLoading", true);
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
            this.$store.commit("setApiLoading", false);
            if (resp.data != "") {
              this.getEvents();
              this.newComent = "";

              this.$toast.success("evento comentado!", "💥", {
                position: "topCenter",
              });
            }
          })
          .catch((err) => {
            this.$store.commit("setApiLoading", false);
            this.$toast.error("Erro ao tentar comentar no evento!", "Putz", {
              position: "topCenter",
            });
          });
      }
    },

    async thumbAction(cardData) {
      try {
        this.$store.commit("setApiLoading", true);
        !this.checkLike
          ? await this.likeEvent({ eventId: cardData.id, userId: this.getId })
          : await this.unlikeEvent({
              eventId: cardData.id,
              userId: this.getId,
            });

        await this.getEvents();
        this.$store.commit("setApiLoading", false);
      } catch (error) {
        console.log(error);

        this.$store.commit("setApiLoading", false);
        this.$toast.error("Erro ao curtir", "Putz", { position: "topCenter" });
      }
    },

    sendUpdateComment(comentData) {
      let comentId = comentData.id;
      let body = {
        comment: this.updateInputComment,
      };
      axios
        .put(this.url + `/comment/${comentId}`, body)
        .then((resp) => {
          console.log(resp);
          if (resp.data != "") {
            this.getEvents();
            this.setUpdateinput = false;
            this.$toast.success("Comentário alterado", "💥", {
              position: "topCenter",
            });
          }
        })
        .catch((err) => {
          this.$toast.error("Erro ao tentar alterar comentário!", "Putz", {
            position: "topCenter",
          });
        });
    },

    commentAction(param, comentID) {
      console.log(param);
      if (param.name == "Editar") {
        this.updateComment(comentID);
      } else if (param.name == "Deletar") {
        this.deleteComment(comentID);
      }
    },
    updateComment(comentParam) {
      console.log(comentParam.id);
      this.selectedCommentId = comentParam.id;
      this.setUpdateinput = true;
    },
    deleteComment(comentParam) {
      let comentId = comentParam.id;
      axios
        .delete(this.url + `/comment/${comentId}`)
        .then((resp) => {
          console.log(resp);
          if (resp.data != "") {
            this.getEvents();

            this.$toast.success("Comentário deletado", "💥", {
              position: "topCenter",
            });
          }
        })
        .catch((err) => {
          this.$toast.error("Erro ao tentar deletar comentário!", "Putz", {
            position: "topCenter",
          });
        });
    },
  },
};
</script>

<style lang="scss">
.custom-header-card-margin-left {

    margin-left: 20px !important;

    @media screen and (max-width: 650px) {
      margin-left: 100px !important;
    }
}
</style>