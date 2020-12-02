<template>
  <v-container class="box">
    <v-row class="d-flex flex-column">
      <v-icon size="100" color="green"> mdi-check </v-icon>
      <v-col class="alg-txt-c">
        <p style="font-size: 25px">Wep seu evento!</p>
      </v-col>
      <v-col>

        <div align="center">
          <v-btn :loading="apiLoading" class="ac mt-4" color="orange" to="/Follow" dark>Entrar</v-btn>
        </div>     

      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.box {
  max-width: 550px;
}
</style>