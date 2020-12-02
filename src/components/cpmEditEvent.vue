<template>
  <v-row class="ac">

    <div class="p10">
        <v-btn 
          color="orange" 
          dark  
          icon
          :loading="apiLoading"
          fab
          rounded
          small
          outlined
          @click="dialog = true"
        >
          <v-icon>mdi-folder-edit</v-icon>
        </v-btn>
    </div>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>

            <v-toolbar dark color="orange">
              
              <v-toolbar-title>Alterar informações do evento</v-toolbar-title>
              
              <div class="ml-a">
                  <v-btn icon dark @click="dialog = false">
                      <v-icon>mdi-close</v-icon>
                  </v-btn>
              </div>

          </v-toolbar>

          <v-container>
            <v-row>
              
              <v-col cols="12">
                <v-card @click="onFileSelected">
                  <img :src="newEventForm.img" alt="Imagem do evento" class="ac d-block p15 img-uploaded">
                  <input @change="onFilePicked" type="file" class="hiden-input" ref="fileInput" accept="image/*">
                </v-card>
              </v-col>
              
              <v-col cols="12">

                <v-text-field
                  color="orange"
                  label="Titulo*"
                  clearable
                  required
                  v-model="newEventForm.title"
                ></v-text-field>

              </v-col>
              <v-col cols="12">

                <v-textarea
                  name="input-7-4"
                  color="orange"
                  label="Descrição*"
                  clearable
                  required
                  v-model="newEventForm.description"
                ></v-textarea>

              </v-col>
              <v-col cols="12">
                    <div>
                        <v-btn class="ml-2" rounded color="orange" :outlined="active == 1" dark @click="typeEvent(0)">
                            Público
                        </v-btn>

                        <v-btn class="ml-2" rounded color="orange" :outlined="active == 0" dark @click="typeEvent(1)">
                            Privado
                        </v-btn>
                    </div>

                    <p class="p15 subtitle-2 mb-n4" v-if="active == 0">
                        Eventos públicos são visíveis para todos os usuários, isso é possível ser modificado nas opções posteriormente.
                    </p>

                     <p class="p15 subtitle-2 mb-n4" v-if="active == 1">
                        Eventos privados não aparecem no feed,são reservadas para os convidados do evento.
                    </p>
              </v-col>

              <v-col cols="12">
                
              <v-text-field
                  class="mt-1"
                  type="tel"
                  v-mask="'##/##/#### - ##:##'"
                  v-model="newEventForm.eventDate" 
                  clearable
                  label="Data e hora do evento"
                  placeholder="exemplo: 24/12/2020 - 23:59"
                  :rules="dateRules" 
                  :error="eventErrorForm.eventDate"
                  color="orange"
                  :counter="18" 
                ></v-text-field>

              </v-col>

              <v-col cols="12">

                <v-text-field 
                  class="mt-5"
                  v-model="newEventForm.adress" 
                  label="Endereço"
                  clearable
                  :rules="nameRules"
                  :error="eventErrorForm.adress" 
                  color="orange"
                ></v-text-field>

              </v-col>

            </v-row>
          </v-container>

        <v-card-actions>
          <v-spacer></v-spacer>
          
          <v-btn color="error darken-1" outlined @click="dialog = false">Cancelar</v-btn>

          <v-btn
            :loading="apiLoading"
            color="orange"
            outlined
            @click="editEvent"
            >Salvar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
  props: ["editEventData"],
  data: () => ({
    dialog: false,

    active: 0,

    imageData: '',
    currentImage: '',

    url: process.env.VUE_APP_BASE_URL,
    uploadUrl: process.env.VUE_APP_UPLOAD_URL,

    dateRules: [
      value => !!value || 'Necessário.',
      value => (value && value.length <= 19) || 'Necessário preencher com um valor válido.',
    ],

    nameRules: [
        value => !!value || 'Necessário.',
        value => (value && value.length < 100) || 'Necessário preencher com um valor válido.',
    ],

    newEventForm:{
      title: '',
      description: '',
      privated: '',
      latitude: '',
      longitude: '',
      adress: '',
      eventDate: '',
      img: '',

    },

    eventErrorForm: {
      title: false,
      description: false,
      private: false,
      latitude: false,
      longitude: false,
      adress: false,
      eventDate: false,
      img: false,
    },
  }),
  computed: {
    ...mapGetters({
      apiLoading: "apiLoading",
      userData:'FeedVuex/userData'
    }),
  },

  created(){
    this.newEventForm.privated = false
    this.convertTextArea()
    this.setLocalVariables()
  },

  methods:{
    convertTextArea(){
      // console.log(this.editEventData.description)

      let convertedDescription = this.editEventData.description.replaceAll('</br>', '\n')
      this.newEventForm.description = convertedDescription 
    },
    
    setLocalVariables(){
      this.newEventForm.title = this.editEventData.title
      this.newEventForm.private = this.editEventData.private
      this.newEventForm.latitude = this.editEventData.latitude
      this.newEventForm.longitude = this.editEventData.longitude
      this.newEventForm.adress = this.editEventData.adress
      this.newEventForm.eventDate = this.editEventData.eventDate
      this.newEventForm.img = this.editEventData.img

      
    },

    onFileSelected() { this.$refs.fileInput.click() },

    onFilePicked(event) {
      const files = event.target.files
      let fileName = files[0].filename
      this.imageData = event.target.files[0]

      const fileReader = new FileReader()
      let uploadedFile = []
      fileReader.addEventListener('load', () => {
          this.newEventForm.img = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.imageChange = true
    },

    checkFields(){
      if(this.newEventForm.title == '' || this.newEventForm.title == null){
            this.eventErrorForm.title = true
            this.alertFilds()    
        
        }else this.eventErrorForm.title = false
        
        if(this.newEventForm.description == '' || this.newEventForm.description == null){
          this.eventErrorForm.description = true
          this.alertFilds()    
        
        } else this.eventErrorForm.description = false

        if(this.newEventForm.adress == '' || this.newEventForm.adress == null){
          this.eventErrorForm.adress = true
          this.alertFilds()    
      
        } else this.eventErrorForm.adress = false

        if(this.newEventForm.eventDate == '' || this.newEventForm.eventDate == null){
          this.eventErrorForm.eventDate = true
          this.alertFilds()    
        } else {
            this.eventErrorForm.eventDate = false 
        }
    },

    alertFilds(){
        this.$toast.error('Verifique os campos', '😕', {
          message:'Ops, parece que alguns campos estão faltando',
          dismissible: false,
          position: "topCenter"
      })
    },

     repleaceDescription(){
          // this.eventForm.description
          let convertedDescription = this.newEventForm.description.split("\n")
          return convertedDescription.join(' </br> ')
      },

      typeEvent(param) {
        if (param == 0) {

            this.active = 0
            this.newEventForm.private = false

        } else {

            this.active = 1
            this.newEventForm.private = true
        }
        // console.log("privado? " + this.eventForm.private)
    },

    async uploadImage(){
      this.$store.commit("setApiLoading", true);
      const fd = new FormData();
      // console.log(this.imageData)
      fd.append('photo', this.imageData);
      await axios.post(this.uploadUrl + '/upload/image', fd).then(resp => {
          this.newEventForm.img = resp.data
      })
      this.$store.commit("setApiLoading", false);
    },

    async editEvent(){
        this.checkFields()

        if(this.imageChange){

            this.uploadImage()

          }else{

            if(
                !this.eventErrorForm.title  &&
                !this.eventErrorForm.description &&
                !this.eventErrorForm.adress &&
                !this.eventErrorForm.eventDate
            ){

              
              
              let body = {
                title: this.newEventForm.title,
                description: this.repleaceDescription(),
                adress: this.newEventForm.adress,
                img: this.editEventData.img,
                privated: this.newEventForm.privated,
                eventDate: this.newEventForm.eventDate,
                latitude: this.editEventData.latitude,
                longitude: this.editEventData.longitude,
                user: {
                  id: this.userData.id
                },
              }

              // console.log(body)
              let eventId = this.editEventData.id
              axios.put(this.url + `/event/${eventId}`, body)
                  .then(resp => {
                      this.$store.commit("setApiLoading", false);
                      this.dialog = false

                      this.setNewVariablesValues(resp.data)
                      if (resp.status == 200) {
                          this.$toast.success('Registro efetuado!', 'Hey', {
                              position: "topCenter"
                          })

                      }
                  })
                  .catch(err => {
                      this.$store.commit("setApiLoading", false);

                      this.$toast.error('Erro no registro!', '😕', {
                          position: "topCenter"
                      })

                  })
              }
            }
    },

    setNewVariablesValues(param){
      this.editEventData.title = param.title
      this.editEventData.private = param.private
      this.editEventData.latitude = param.latitude
      this.editEventData.longitude = param.longitude
      this.editEventData.adress = param.adress
      this.editEventData.eventDate = param.eventDate
      this.editEventData.img = param.img
    }
  },

  watch:{

  }
};
</script>