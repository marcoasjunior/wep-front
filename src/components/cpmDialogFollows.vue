<template>
  <div class="">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template class="d-flex align-center" v-slot:activator="{ on, attrs }">
        <a
          class="mr-auto ml-auto this"
          v-bind="attrs"
          v-on="on"
          small
          depressed
          color="#00CA9D"
          >{{ title }}</a
        >
      </template>
      <v-btn @click="dialog = false" class text fab small>
        <v-icon dark>mdi-close</v-icon>
      </v-btn>
      <!-- <v-card>
        <v-card-title>
          <span class="headline">Seus seguidores</span>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error darken-1" text @click="dialog = false"
            >Cancelar</v-btn
          >
          <v-btn :loading="apiLoading" color="blue darken-1" @click="updateUserData" text>Salvar</v-btn>
        </v-card-actions>
      </v-card> -->

      <v-tabs v-model="tab" fixed-tabs color="orange">
        <v-tab v-for="(item, i) in tabItems" :key="i" class="orange--text">
          {{ item }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-col max-width="500">
            <v-list subheader>
              <div v-for="user in data[0]" :key="user.id">
                <cpmUserFollow :userData="user" />
              </div>
            </v-list>

            <v-divider></v-divider>
          </v-col>
        </v-tab-item>

        <v-tab-item>
          <v-col max-width="500">
            <v-list subheader>
              <div v-for="user in data[1]" :key="user.id">
                <cpmUserFollow :userData="user" />
              </div>
            </v-list>

            <v-divider></v-divider>
          </v-col>
        </v-tab-item>
      </v-tabs-items>
    </v-dialog>
  </div>
</template>

<script>
import cpmUserFollow from "@/components/cpmUserFollow";

export default {
  props: ["follow", "data"],
  components: { cpmUserFollow },
  data: () => ({
    title: "",
    dialog: false,
    tab: "",
    tabItems: ["Seguindo", "Seguidores"],
  }),
  methods: {
    async index() {
      if (this.follow == 0) {
        this.tab = 0;
        this.title = "Seguindo";
      } else if (this.follow == 1) {
        this.tab = 1;
        this.title = "Seguidores";
      }
    },
  },
  async created() {
    this.index();
  },
};
</script>
<style>
.this:hover {
  text-decoration: underline;
}
</style>