<template>
  <div>
    <vs-button to="/" color="primary" type="border" icon="search">Voltar</vs-button>

    <vs-row>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
        <p>Preencha os dados abaixo:</p>
      </vs-col>
    </vs-row>
    <v-form v-model="valid">
      <v-container class="d-flex flex-column">

        <v-text-field v-model="name" label="Nome Completo" required></v-text-field>

        <v-text-field v-model="email" label="E-mail" required></v-text-field>

        <v-text-field v-model="password" label="Senha" required></v-text-field>

        <v-text-field v-model="password2" label="Confirmar senha" required></v-text-field>

        <v-file-input accept="image/*" label="File input"></v-file-input>

      </v-container>
    </v-form>

  </div>
</template>

<script>
export default {

  name: 'Register',
  data () {
    return {

    }
  }

}
</script>

<style scoped>

.input {

  margin: 9px;
  margin-left: auto;
  margin-right: auto;

}

</style>
