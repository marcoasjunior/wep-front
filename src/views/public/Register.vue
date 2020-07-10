<template>
  <v-container class="box">
    <v-row class="d-flex flex-column">

      <v-btn to="/" class="" text fab small>
        <v-icon dark>mdi-arrow-left</v-icon>
      </v-btn>
      <v-col class="d-flex justify-center align-center">
        <v-avatar color="orange" size="62">
          <v-icon dark>mdi-account-circle</v-icon>
        </v-avatar>
      </v-col>
      <v-col>
        <v-form ref="form" class="d-flex flex-column">

          <v-file-input accept="image/*" label="Avatar" v-model="form.img"></v-file-input>

          <v-text-field prepend-icon="mdi-account" v-model="form.name" label="Nome Completo" required></v-text-field>

          <v-text-field prepend-icon="mdi-email" v-model="form.email" label="E-mail" required></v-text-field>

          <v-text-field prepend-icon="mdi-lock" v-model="password" label="Senha" required></v-text-field>

          <v-text-field prepend-icon="mdi-lock" v-model="form.password2" label="Confirmar senha" required></v-text-field>

          <v-text-field prepend-icon="mdi-whatsapp" v-model="form.whatsapp" label="Whatsapp" required></v-text-field>

          <v-switch v-model="switch1" inset label="Concorda com os termos e condições do aplicativo."></v-switch>

          <v-btn block color="orange" @click="sendForm">Cadastrar</v-btn>
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
      
      password: null,
      

    }
  },

  methods: {

    ...mapActions({

      register: 'RegisterVuex/register'

    }),

    async sendForm () {

      if (!this.validation()) return alert('Todos os campos devem ser preenchidos')

      const register = this.register(this.form)

      console.log(register)   
       
    },

    validation() {

      if (this.switch1 === false) return false
      if (this.password !== this.form.password2) return false
      if (!this.form.name || !this.password || !this.form.email || !this.form.whatsapp) return false

      return true

    }
  }

}
</script>

<style scoped>

.box {
  max-width: 550px;
}


</style>
