<template>
  <div>
      <v-btn to="/" class="" text fab small color="primary">
        <v-icon dark>mdi-arrow-left</v-icon>
      </v-btn>

    <v-form class="d-flex flex-column">

        <v-file-input accept="image/*" label="Avatar"></v-file-input>

        <v-text-field prepend-icon="mdi-account" v-model="name" label="Nome Completo" required></v-text-field>

        <v-text-field prepend-icon="mdi-email" v-model="email" label="E-mail" required></v-text-field>

        <v-text-field prepend-icon="mdi-lock" v-model="password" label="Senha" required></v-text-field>

        <v-text-field prepend-icon="mdi-lock" v-model="password2" label="Confirmar senha" required></v-text-field>

        <v-text-field prepend-icon="mdi-whatsapp" v-model="whatsapp" label="Whatsapp" required></v-text-field>

        <v-switch v-model="switch1" inset label="Concorda com os termos e condições do aplicativo."></v-switch>

        <v-btn block>Cadastrar</v-btn>

    </v-form>

  </div>
</template>

<script>

import mapActions from 'vuex'

export default {

  name: 'Register',

  data () {
    return {

      switch1: false,
      name: null,
      email: null,
      password: null,
      password2: null,
      whatsapp: null

    }
  },

  methods: {

    ...mapActions({

        

    }),

    register () {

    }
  }

}
</script>

<style scoped>

</style>
