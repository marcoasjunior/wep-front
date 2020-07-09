<template>
  <!-- <v-card
    class="mx-auto overflow-hidden"
    height="400"
  > -->
<div class="toolBardiv">
    <v-app-bar color="deep-purple" dark max-width="800" class="ac">
        <div class="d-flex flex-row justify-space-between">

        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

        <v-toolbar-title></v-toolbar-title>
      
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
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item>

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
    }),
  }
</script>