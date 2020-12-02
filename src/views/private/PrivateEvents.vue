<template>
  <div>
    <ToolBar />

    <v-container v-if="apiLoading" style="height: 400px">
      <v-row class="fill-height" align-content="center" justify="center">
        <v-col class="subtitle-1 text-center" cols="12">
          Carregando eventos...
        </v-col>
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

      <div v-if="filteredEventsByPrivacy == '' && !apiLoading">
        <h1 class="alg-txt-c mt-14">nenhum evento foi encontrado 😥</h1>
    </div>


    <div
      v-else
      class="p15 mt-10 ac"
      v-for="(item, i) in filteredEventsByPrivacy"
      :key="i"
    >
      <cpmCard :cardData="item" />
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import ToolBar from "@/components/cpmToolBar";
import cpmCard from "@/components/cpmCard";

export default {
  components: {
    ToolBar,
    cpmCard,
  },

  data: () => ({
    following: "",
    followers: "",
    followersArrayId: "",
    filteredEventsByPrivacy: "",
  }),

  async created() {
    this.$store.commit("setApiLoading", true);

    await this.getPrivatedEvents();
    await this.getAllFollowing();

    this.$store.commit("setApiLoading", false);
  },

  computed: {
    ...mapGetters({
      userData: "FeedVuex/userData",
      cardsEventDataPrivated: "FeedVuex/cardsEventDataPrivated",
      apiLoading: "apiLoading",
    }),
  },

  methods: {
    ...mapActions({
      getPrivatedEvents: "FeedVuex/getPrivatedEvents",
      getFollowing: "ProfileVuex/getFollowing",
      getFollowers: "ProfileVuex/getFollowers",
    }),

    async index() {
      await this.getPrivatedEvents();
      await this.getAllFollowing();
    },

    async getAllFollowing() {
      let responseFollowing = await this.getFollowing();
      let responseFollowers = await this.getFollowers();

      this.following = responseFollowing;
      this.followers = responseFollowers;
      this.getFollowersId();
      this.filterEventsByFollowers();
    },

    getFollowersId() {
      let result = this.followers.map((item) => {
        return item.id;
      });
      this.followersArrayId = result;
      // console.log(result)
    },

    filterEventsByFollowers() {
      // console.log("!@#$%¨&*()")
      //   console.log(this.cardsEventData)
      let filteredEventList = this.cardsEventDataPrivated.filter((item) => {
        return this.followersArrayId.includes(item.user.id);
      });
      // console.log(filteredEventList)

      this.filteredEventsByPrivacy = filteredEventList;
    },
  },

  watch: {
    cardsEventDataPrivated() {
      if (this.cardsEventDataPrivated != "") {
        this.filterEventsByFollowers();
      }
    },
  },
};
</script>