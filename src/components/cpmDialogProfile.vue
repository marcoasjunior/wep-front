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
// import {mapActions} from 'vuex';

export default {
  props: ["user_data", "updateUser"],

  data: () => ({
    dialog: false,
   
    passwords: {
      newPassword: '',
      passwordConfirm: ''
    }  
  }),

  methods: {
    // ...mapActions({
    //   updateUser: 'ProfileVuex/updateUser'
    // }),

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

    //TODO fazer update no avatar do user
    async update(){
   
      let newUser =  {
        avatar: this.user_data.avatar,
        name: this.user_data.name,
        email: this.user_data.email,
        password: "",
        whatsapp: this.user_data.whatsapp
      };

      if(this.passwords.newPassword !== '' && this.passwords.passwordConfirm !== ''){
        if(this.passwords.newPassword === this.passwords.passwordConfirm){
          newUser.password = this.passwords.newPassword;
        }else{
          this.$toast.error('Confirme a senha corretamente.', 'Atenção!', {position: 'topCenter'})
          return;
        };
      };

      const retorno = await this.updateUser(newUser);

      if(retorno){
        this.$toast.success('Informações atualizadas com sucesso!', 'Yeah',  {position: 'topCenter'});
        this.dialog = false
      }else{
        this.$toast.error('Aconteceu um erro.', 'Error!', {position: 'topCenter'})
      }
    
      console.log(newUser)
    }
  },
};
</script>