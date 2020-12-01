<template>
  <div>
    <Toolbar />
    <v-container class="box">
      <v-container v-if="progress" style="height: 400px">
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

      <v-row v-else class="d-flex flex-column">
        <v-col>
          <v-col ref="form" class="d-flex flex-column">
              <h2 class="ac d-block" v-if="filteredUsers != '' ">
                <v-chip outlined class="title chip">Encontre amigos</v-chip>
              </h2>
            <v-card-title>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
              ></v-text-field>
            </v-card-title>

            
            <div v-if="filteredUsers == '' ">
                <h1 class="alg-txt-c mt-14">Não encontramos usuários 😥</h1>
                <img class="ac d-block mt-12" src="https://res.cloudinary.com/dvzbogxib/image/upload/v1574897432/gifs/giphy_oorqsn.gif" alt="">

                <div class="alg-txt-c d-block ac mt-6">
                <strong>Mas não se preocupe, convide seus amigos para entrar na diversão, mande o link do wep para seus amigos, famila e conhecidos. 📤</strong>
                </div>
            </div>

            <strong v-else class="mb-5">Pessoas que talvez você conheça</strong>

            <v-col max-width="500">
              <v-list subheader>
                <div v-for="user in filteredUsers" :key="user.id">
                  <cpmUserFollow :userData="user" />
                </div>
              </v-list>

              <v-divider></v-divider>
            </v-col>
          </v-col>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import cpmUserFollow from "../../components/cpmUserFollow";
import Toolbar from "@/components/cpmToolBar";
import { mapActions, mapGetters } from "vuex";

export default {
  components: { cpmUserFollow, Toolbar },
  data() {
    return {
      progress: false,
      users: "",
      search: "",
    };
  },
  watch: {
    search: function(val){
      console.log(this.usersData);
      let filtred = this.usersData.filter(user => {

      })
      // this.usersData
      console.log(console.log(filtred));
    }
  },
  methods: {
    ...mapActions({
      getUsers: "FollowVuex/getUsers",
      getFollowing: "FollowVuex/getFollowing",
    }),
    async index() {
      await this.getUsers();
      await this.getFollowing();

      const users = this.usersData;
      const following = this.usersFollowing;

      const filtred = users.filter((user) => {
        following.find((e) => {
          if (e.id == user.id) {
            user.following = true;
          }
        });
      });
    },
  },
  async created() {
    this.progress = true;
    await this.index();
    this.progress = false;
  },
  computed: {
    usersData() {
      let users = this.$store.state.FollowVuex.users;

      return users;
    },
    usersFollowing() {
      let users = this.$store.state.FollowVuex.following;

      return users;
    },
    filteredUsers: function () {
      return this.usersData.filter((user) => {
        return user.name.toLowerCase().match(this.search.toLowerCase());
      });
    },
  },
};
</script>

<style scoped>
.box {
  max-width: 550px;
}
</style>
