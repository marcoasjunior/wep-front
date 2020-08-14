<template>
  <div>
    <Toolbar />

    <h1 class="alg-txt-c">EDITAR INFORMAÇÔES</h1>

    <div>
      <v-card class="p10 ac" max-width="600">
        <v-card class="mx-auto" max-width="500">
          <v-list-item three-line>
            <v-list-item-content>
              <!-- <div class="overline mb-4">OVERLINE</div> -->
              <v-list-item-title class="headline mb-1">{{user_data.name}}</v-list-item-title>
              <v-list-item-subtitle>{{user_data.email}}</v-list-item-subtitle>
              <v-list-item-subtitle>{{user_data.whatsapp}}</v-list-item-subtitle>
            </v-list-item-content>

            <v-avatar title size="80" color="grey">
              <img :src="user_data.avatar" alt="avatar" />
            </v-avatar>
          </v-list-item>

          <v-card-actions>
            <!-- <v-btn text>Editar</v-btn> -->
            <!-- <v-btn text></v-btn> -->
            <Dialog :user_data="user_data"/>
          </v-card-actions>
        </v-card>

        <div>
          <v-col class="text-center mt-7" cols="1" sm="12">
            <v-btn align="center" class="ml-2" color="red" dark>SAIR</v-btn>
          </v-col>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import Toolbar from "@/components/cpmToolBar";
import SetMap from "../../components/cpmSetMapPoints";
import Dialog from '@/components/cpmDialogProfile';

import {mapActions} from 'vuex';

export default {
  components: {
    Toolbar,
    SetMap,
    Dialog
  },

  data: () => ({
      user_data: {
          avatar: '',
          name: '',
          email: '',
          password: '',
          whatsapp: ''
      }
  }),

  methods: {
      ...mapActions({
          getUser: 'ProfileVuex/getUser'
      }),

      async loadUser(){
          const user = await this.getUser();

          this.user_data.avatar = user.avatar;
          this.user_data.name = user.name;
          this.user_data.email = user.email;
          this.user_data.password = user.password;
          this.user_data.whatsapp = user.whatsapp;
      }
  },

  created(){
      this.loadUser()
  }
};
</script>