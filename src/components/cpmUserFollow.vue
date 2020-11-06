<template>
  <div>
    <v-list-item>
      <v-list-item-avatar color="orange">
        <v-icon v-if="userData.avatar == null">mdi-account-circle</v-icon>
        <v-img v-else :src="userData.avatar"></v-img>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title v-text="userData.name"></v-list-item-title>
      </v-list-item-content>

      
      <v-list-item-action v-if="userData.following">
        <v-btn v-if="!loading" depressed small color="#00CA9D">
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
  <!-- <v-card max-width="550">
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
  </v-card> -->
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
    }),

    async follow(user) {
      this.loading = true;

      const follow = await this.doFollow(user.id);

      this.loading = false;

      user.following = true
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