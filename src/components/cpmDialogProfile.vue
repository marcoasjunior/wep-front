<template>
  <v-row class="ac">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on">EDITAR</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Edite suas informações</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <div class="d-flex ac justify-center">
                <input
                  @change="onFilePicked"
                  type="file"
                  class="hiden-input"
                  ref="fileInput"
                  accept="image/*"
                />

                <v-avatar @click="pickAvatar" class="mt-1 mb-5 cp" size="80">
                  <img :src="user_data.avatar" alt="avatar" />
                </v-avatar>
              </div>
              <v-col cols="12">
                <v-text-field label="Nome*" v-model="user_data.name" clearable required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Email*" v-model="user_data.email" clearable required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Whatsapp*"
                  v-model="user_data.whatsapp"
                  type="number"
                  clearable
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-expansion-panels v-model="panel" :disabled="disabled" multiple>
                  <v-expansion-panel>
                    <v-expansion-panel-header>Alterar senha</v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-col cols="12">
                        <v-text-field
                          label="Senha antiga*"
                          
                          type="password"
                          clearable
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="Nova senha*"
                         
                          type="password"
                          clearable
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="Confirmar senha*"
                          
                          type="password"
                          clearable
                          required
                        ></v-text-field>
                      </v-col>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Cancelar</v-btn>
          <v-btn color="blue darken-1" @click="update" text>Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: ["user_data"],

  data: () => ({
    dialog: false,
  }),

  methods: {
    async pickAvatar() {
      this.$refs.fileInput.click();
    },
    async onFilePicked(event) {
      const files = event.target.files;
      let fileName = files[0].filename;

      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.user_data.avatar = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
    },

    async update() {
        
    },
  },
};
</script>