<template>
  <v-container class="d-flex flex-column justify-center align-center box">

    <img alt="Vue logo" src="../../assets/logo.png">

    <v-container class="d-flex flex-column justify-center align-center">

      <div class="mw-80">
        <v-btn class="button" color="warning" to="/Login" block>Entrar</v-btn>

        <v-btn class="button" color="warning" to="/Register" block>Cadastro</v-btn>
      </div>

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

.box {
  max-width: 550px;
}

</style>
