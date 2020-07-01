<template>
  <div class="home">
    <vs-row>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
      <img alt="Vue logo" src="../assets/logo.png">
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
      <vs-button color="primary" class="button" type="gradient">Entrar</vs-button>
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
      <vs-button color="primary" class="button" type="gradient">Cadastre-se</vs-button>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>

export default {

  name: 'Login'

}
</script>

<style scoped>

.button {
  width: 80%;
  margin: 10px;
}

img {
  margin-top: 20%;
}

</style>
