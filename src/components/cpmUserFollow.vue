<template>
  <v-card max-width="550">
    <v-virtual-scroll :items="usersData" :item-height="70" height="350">
      <template v-slot:default="{ item }">
        <v-list-item>
          <v-list-item-avatar>
            <v-avatar color="orange" size="62">
              <v-icon v-if="!item.avatar" dark>mdi-account-circle</v-icon>
              <img v-else :src="item.avatar" alt="avatar" />
            </v-avatar>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn
              v-if="!item.following"
              class="ma-2"
              :loading="loading"
              :disabled="loading"
              color="#00CA9D"
              @click="follow(item)"
              depressed
              small
            >
              Seguir
            </v-btn>

            <v-btn
              v-else
              class="ma-2"
              :loading="loading"
              :disabled="loading"
              color="#00CA9D"
              depressed
              small
            >
              Seguindo
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <hr />
      </template>
    </v-virtual-scroll>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    following: false,
    loading: false,
  }),

  computed: {
    usersData() {
      let users = this.$store.state.FollowVuex.users;


      return users;
    },
  },

  methods: {
    ...mapActions({
      getUsers: "FollowVuex/getUsers",
      getFollowing: "FollowVuex/getFollowing",
      doFollow: "FollowVuex/doFollow",
    }),

    async follow(user) {
      this.loading = true;

      const follow = await this.doFollow(user.id);

      this.loading = false;

      this.following = true;
    },

    teste() {

    },
  },

  async created() {
    await this.getUsers();
    await this.getFollowing();
    // this.teste();
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