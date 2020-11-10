<template>
  <div class="mx-auto d-flex flex-column">
    <Toolbar />

    <h1 class="alg-txt-c headline ma-4">Perfil</h1>

    <v-card flat class="mx-auto">
      <v-card max-width="600" class="d-flex flex-column">
        <v-card flat class="mx-auto d-flex flex-column" max-width="600">
          <v-list-item three-line>
            <v-list-item-content class="mt-3">
              <!-- <div class="overline mb-4">OVERLINE</div> -->
              <v-list-item-title class="headline mb-1">{{user_data.name}}</v-list-item-title>
              <hr />
              <v-list-item-subtitle>{{user_data.email}}</v-list-item-subtitle>
              <v-list-item-subtitle>{{user_data.whatsapp}}</v-list-item-subtitle>
            </v-list-item-content>

            <v-avatar class="cp" color="orange" size="62">
              <v-icon v-if="!user_data.avatar" dark>mdi-account-circle</v-icon>
              <img v-else :src="user_data.avatar" alt="avatar" />
            </v-avatar>
          </v-list-item>

          <v-card-actions>
            <!-- <v-btn text>Editar</v-btn> -->
            <!-- <v-btn text></v-btn> -->
            <Dialog :user_data="user_data" :updateUser="updateUser" :updateAvatar="updateAvatar" />
          </v-card-actions>
        </v-card>

        <h2 class="alg-txt-s mt-5 headline mx-auto">Meus Eventos</h2>

        <div class="mt-5" v-if="events == false">
          <h5 class="alg-txt-c">Você não tem eventos cadastrados</h5>
          <v-row align="center">
            <v-col class="text-center" cols="1" sm="12">
              <router-link to="/Event">
                <v-btn
                  align="center"
                  class="ml-2"
                  rounded
                  color="orange"
                  outlined
                  dark
                >Cadastre um evento</v-btn>
              </router-link>
            </v-col>
          </v-row>
        </div>

        <div>

        </div>
      </v-card>

        <section v-if="events != false">
          <div class="mb-6 p10" v-for="event in events" :key="event.id">
            <EventCard class="mt-4 card" :cardData="event" />
          </div>
        </section>
            <!-- <v-col class="text-center mt-7" cols="1" sm="12"> -->
            <div align="center">
              <v-btn class="ac mt-4 mb-6" color="red" @click="logOut()" dark>SAIR</v-btn>
            </div>
          <!-- </v-col> -->
    </v-card>
  </div>
</template>

<script>
import Toolbar from "@/components/cpmToolBar";
import SetMap from "../../components/cpmSetMapPoints";
import Dialog from "@/components/cpmDialogProfile";
import EventCard from "@/components/cpmCard";

import { mapActions } from "vuex";

export default {
  components: {
    Toolbar,
    SetMap,
    Dialog,
    EventCard,
  },

  data: () => ({
    src: "",
    imageData: "",

    uploadUrl: process.env.VUE_APP_UPLOAD_URL,

    user_data: {
      avatar: "",
      name: "",
      email: "",
      password: "",
      whatsapp: "",
    },

    events: [],
  }),

  methods: {
    ...mapActions({
      getEvents: "FeedVuex/getEvents",
      getUser: "ProfileVuex/getUser",
      updateUser: "ProfileVuex/updateUser",
      getMyEvents: "ProfileVuex/getMyEvents",
      updateAvatar: "ProfileVuex/updateAvatar",
    }),
    logOut(){
      localStorage.removeItem('token');
      localStorage.removeItem('id');

      this.$router.push('/Home');
    },
    async loadUser() {
      const user = await this.getUser();

      this.user_data.avatar = user.avatar;
      this.user_data.name = user.name;
      this.user_data.email = user.email;
      this.user_data.password = user.password;
      this.user_data.whatsapp = user.whatsapp;
    },

    async loadEvents() {
      const events = await this.getMyEvents();

      if (events.length < 1) {
        this.events = false;
      }

      this.events = events;
    },
  },

  created() {
    this.getEvents();
    this.loadUser();
    this.loadEvents();
  },
};
</script>

<style scoped>


.card {

    width: 500px;
    margin-left: auto;
    margin-right: auto;


}

</style>