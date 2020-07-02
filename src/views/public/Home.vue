<template>
  <v-container class="d-flex flex-column justify-center align-center">

    <img alt="Vue logo" src="../../assets/logo.png">

    <v-container class="d-flex flex-column justify-center align-center">

    <v-btn class="button" to="/Login" block>Entrar</v-btn>

    <v-btn class="button" to="/Register" block>Cadastro</v-btn>

    </v-container>

  </v-container>
</template>

<script>

export default {

  name: 'Home'

}
</script>

<style scoped>

.button {

  margin-top: 10px;

}

</style>
