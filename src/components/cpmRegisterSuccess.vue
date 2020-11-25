<template>
  <v-container class="box">
    <v-row class="d-flex flex-column">
      <v-icon size="100" color="green"> mdi-check </v-icon>
      <v-col class="alg-txt-c">
        <p style="font-size: 25px">Bem vindo ao app, aproveite!</p>
      </v-col>
      <v-col>
        <v-btn block color="orange" to="/Follow">Entrar</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.box {
  max-width: 550px;
}
</style>