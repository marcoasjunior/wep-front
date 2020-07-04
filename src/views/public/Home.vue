<template>
  <v-container class="d-flex flex-column justify-center align-center">

    <img alt="Vue logo" src="../../assets/logo.png">

    <v-container class="d-flex flex-column justify-center align-center">

    <v-btn class="button" to="/Login" block>Entrar</v-btn>

    <v-btn class="button" to="/Register" block>Cadastro</v-btn>

    <v-row align="center" class="ac">
      <v-col class="text-center" cols="12" sm="4">
        <v-btn class="button" to="/Event" block>Cadastrar evento</v-btn>
      </v-col>
    </v-row>

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
