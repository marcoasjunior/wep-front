<template>
  <v-row class="ac">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template class="d-flex align-center" v-slot:activator="{ on, attrs }">
        
        <v-btn 
          class="mr-auto ml-auto" 
          v-bind="attrs" 
          color="orange" 
          dark v-on="on"
        >EDITAR</v-btn>
      
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
                <v-expansion-panels multiple>
                  <v-expansion-panel>
                    <v-expansion-panel-header>Alterar senha</v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-col cols="12">
                        <v-text-field
                          label="Nova senha*"
                          v-model="passwords.newPassword"
                          type="password"
                          clearable
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="Confirmar senha*"
                          v-model="passwords.passwordConfirm"
                          type="password"
                          clearable
                        ></v-text-field>
                      </v-col>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error darken-1" text @click="dialog = false">Cancelar</v-btn>
          <v-btn :loading="apiLoading" color="blue darken-1" @click="updateUserData" text>Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  props: ["user_data", "updateUser", "updateAvatar"],

  data: () => ({
    dialog: false,

    newAvatar: '',

    passwords: {
      newPassword: "",
      passwordConfirm: "",
    },
  }),

  computed:{
    ...mapGetters({
      apiLoading: 'apiLoading'
    })
  },

  methods: {
    // ...mapActions({
    //   updateUser: 'ProfileVuex/updateUser'
    // }),

    formValidation(){
      if(this.user_data.name == "" || this.user_data.email == "" || this.user_data.whatsapp == ""){
        return false;
      };

      return true;
    },

    async pickAvatar() {
      this.$refs.fileInput.click();
    },

    onFilePicked(event) {
      const files = event.target.files;
      let fileName = files[0].filename;
      this.imageData = event.target.files[0];

      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.user_data.avatar = fileReader.result;
        this.newAvatar = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
    },

    async uploadPhoto() {
      const fd = new FormData();
      fd.append("photo", this.imageData);

      const url = await this.updateAvatar(fd);

      return url;
    },

    async updateUserData() {

      if(!this.formValidation()){
        this.$toast.error("Verifique se existe algum campo vazio", "Atenção!", {
            position: "topCenter",
        });

        return;
      }

      let newUser = {
        avatar: this.newAvatar,
        name: this.user_data.name,
        email: this.user_data.email,
        password: "",
        whatsapp: this.user_data.whatsapp
      };

      if(newUser.avatar != ""){
        this.$store.commit('setApiLoading', true)
        const url = await this.uploadPhoto();
        newUser.avatar = url;
      }

      if (
        this.passwords.newPassword !== "" &&
        this.passwords.passwordConfirm !== ""
      ) {
        if (this.passwords.newPassword === this.passwords.passwordConfirm) {
          newUser.password = this.passwords.newPassword;
        } else {
          this.$toast.error("Confirme a senha corretamente.", "Atenção!", {
            position: "topCenter",
          });
          return;
        }
      }

      const retorno = await this.updateUser(newUser);

      if (retorno) {
        this.$toast.success("Informações atualizadas com sucesso!", "Yeah", {
          position: "topCenter",
        });
        this.$store.commit('setApiLoading', false)
        this.dialog = false;
        localStorage.token = retorno;

      } else  {
        this.$store.commit('setApiLoading', false)

        this.$toast.error("Aconteceu um erro.", "Error!", {
          position: "topCenter",
        });
      }
    },
  },
};
</script>