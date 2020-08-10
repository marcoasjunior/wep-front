<template>
    <div>
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
            <div>
                <div class="card-style-1">

                  <span class="ac drop-input" align="center">
                    <v-icon color="black" dark left>mdi-camera</v-icon>
                    <p>Adicione uma imagem ao seu evento</p>
                    <v-file-input @change="uploadPhoto" multiple label="File input"></v-file-input>
                  </span>


                  <!-- <span class="hiden-input">
                    <input type="file">
                  </span> -->

                  <span class="card-footer">
                    
            aqui: {{ eventForm.name }}

                    <v-text-field 
                        v-model="eventForm.name" 
                        label="Nome do evento" 
                        :rules="nameRules"
                        :error="false"
                        color="purple" 
                        :counter="40"
                    ></v-text-field>
                  </span>

                  <small class="p15">Criado por</small>

                </div>

                <!-- <v-file-input v-model="fileInput" multiple label="File input"></v-file-input> -->
            </div>

            <div class="mt-7 mb-3">

                <v-textarea
                  v-model="eventForm.description"
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
                  @click="typeEvent(0)"
                >
                  Público
                </v-btn>

                 <v-btn 
                  class="ml-2" 
                  rounded 
                  color="primary" 
                  :outlined="active == 0" 
                  dark
                  @click="typeEvent(1)"
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
                    <SetMap @callEmit="mapsParams"/>

                    <v-text-field 
                        v-model="eventForm.adress" 
                        label="Endereço"
                        :rules="nameRules"
                        :error="false"
                        color="purple"
                        :counter="40"
                    ></v-text-field>

                    <v-text-field 
                        v-model="eventForm.eventeDate" 
                        label="Data do evento"
                        :rules="dateRules"
                        :error="false"
                        color="purple" 
                        :counter="10"
                        type="text"
                    ></v-text-field>
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
                              @click="createEvent"
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

                <!-- <v-date-picker v-model="eventData.date"></v-date-picker> -->

    
            </div>
        </v-card>
        </div>
    </div>
</template>

<script>
import SetMap from './cpmSetMapPoints'
import {
  mapActions
} from 'vuex'
export default {

    components:{
            SetMap
    },

    data:() => ({
        fileInput:'',
        value:'',
        
        url:process.env.VUE_APP_BASE_URL,


        active:0,

        valid: null,
        date: null,
        menu: false,

        eventForm:{
            name:'',
            description:'',
            private:'',
            latitude:'',
            longitude:'',
            adress:'',
            eventeDate:'',
            img:''
        },

        name:'',

        eventData:'',

        // eventData:{
        //     nameEvent:'',
        //     private:'',
        //     date:'',
        //     description:'',
        // },

        nameRules: [
            value => !!value || 'Necessário.',
            value => (value && value.length < 41) || 'Necessário preencher com um valor válido.',
        ],

        dateRules: [
            value => !!value || 'Necessário.',
            value => (value && value.length <= 10) || 'Necessário preencher com um valor válido.',
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

    methods: {
        ...mapActions({
            createEvent: 'createEvent'
        }),

        save (date) {
            this.$refs.menu.save(date)
        },

        typeEvent(param){
          if(param == 0){
              
              this.active = 0
              this.eventForm.private = false

          }else{

              this.active = 1
              this.eventForm.private = true
          
          }
        },

        uploadPhoto(event){
          console.log(event)

          let selectedFile = event.taget.files[0]

          this.eventForm.img = URL.createObjectURL(selectedFile);
        },

        mapsParams(param){
          console.log(param)

          this.eventForm.latitude = param.latitude
          this.eventForm.longitude = param.longitude
        },

        createEvent(){
          console.log(this.eventForm)

          let body = this.eventForm

          this.createEvent(body)

        //   this.$http.post(this.url + '/event', body).then()
        }
    


    },
}
</script>