<template>
  <v-container class="d-flex flex-column box justify-space-between">

    <v-btn to="/Home" icon fab><v-icon>mdi-arrow-left</v-icon></v-btn>

    <v-container class="d-flex flex-column justify-center align-center mt-14">

    <p class="display-1">Entrar</p>

    <v-text-field class="input" prepend-icon="mdi-email" v-model="email" label="E-mail" required></v-text-field>

    <v-text-field class="input" prepend-icon="mdi-lock" v-model="password" label="Senha" required></v-text-field>

    <v-btn color="warning" @click="login" class="mt-14 button"> Entrar </v-btn>

    </v-container>

  </v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {

  name: 'Login',

  data () {
    return {
      password: null,
      email: null
    }
  },

  ...mapActions({
    authorizeLogin: 'RegisterVuex/authorizeLogin'

  }),

  methods: {
    async login () {
      if (this.password === null || this.email === null) return alert('Preencha os campos e-mail e senha.')

      const isAuth = this.authorizeLogin({

        password: this.password,
        email: this.email

      })

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
