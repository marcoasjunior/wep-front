<template>
  <div>
    <Toolbar />

    <h1 class="alg-txt-c">SUAS INFORMAÇÔES</h1>

    <div>
      <v-card class="p10 ac" max-width="600">
        <v-card class="mx-auto" max-width="600">
          <v-list-item three-line>
            <v-list-item-content>
              <!-- <div class="overline mb-4">OVERLINE</div> -->
              <v-list-item-title class="headline mb-1">{{user_data.name}}</v-list-item-title>
              <hr>
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
            <Dialog 
              :user_data="user_data"
              :updateUser="updateUser"
              />
          </v-card-actions>
        </v-card>

        <h2 class="alg-txt-s mt-5">SEUS EVENTOS</h2>

        <div v-for="event in events" :key="event.id">
          <EventCard class="mt-4" :cardData="event"/>
        </div>
        

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
import EventCard from '@/components/cpmCard';

import {mapActions} from 'vuex';

export default {
  components: {
    Toolbar,
    SetMap,
    Dialog,
    EventCard
  },

  data: () => ({
      user_data: {
          avatar: '',
          name: '',
          email: '',
          password: '',
          whatsapp: ''
      },
      
      events: []
  }),

  methods: {
      ...mapActions({
          getUser: 'ProfileVuex/getUser',
          updateUser: 'ProfileVuex/updateUser',
          getMyEvents: 'ProfileVuex/getMyEvents'
      }),

      async loadUser(){
          const user = await this.getUser();

          this.user_data.avatar = user.avatar;
          this.user_data.name = user.name;
          this.user_data.email = user.email;
          this.user_data.password = user.password;
          this.user_data.whatsapp = user.whatsapp;
      },

      async loadEvents(){
        const events = await this.getMyEvents();
      
        this.events = events;
      }
  },

  created(){
      this.loadUser();
      this.loadEvents()
  }
};
</script>