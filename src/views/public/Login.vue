<template>
  <v-container class="d-flex flex-column box justify-space-between">

    <v-btn to="/Home" icon fab>
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>

    <v-container class="d-flex flex-column justify-center align-center mt-14">

      <p class="display-1">Entrar</p>

      <v-text-field class="input" prepend-icon="mdi-email" v-model="email" label="E-mail" required></v-text-field>

      <v-text-field class="input" prepend-icon="mdi-lock" v-model="password" label="Senha" required></v-text-field>

      <v-btn color="warning" @click="login" class="mt-14 button"> Entrar </v-btn>

    </v-container>

  </v-container>
</template>

<script>

import {
  mapActions
} from 'vuex'

export default {

  name: 'Login',

  data() {
    return {
      password: null,
      email: null
    }
  },

  created() {
    // if (localStorage.token) {
    //   this.checkToken();
    // }
  },

  methods: {

    ...mapActions({

      authLogin: 'LoginVuex/authLogin',
      authToken: 'LoginVuex/authToken',

    }),

    async login() {
      if (this.password === null || this.email === null) return alert('Preencha os campos e-mail e senha.')

      const isAuth = await this.authLogin({

        password: this.password,
        email: this.email

      }).catch(() => this.$toast.error('Problema com usuário e/ou senha', 'Putz', {
        position: "topCenter"
      }))

      if (isAuth) {
        this.$toast.success('Logado!', 'Hey', {
          position: "topCenter"
        })

        // localStorage.token = isAuth.data[0]

        const token = isAuth.data[0];

        localStorage.token = isAuth.data[0];

        this.$router.push('/Feed')
      }
    },

    async checkToken() {

      const isAuth = await this.authToken();

      if (isAuth != false) {
        this.$toast.success('Logado!', 'Hey', {
          position: "topCenter"
        })

        this.$router.push('/Feed')
      }

      console.log(isAuth)
    }
  }
}
</script>

<style scoped>

.input {
  width: 90%;
}

.button {
  width: 90%;
}

.box {
  max-width: 550px;
}

</style>
