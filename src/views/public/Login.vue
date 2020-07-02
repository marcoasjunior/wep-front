<template>
  <div>
    <div class="center content-inputs">
      <vs-button to="/" color="primary" type="border" icon="search">Voltar</vs-button>
      <vs-row>
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
          <p class="title">Entrar</p>
          <p class="subtitle">Digite suas credenciais</p>
        </vs-col>
      </vs-row>
      <vs-row>
          <vs-input id="input1" class="input" icon-no-border icon="account_circle" label-placeholder="E-mail" v-model="email"/>
     </vs-row>
     <vs-row>
        <vs-input class="input" icon-no-border icon="account_circle" label-placeholder="Password" type="password" v-model="password"/>
        </vs-row>
      <vs-row>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center">
      <vs-button color="primary" class="button" type="gradient">Entrar</vs-button>
      </vs-col>
    </vs-row>
    </div>
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

.title {

  font-size: xx-large;

}

.subtitle {

  font-size: medium;

}

.input {

  margin: 9px;
  margin-left: auto;
  margin-right: auto;

}

.button {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10%;
}

#input1 {

  margin-top: 10%;

}

</style>
