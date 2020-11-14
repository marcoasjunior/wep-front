<template>
  <div class="">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template class="d-flex align-center" v-slot:activator="{ on, attrs }">
        <v-btn
          small
          depressed
          class="mr-auto ml-auto"
          v-bind="attrs"
          v-on="on"
          color="#00CA9D"
          >Seguindo</v-btn
        >
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Você segue</span>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error darken-1" text @click="dialog = false"
            >Cancelar</v-btn
          >
          <!-- <v-btn :loading="apiLoading" color="blue darken-1" @click="updateUserData" text>Salvar</v-btn> -->
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
  }),
};
</script>