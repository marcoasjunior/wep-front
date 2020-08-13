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

                  <button class="ac drop-input" @click="onFileSelected" align="center">
                    <img v-if="imageUrl" :src="imageUrl" alt="uploaded">
                    <v-icon v-else color="black" dark left>mdi-camera</v-icon>
                    <p>Adicione uma imagem ao seu evento</p>
                    <!-- <v-file-input @change="onFileSelected" label="Foto do evento" ref="file-input"></v-file-input> -->
                    <input @change="onFilePicked" type="file" class="hiden-input" ref="fileInput" accept="image/*">
                  </button>

                  <!-- <span class="hiden-input">
                    <input type="file">
                  </span> -->

                  <span class="card-footer">
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
                        v-model="eventForm.address" 
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
import SetMap from './cpmSetMapPoints';
import axios from 'axios';
import firebase, { storage } from 'firebase';
import uploadImageToFirebase from '../util/firebase'

import {
  mapActions
} from 'vuex'
export default {

    components:{
            SetMap
    },

    data:() => ({
        fileInput:'',
        currentFilePath:'',
        value:'',

        selectedFile:'',
        
        url:process.env.VUE_APP_BASE_URL,


        active:0,

        srcInputFile: null,
        valid: null,
        date: null,
        menu: false,

        eventForm:{
            name:'',
            description:'',
            private:'',
            latitude:'',
            longitude:'',
            address:'',
            eventeDate:'',
            img:'',
            user:'1'
        },

        name:'',
        inputFile:'',

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
        ],


        imageData:'',
        imageUrl:'',
        image:'',
        uploadedValue:'',
        photo:'',
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

        onFileSelected(){
          this.$refs.fileInput.click()
          // console.log(e)
          // console.log("AQUI AQUI")
          // console.log(event.target.files[0])
          // console.log(event.files.target)
          // console.log(this.selectedFile)
        },

        onFilePicked(event){
          const files = event.target.files
          let fileName = files[0].filename
          this.imageData = event.target.files[0]

          const fileReader = new FileReader()
          let uploadedFile = []
          fileReader.addEventListener('load', () => {
            this.imageUrl = fileReader.result
          })
          fileReader.readAsDataURL(files[0])
          this.uploadPhoto()
        },

        uploadPhoto(){

          uploadImageToFirebase(this.imageData)
          // const storageImage = firebase.storage().ref(`${this.imageData.name}`).put(this.imageData)
          // storageImage.on(`state_changed`, snapshot => {
          //   this.uploadedValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100
          //   console.log(this.uploadedValue)
          // },  
          // error => {console.log(error.message)},
          // ()=> {this.uploadedValue=100;
          //   storageImage.snapshot.ref.getDownloadURL().then((url) => {
          //     this.photo = url
          //     console.log("MANO... DEU TUDO CERTO, SÓ VAI")
          //     console.log(url)
          //     this.eventForm.img = url
          //   })
          // })
        },

        onFileChange(event) {

          console.log(event)
          // let selectedFile = event.taget.files[0]

          // this.srcInputFile = URL.createObjectURL(this.inputFile);
          // console.log(this.srcInputFile)

        },

        mapsParams(param){
          console.log(param)

          this.eventForm.latitude = param.latitude
          this.eventForm.longitude = param.longitude
        },

        createEvent(){


          
          const fd = new FormData();
          fd.append('title', this.eventForm.name);
          fd.append('description', this.eventForm.description);
          fd.append('adress', this.eventForm.address);
          fd.append('img', this.eventForm.img);
          fd.append('privated', this.eventForm.private);
          fd.append('eventeDate', this.eventForm.eventeDate);
          fd.append('latitude', this.eventForm.latitude);
          fd.append('longitude', this.eventForm.longitude);
          fd.append('user', this.eventForm.user);

          console.log(this.eventForm)
          console.log(fd);


          let body = fd
          console.log(body)
          // this.createEvent(body)

          this.$http.post(this.url + '/event', fd)
          .then(resp => {
            console.log(resp)
          })
   
        }
    


    },
}
</script>