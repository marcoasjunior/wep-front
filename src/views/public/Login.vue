<template>
  <div>
    <v-text-field prepend-icon="email" v-model="email" label="E-mail" required></v-text-field>

    <v-text-field prepend-icon="lock" v-model="password" label="Senha" required></v-text-field>
  </div>
</template>

<script>

export default {

  name: 'Login',

  data () {
    return {
      password: null,
      email: null
    }
  }

}
</script>

<style scoped>

</style>
