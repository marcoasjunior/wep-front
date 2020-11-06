<template>
  <v-container class="box">
    <v-row class="d-flex flex-column">
      <v-col>
        <v-col ref="form" class="d-flex flex-column">
          <h2 class="ac">Encontre amigos</h2>
          <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
            ></v-text-field>
          </v-card-title>

          <strong class="mb-5">Pessoas que talvez você conheça</strong>

          <!-- <cpmUserFollow />   -->

          <!--  -->

          <v-col max-width="500">
            <v-list subheader>
              <div v-for="user in users" :key="user.id">
                <cpmUserFollow :userData="user" />
              </div>
            </v-list>

            <v-divider></v-divider>
          </v-col>

          <!--  -->
          <v-btn class="button mt-5" color="warning" block>Próximo</v-btn>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import cpmUserFollow from "../../components/cpmUserFollow";

import { mapActions, mapGetters } from "vuex";

export default {
  components: { cpmUserFollow },
  data() {
    return {
      users: "",
      search: "",
      recent: [
        {
          active: true,
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          title: "Jason Oner",
        },
        {
          active: true,
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
          title: "Mike Carlson",
        },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          title: "Cindy Baker",
        },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
          title: "Ali Connors",
        },
      ],
      previous: [
        {
          title: "Travis Howard",
          avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
        },
      ],
    };
  },
  methods: {
    ...mapActions({
      getUsers: "FollowVuex/getUsers",
      getFollowing: "FollowVuex/getFollowing",
      doFollow: "FollowVuex/doFollow",
    }),
    filterFollowing() {
      // var ar1 = [{ n: "liam" }, {n: 'lucas'}];
      // var ar2 = [
      //   { n: "barbara" },
      //   { n: "liam" },
      //   { n: "liris" },
      //   { n: "jovirone" },
      //   { n: "chicão" },
      // ];

      // var ar2Filter = ar2.filter(item => {
      //   ar1.find(e => {
      //     if(e.n == item.n){
      //       item.following = true;
      //     }
      //   })
      // });

      // console.log(ar2)

      const ar1 = this.usersFollowing;
      const ar2 = this.usersData;

      var filter = ar2.filter((item) => {
        ar1.find((e) => {
          if (e.email == item.email) {
            item.following = true;
          }
        });
      });

      this.users = ar2;
    },
  },
  async created() {
    await this.getUsers();
    await this.getFollowing();
    this.filterFollowing();
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
  },
};
</script>

<style scoped>
.box {
  max-width: 550px;
}
</style>
