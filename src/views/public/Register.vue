<template>
  <v-container class="box">
    <v-row class="d-flex flex-column">
      <v-btn to="/" class="" text fab small>
        <v-icon dark>mdi-arrow-left</v-icon>
      </v-btn>
      <v-col class="d-flex justify-center align-center">
        <v-avatar color="orange" size="62">
          <v-icon v-if="!src" dark>mdi-account-circle</v-icon>
          <img v-else :src="src" alt="avatar">
        </v-avatar>
      </v-col>
      <v-col>
        <v-form ref="form" class="d-flex flex-column">

          <v-file-input accept="image/*" label="Avatar" @change="onFileChange($event)" v-model="form.img">
          </v-file-input>

          <v-text-field prepend-icon="mdi-account" v-model="form.name" label="Nome Completo" required></v-text-field>

          <v-text-field prepend-icon="mdi-email" v-model="form.email" label="E-mail" required></v-text-field>

          <v-text-field prepend-icon="mdi-lock" v-model="password" label="Senha" required></v-text-field>

          <v-text-field prepend-icon="mdi-lock" v-model="form.password2" label="Confirmar senha" required>
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
import { mapActions } from 'vuex'

export default {

  name: 'Register',

  data () {
    return {

      switch1: false,

      form: {

      name: null,
      email: null,
      password2: null,
      whatsapp: null,
      img: null

      },

      src: null,
      loading: null,
      password: null,

    }
  },

  methods: {

    ...mapActions({

      register: 'RegisterVuex/register'

    }),

    onFileChange(e) {
            
            this.src = URL.createObjectURL(this.form.img);
        },

    async sendForm () {

      this.validation()
      
      this.loading = true

      this.$toast.info('Estamos fazendo seu registo.', 'Hey', {
            position: "topCenter"
          })

      const register = await this.register(this.form)

      
      if (register.data) {

        this.$toast.success('Registro efetuado!', 'Hey', {
            position: "topCenter"
          })

      } else {

        this.$toast.error('Erro no registro!', 'Putz', {
            position: "topCenter"
          })

      }

      this.loading = false 

      this.clearData()
       
    },

    validation() {

      if (this.switch1 === false) throw alert('Todos os campos devem ser preenchidos')
      if (this.password !== this.form.password2) throw alert('Todos os campos devem ser preenchidos')
      if (!this.form.name || !this.password || !this.form.email || !this.form.whatsapp) throw alert('Todos os campos devem ser preenchidos')

    },

    clearData() {

      this.form.name = null
      this.form.email = null
      this.form.password2 = null
      this.form.whatsapp = null
      this.form.img = null

    }
  }

}
</script>

<style scoped>

.box {
  max-width: 550px;
}


</style>
