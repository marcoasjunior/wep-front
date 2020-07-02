<template>
  <div>
    <div class="center content-inputs">
      <vs-button icon to="/">
        <i class='bx bx-home-alt'></i>
      </vs-button>
      <vs-row>
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
          <p class="title">Entrar</p>
          <p class="subtitle">Digite suas credenciais</p>
        </vs-col>
      </vs-row>
      <vs-row>
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
          <vs-input id="input1" class="input" icon-no-border icon="account_circle" label-placeholder="E-mail" v-model="value7"/>
        </vs-col>
      </vs-row>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
        <vs-input class="input" icon-no-border icon="account_circle" label-placeholder="Password" type="password" v-model="value7"/>
      </vs-col>
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

  name: 'Login'

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

  width: 300px;
  margin: 9px;
  margin-left: auto;

}

.button {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50%;
}

#input1 {

  margin-top: 50%;

}

</style>
