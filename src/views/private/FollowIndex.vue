<template>
  <v-container class="box">
    <v-row class="d-flex flex-column ">
      <v-col>
        <v-col ref="form" class="d-flex flex-column">
          <h2 class="ac">Encontre amigos</h2>
          <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
           
            ></v-text-field>
          </v-card-title>

          <strong class="mb-5">Pessoas que talvez você conheça</strong>

          <cpmUserFollow/>

          <v-btn class="button mt-5" color="warning" block>Entrar</v-btn>
        </v-col>
        
      </v-col>

      
    </v-row>
  </v-container>
</template>

<script>
import cpmUserFollow from '../../components/cpmUserFollow';

export default {
  components: {cpmUserFollow},
  data() {
    return {
      search: ''
    }
  },
}
</script>

<style scoped>
.box {
  max-width: 550px;
}


</style>
