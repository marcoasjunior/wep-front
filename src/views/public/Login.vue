<template>
  <v-container class="d-flex flex-column box justify-space-between">

    <v-btn to="/Home" icon fab>
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>

    <v-container class="d-flex flex-column justify-center align-center">

    <img src="../../../public/img/icons/android-icon-192x192.png" alt="">

      <v-text-field class="input" prepend-icon="mdi-email" v-model="email" label="E-mail" required></v-text-field>

      <v-text-field class="input" prepend-icon="mdi-lock" v-model="password" label="Senha" required></v-text-field>

      <!-- <v-btn :loading="apiLoading" color="warning" @click="login" class="mt-14 button"> Entrar </v-btn> -->

      <div align="center">
        <v-btn :loading="apiLoading" class="ac mt-4" color="orange" @click="login" dark>Entrar</v-btn>
      </div>     

    </v-container>

  </v-container>
</template>

<script>

import {
  mapActions, mapGetters
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

  computed:{
    ...mapGetters({
      apiLoading: 'apiLoading'
    })
  },

  methods: {

    ...mapActions({

      authLogin: 'LoginVuex/authLogin',
      authToken: 'LoginVuex/authToken',

    }),

    async login() {
      this.$store.commit("setApiLoading", true);

      if (this.password === null || this.email === null) return alert('Preencha os campos e-mail e senha.')

      const isAuth = await this.authLogin({

        password: this.password,
        email: this.email

      }).catch(() => {
          this.$toast.error('Problema com usuário e/ou senha', 'Putz', {
            position: "topCenter"
          })
          this.$store.commit("setApiLoading", false);
      })

      if (isAuth) {
        this.$toast.success('Logado!', 'Hey', {
          position: "topCenter"
        })


        // localStorage.token = isAuth.data[0]

        const token = isAuth.data[0];

        localStorage.token = isAuth.data[0];

        this.$router.push('/Feed');

        this.$store.commit("setApiLoading", false);
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
