<template>
  <div>
    <v-list-item>
      <v-list-item-avatar color="orange">
        <v-icon v-if="userData.avatar == null">mdi-account-circle</v-icon>
        <v-img v-else :src="userData.avatar"></v-img>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title v-text="userData.name"></v-list-item-title>
        <v-list-item-title v-text="userData.id"></v-list-item-title>
      </v-list-item-content>

      <v-list-item-action v-if="userData.following == true">
        <v-btn v-if="!loading" depressed small color="#00CA9D" @click="unfollow(userData)">
          Seguindo
        </v-btn>
        <v-btn v-else loading depressed small color="#00CA9D"> Seguindo </v-btn>
      </v-list-item-action>
      <v-list-item-action v-else>
        <v-btn
          v-if="!loading"
          depressed
          small
          color="#00CA9D"
          @click="follow(userData)"
        >
          Seguir
        </v-btn>
        <v-btn v-else loading depressed small color="#00CA9D"> Seguir </v-btn>
      </v-list-item-action>
    </v-list-item>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: ["userData"],
  data: () => ({
    following: false,
    loading: false,
  }),

  methods: {
    ...mapActions({
      doFollow: "FollowVuex/doFollow",
      doUnFollow: "FollowVuex/doUnFollow",
    }),

    async follow(user) {
      this.loading = true;

      const follow = await this.doFollow(user.id);

      this.loading = false;

      user.following = true;
    },

    async unfollow(user){
      this.loading = true;

      const unfollow = await this.doUnFollow(user.id);

      this.loading = false;

      user.following = false;
    },

    teste() {
      console.log();
    },
  },

  created() {
    // this.teste();
    // this.index();
  },
};
</script>

<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>