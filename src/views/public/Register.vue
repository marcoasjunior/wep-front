<template>
  <v-container class="box">
    <v-row class="d-flex flex-column">
      <v-btn to="/" class="" text fab small>
        <v-icon dark>mdi-arrow-left</v-icon>
      </v-btn>
      <v-col class="d-flex justify-center align-center">
        <v-avatar color="orange" size="62">
          <v-icon class="cp" @click="onFileSelected" v-if="!src" dark>mdi-account-circle</v-icon>
          <img v-else :src="src" alt="avatar">
          <input @change="onFilePicked" type="file" class="hiden-input" ref="fileInput" accept="image/*">
        </v-avatar>
      </v-col>
      <v-col>
        <v-form ref="form" class="d-flex flex-column">

          <!-- <v-file-input accept="image/*" label="Avatar" @change="onFileChange($event)" v-model="form.avatar">
          </v-file-input> -->

          <v-text-field prepend-icon="mdi-account" v-model="form.name" label="Nome Completo" required></v-text-field>

          <v-text-field prepend-icon="mdi-email" v-model="form.email" label="E-mail" required></v-text-field>

          <v-text-field prepend-icon="mdi-lock" v-model="password2" label="Senha" required></v-text-field>

          <v-text-field prepend-icon="mdi-lock" v-model="form.password" label="Confirmar senha" required>
          </v-text-field>

          <v-text-field prepend-icon="mdi-whatsapp" v-model="form.whatsapp" label="Whatsapp" required></v-text-field>

          <v-switch v-model="switch1" inset label="Concorda com os termos e condições do aplicativo."></v-switch>

          <div class="d-flex justify-center align-center">
            <v-btn v-if="!loading" block color="orange" @click="sendForm"> Cadastrar</v-btn>
            <v-progress-circular v-else indeterminate color="primary"></v-progress-circular>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {
  mapActions
} from 'vuex'
import uploadImageToFirebase from '../../util/firebase'
import axios from 'axios';

export default {

  name: 'Register',

  data() {
    return {

      switch1: false,

      uploadUrl:process.env.VUE_APP_UPLOAD_URL,


      form: {

        name: null,
        email: null,
        password: null,
        whatsapp: null,
        avatar: null

      },

      src: null,
      targetFile: null,
      loading: null,
      password2: null,

    }
  },

  methods: {

    ...mapActions({

      register: 'RegisterVuex/register'

    }),
    onFileSelected(){
      this.$refs.fileInput.click()
    },

    async onFilePicked(event){
      // this.onFileChange(event)
      const files = event.target.files
      this.targetFile =  event.target.files[0]
      
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => { this.src = fileReader.result })
      fileReader.readAsDataURL(files[0])
    },

    onFileChange(e) {
      this.src = URL.createObjectURL(this.form.avatar);
      console.log(this.src)
    },


    async sendForm() {

      this.validation()

      const fd = new FormData();
      fd.append('photo', this.targetFile);
      
      const uploadedFile = await axios.post(this.uploadUrl + '/upload/image', fd).then(resp => { this.form.avatar = resp.data })
      this.form.avatar = uploadedFile
      // this.loading = true

      this.$toast.info('Estamos fazendo seu registo.', 'Hey', {
        position: "topCenter"
      })

      console.log(this.form)

      const register = await this.register(this.form)

      if (register) {

        this.$toast.success('Registro efetuado!', 'Hey', {
          position: "topCenter"
        })

        this.$router.push('/')


      } else {

        this.$toast.error('Erro no registro!', 'Putz', {
          position: "topCenter"
        })

      }

      this.loading = false

      this.clearData()

    },

    validation() {

      if (this.switch1 === false) throw alert('Deve aceitar as condições.')
      if (this.password2 !== this.form.password) throw alert('As senhas devem ser iguais.')
      if (!this.form.name || !this.form.password || !this.form.email || !this.form.whatsapp) throw alert('Todos os campos devem ser preenchidos3')

    },

    clearData() {

      this.form.name = null
      this.form.email = null
      this.form.password = null
      this.form.whatsapp = null
      this.form.avatar = null

    },
  }
}
</script>

<style scoped>

.box {
  max-width: 550px;
}


</style>
