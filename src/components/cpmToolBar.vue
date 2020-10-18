<template>
  <!-- <v-card
    class="mx-auto overflow-hidden"
    height="400"
  > -->
<div class="toolBardiv">
    <v-app-bar color="deep-purple" dark max-width="800" class="ac">
        <div class="d-flex flex-row justify-space-between mw-w-100">

        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

        <!-- <v-toolbar-title> -->
                <div class="ml-a cp">
                    <v-badge
                        bordered bottom
                        color="deep-purple accent-4"
                        dot offset-x="10" offset-y="10"
                    >
                    
                        <v-avatar size="50" @click="$router.push('/Profile')">
                            <v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"></v-img>
                        </v-avatar>

                    </v-badge>
                </div>
        <!-- </v-toolbar-title> -->
      
        </div>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item exact to="/Feed">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Feed</v-list-item-title>
          </v-list-item>

          <v-list-item exact to="/Event">
            <v-list-item-icon>
              <v-icon>mdi-book-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Eventos</v-list-item-title>
          </v-list-item>

          <v-list-item exact to="/Profile">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Perfil</v-list-item-title>
          </v-list-item>

          <div>
            <v-col align="center" class="mt-10">
              <v-btn @click="logOff" color="red" dark>SAIR</v-btn>
            </v-col>
          </div>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  <!-- </v-card> -->

</div>

</template>

<script>
  export default {
    data: () => ({
      drawer: false,
      group:null
    }),
    methods: {
      async logOff(){
        await localStorage.removeItem('token');
        await localStorage.removeItem('id');

        await this.$router.push('/')
      }
    }
  }
</script>