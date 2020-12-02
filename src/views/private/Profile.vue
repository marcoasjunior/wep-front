<template>
  <div class="mx-auto d-flex flex-column">
    <Toolbar />

    <h1 class="alg-txt-c headline ma-4">Perfil</h1>

    <v-container v-if="loading" style="height: 400px">
      <v-row class="fill-height" align-content="center" justify="center">
        <v-col class="subtitle-1 text-center" cols="12"> Carregando... </v-col>
        <v-col cols="6">
          <v-progress-linear
            color="deep-purple accent-4"
            indeterminate
            rounded
            height="6"
          ></v-progress-linear>
        </v-col>
      </v-row>
    </v-container>

    <v-card v-else flat class="mx-auto">
      <v-card max-width="600" class="d-flex flex-column">
        <v-card flat class="mx-auto d-flex flex-column" max-width="600">
          <v-list-item three-line>
            <v-list-item-content class="mt-3">
              <!-- <div class="overline mb-4">OVERLINE</div> -->
              <v-list-item-title class="headline mb-1">{{
                user_data.name
              }}</v-list-item-title>
              <hr />
              <v-list-item-subtitle>E-mail: {{ user_data.email }}</v-list-item-subtitle>
              <v-list-item-subtitle>Whatsapp: {{
                user_data.whatsapp
              }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-avatar class="cp" color="orange" size="62">
              <v-icon v-if="!user_data.avatar" dark>mdi-account-circle</v-icon>
              <img v-else :src="user_data.avatar" alt="avatar" />
            </v-avatar>
          </v-list-item>

            <EditDialog
              :user_data="user_data"
              :updateUser="updateUser"
              :updateAvatar="updateAvatar"
            />

            <v-divider class="mt-4"></v-divider>

          <v-card-actions class="">
            <div class="ac d-block">
              <div class="number-follow">
                <p class="mb-0 alg-txt-c custom-follow-font">{{ dataFollows[0].length }}</p>
              </div>
              
              <followsDialog :follow="0" :data="dataFollows" />
            </div>

            <div class="d-block ac">
              <div class="number-follow custom-follow-font">
                <p class="mb-0 alg-txt-c">{{ dataFollows[1].length }}</p>
              </div>
              <followsDialog :follow="1" :data="dataFollows" />
            </div>

          </v-card-actions>
        </v-card>

        <v-divider></v-divider>

        <div class="" v-if="events == ''">
          <h5 class="alg-txt-c p20">
            Você não tem eventos cadastrados.
          </h5>
          <div align="center" class="mb-5">
            <v-btn rounded color="orange" outlined dark to="/Event"
              >Cadastre um evento</v-btn
            >
          </div>
        </div>
      </v-card>

      <section v-if="events != ''">
        <h2 class="alg-txt-c mt-5 headline mx-auto">Meus Eventos</h2>
        <div class="mb-6 p10" v-for="event in events" :key="event.id">
          <EventCard
            class="mt-4"
            :cardData="event"
            @deleted="deleted($event)"
          />
        </div>
      </section>
      <div align="center">
        <v-btn class="ac mt-4 mb-6" block color="red" @click="logOut()" dark
          >SAIR</v-btn
        >
      </div>
    </v-card>
  </div>
</template>

<script>
import Toolbar from "@/components/cpmToolBar";
import SetMap from "../../components/cpmSetMapPoints";
import EditDialog from "@/components/cpmDialogProfile";
import EventCard from "@/components/cpmCard";
import followsDialog from "@/components/cpmDialogFollows";

import { mapActions, mapMutations } from "vuex";

export default {
  components: {
    Toolbar,
    SetMap,
    EditDialog,
    EventCard,
    followsDialog,
  },

  data: () => ({
    loading: false,
    src: "",
    imageData: "",

    dataFollows: [],

    uploadUrl: process.env.VUE_APP_UPLOAD_URL,

    user_data: {
      avatar: "",
      name: "",
      email: "",
      password: "",
      whatsapp: "",
    },
  }),

  methods: {
    ...mapActions({
      getEvents: "FeedVuex/getEvents",
      getUser: "ProfileVuex/getUser",
      updateUser: "ProfileVuex/updateUser",
      getMyEvents: "ProfileVuex/getMyEvents",
      updateAvatar: "ProfileVuex/updateAvatar",
      getFollowing: "ProfileVuex/getFollowing",
      getFollowers: "ProfileVuex/getFollowers",
    }),

    ...mapMutations({
      deleteEvent: "ProfileVuex/deleteEvent",
    }),

    logOut() {
      localStorage.removeItem("token");
      localStorage.removeItem("id");

      this.$router.push("/Home");
    },
    async index() {
      this.loading = true;
      await this.loadUser();
      await this.getMyEvents();
      await this.getFollowing();
      await this.getFollowers();
      this.dataFollows.push(this.following);
      this.dataFollows.push(this.followers);
      console.log(this.dataFollows);

      this.loading = false;
    },
    async loadUser() {
      const user = await this.getUser();

      this.user_data.avatar = user.avatar;
      this.user_data.name = user.name;
      this.user_data.email = user.email;
      this.user_data.password = user.password;
      this.user_data.whatsapp = user.whatsapp;
    },

    deleted(event) {
      this.deleteEvent(event)
    },
  },

  async created() {
    this.loading = true;
    await this.index();
    // console.log(this.followers);
    this.loading = false;
  },

  computed: {
    events() {
      return this.$store.state.ProfileVuex.myEvents;
    },
    following() {
      return this.$store.state.ProfileVuex.following;
    },
    followers() {
      return this.$store.state.ProfileVuex.followers;
    },
  },
};
</script>

<style lang="scss">
.number-follow{
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
}

.card {
  width: 500px;
  margin-left: auto;
  margin-right: auto;
}
</style>