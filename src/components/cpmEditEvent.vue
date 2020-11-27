<template>
  <v-row class="ac">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="orange" dark v-bind="attrs" v-on="on" icon>
          <v-icon>mdi-folder-edit</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Edite as informações do evento</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  color="orange"
                  label="Titulo*"
                  clearable
                  required
                  v-model="data.title"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  name="input-7-4"
                  color="orange"
                  label="Descrição*"
                  clearable
                  required
                  v-model="data.description"
                ></v-textarea>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  class="mt-8"
                  type="tel"
                  v-mask="'##/##/####'"
                  v-model="data.eventDate"
                  label="Data do evento*"
                  color="orange"
                  :counter="10"
                ></v-text-field>
              </v-col>
              <v-col cols="12"> </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error darken-1" text @click="dialog = false"
            >Cancelar</v-btn
          >
          <v-btn
            :loading="apiLoading"
            color="orange"
            text
            >Salvar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: ["data"],
  data: () => ({
    dialog: false,
  }),
  computed: {
    ...mapGetters({
      apiLoading: "apiLoading",
    }),
  },
};
</script>