<template>
    <div>
        <ToolBar/>

        <h1 class="alg-txt-c">CRIAR EVENTO</h1>


        <div>


            <!-- <v-badge
                bordered bottom
                color="deep-purple accent-4"
                dot offset-x="10" offset-y="10"
            >
                <v-avatar size="50">
                <v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"></v-img>
                </v-avatar>
            </v-badge> -->


         <v-card class="p10 ac" max-width="600">
            {{ EventData }}
            <div>
                <div class="card-style-1">

                  <span class="ac drop-input" align="center">
                    <v-icon color="black" dark left>mdi-camera</v-icon>
                    <p>Adicione uma imagem ao seu evento</p>
                  </span>

                  <span class="hiden-input">
                    <input type="file">
                  </span>

                  <span class="card-footer">
                    
                    <v-text-field
                      v-model="EventData.nameEvent"
                      :rules="nameRules"
                      :counter="10"
                      label="Nome do evento"
                    ></v-text-field>
                  </span>

                  <small class="p15">Criado por</small>

                </div>

                <!-- <v-file-input v-model="fileInput" multiple label="File input"></v-file-input> -->
            </div>

            <v-form class="mt-7 mb-3" v-model="EventData">

                <v-textarea
                  v-model="EventData.description"
                  solo
                  name="input-7-4"
                  label="Descrição do evento"
                ></v-textarea>

                 <v-btn 
                  class="ml-2"
                  rounded
                  color="primary"
                  :outlined="active == 1"
                  dark
                  @click="active = 0"
                >
                  Público
                </v-btn>

                 <v-btn 
                  class="ml-2" 
                  rounded 
                  color="primary" 
                  :outlined="active == 0" 
                  dark
                  @click="active = 1"
                >
                  Privado
                </v-btn>


                <p class="p15" v-if="active == 0">
                  Eventos públicos são visíveis para todos os usuários do wep app, é possível mudar as configurações do evento caso queira na seção de opções.
                </p>

                <p class="p15" v-if="active == 1">
                  Eventos Privados aparecem no feed porem sua informações são reservadas para os convidados do evento, é possível mudar as configurações do evento caso queira.
                </p>

              <h2 class="p15">Local do evento:</h2>

                <div class="p15">
                    <SetMap/>
                </div>
                <!-- <l-map ref="myMap"> </l-map> -->

                <div class="p15 ac mw-w-70">

                  <h2 class="p15">Adicionar Tag para o evento:</h2>

                  <v-select
                    v-model="value"
                    :items="items"
                    chips
                    color="purple"
                    item-value="_id" item-text="name"
                    label="Chips"
                    multiple
                    solo
                  ></v-select>
                </div>


                  <v-row align="center">
                      <v-col class="text-center" cols="1" sm="12">
                            <v-btn
                              align="center"
                              class="ml-2" 
                              rounded 
                              color="orange" 
                              outlined 
                              dark
                            >
                              Criar evento
                            </v-btn>
                      </v-col>
                  </v-row>

                <!-- <v-date-picker v-model="EventData.date"></v-date-picker> -->

    
            </v-form>
        </v-card>
        </div>


      <div class="mx-3"></div>
    </div>
</template>
<script>
import ToolBar from '@/components/cpmToolBar'
import SetMap from '../../components/cpmSetMapPoints'

export default {
    components: {
        ToolBar,
        SetMap
    },
    data:() => ({
        fileInput:'',

        active:0,

        valid: null,
        date: null,
        menu: false,

        EventData:{
            nameEvent:'',
            private:false,
            date:'',
            description:'',
        },

        nameRules: 
        [
            v => !!v || 'Obrigátorio preencher',
            v => (v && v.length <= 10) || 'Name must be less than 10 characters',
        ],

        items:[
          {_id:'0', name:'Fluxo'},
          {_id:'1', name:'Rock'},
          {_id:'2', name:'Baile'},
          {_id:'3', name:'Luau'},
          {_id:'4', name:'Eletrônica'},
          {_id:'5', name:'Bar'},
        ]
    }),

    mounted() {
        
    },

    methods: {
      save (date) {
        this.$refs.menu.save(date)
      },
    


    },

}
</script>