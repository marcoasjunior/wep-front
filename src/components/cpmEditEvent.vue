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

    <v-dialog v-model="dialog" persistent max-width="700px">
      <v-card :loading="apiLoading">

        {{newEventFormFields}}
          <v-toolbar dark color="orange">
            
            <v-toolbar-title>Editar evento</v-toolbar-title>
            
            <div class="ml-a">
                <v-btn icon dark @click="dialog = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </div>

        </v-toolbar>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                
                <v-card class="p15">

                  <button class="ac drop-input" @click="onFileSelected" align="center">
                    <h2 class="alg-txt-c mb-5 mt-2">Clique para alterar a imagem do evento</h2>
                    <!-- {{ eventFields }} -->
                    <img class="ac d-block img-uploaded" :src="newEventFormFields.img" alt="foto do evento">
                    <input @change="onFilePicked" type="file" class="hiden-input" ref="fileInput" accept="image/*">
                  </button>

                </v-card>

              </v-col>
              <v-col cols="12">
                <v-text-field
                  color="orange"
                  label="Titulo*"
                  clearable
                  required
                  v-model="newEventFormFields.title"
                  :error="eventErrorForm.title"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-textarea
                  name="input-7-4"
                  color="orange"
                  label="Descrição*"
                  clearable
                  required
                  v-model="newEventFormFields.description"
                  :error="eventErrorForm.description" 
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
                        Eventos privados aparecem no feed, porém sua informações são reservadas para os convidados do evento.
                    </p>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  class="mt-8"
                  type="tel"
                  clearable
                  v-mask="'##/##/#### - ##:##'"
                  v-model="newEventFormFields.eventDate"
                  :error="eventErrorForm.eventDate" 
                  label="Data e hora do evento*"
                  color="orange"
                  :counter="18"
                ></v-text-field>
              </v-col>

              <v-col cols="12"> 
                
                <v-text-field 
                    class="mt-5"
                    clearable
                    v-model="newEventFormFields.adress" 
                    label="Endereço"
                    :rules="nameRules"
                    :error="eventErrorForm.adress" 
                    color="orange"
                ></v-text-field>

              </v-col>

            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error darken-1" text @click="dialog = false"
            >Cancelar</v-btn
          >
          <v-btn
            :loading="apiLoading"
            color="orange"
            dark
            outlined
            @click="updateEvents"
            >Salvar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-overlay :value="overlay">
      <v-progress-circular
          indeterminate
          size="64"
      ></v-progress-circular>
    </v-overlay>

  </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import axios from 'axios';
import EditMapPoints from './cpmSetMapPoints';

export default {
  props: ["eventFields"],
  components:{
    EditMapPoints
  },
  data: () => ({
    dialog: false,
    overlay: false,
    possibleadress: '',
    imageData:'',
    imageUrl:'',
    active:0,

    url: process.env.VUE_APP_BASE_URL,
    uploadUrl: process.env.VUE_APP_UPLOAD_URL,

    newEventFormFields: {
      name: '',
      description: '',
      private: '',
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

    nameRules: [
      value => !!value || 'Necessário.',
      value => (value && value.length < 100) || 'Necessário preencher com um valor válido.',
    ],
  }),
  created(){
    this.replaceVariables()
  },
  methods:{

    ...mapActions({
       getMyEvents: "ProfileVuex/getMyEvents",
    }),

    replaceVariables(){
      this.newEventFormFields.title = this.eventFields.title
      this.newEventFormFields.description = this.eventFields.description
      this.newEventFormFields.latitude = this.eventFields.latitude
      this.newEventFormFields.longitude = this.eventFields.longitude
      this.newEventFormFields.adress = this.eventFields.adress
      this.newEventFormFields.eventDate = this.eventFields.eventDate
      this.newEventFormFields.img = this.eventFields.img
      if(this.eventFields.private = true){ 
        this.newEventFormFields.private = true 
        this.active = 1
      }
      else if(this.eventFields.private = false){
        this.newEventFormFields.private = false
        this.active = 0
      }

      let currentString = this.newEventFormFields.description
      console.log(this.newEventFormFields)
      let convertDescription = currentString.replaceAll('</br>', '\n')
      this.newEventFormFields.description = convertDescription
      
    },


    onFileSelected() { this.$refs.fileInput.click() },

    onFilePicked(event) {
      const files = event.target.files
      let fileName = files[0].filename
      this.imageData = event.target.files[0]

      const fileReader = new FileReader()
      let uploadedFile = []
      fileReader.addEventListener('load', () => {
          this.newEventFormFields.img = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
    },

    typeEvent(param) {
      if (param == 0) {

          this.active = 0
          this.newEventFormFields.private = false

      } else {

          this.active = 1
          this.newEventFormFields.private = true
      }
      console.log("privado? " + this.newEventFormFields.private)
    },

    checkForm(){

            if(this.newEventFormFields.title == '' ||this.newEventFormFields.title == null){
                this.eventErrorForm.title = true
            
            }else this.eventErrorForm.title = false
            
            if(this.newEventFormFields.description == '' || this.newEventFormFields.description == null){
                this.eventErrorForm.description = true
            
            } else this.eventErrorForm.description = false

            if(this.newEventFormFields.adress == '' || this.newEventFormFields.adress == null){
                this.eventErrorForm.adress = true

            } else this.eventErrorForm.adress = false

            if(this.newEventFormFields.eventDate == '' || this.newEventFormFields.eventDate == null){
              this.eventErrorForm.eventDate = true           
            } else { this.eventErrorForm.eventDate = false }
    },

        
    repleaceDescription(){
        // this.eventForm.description
        let transformDescriptionValue = this.newEventFormFields.description.split("\n")
        return transformDescriptionValue.join(' </br> ')
    },

    async updateEvents(){
            this.checkForm()

            if(
                !this.eventErrorForm.title  &&
                !this.eventErrorForm.description &&
                !this.eventErrorForm.adress &&
                !this.eventErrorForm.eventDate
            ){

              try{
                this.$store.commit("setApiLoading", true);
                const fd = new FormData();
                fd.append('photo', this.imageData);
                await axios.post(this.uploadUrl + '/upload/image', fd).then(resp => {
                    this.newEventFormFields.img = resp.data
                })

                let body = {
                  title: this.newEventFormFields.title,
                  description: this.repleaceDescription(),
                  adress: this.newEventFormFields.adress,
                  img: this.newEventFormFields.img,
                  privated: this.newEventFormFields.private,
                  eventDate: this.newEventFormFields.eventDate,
                  latitude: this.eventFields.latitude,
                  longitude: this.eventFields.longitude,
                  user: {
                      id: this.userData.id
                  },
                }
                  console.log(body)

                    let eventId = this.eventFields.id

                  axios.put(this.url + `/event/${eventId}`, body)
                  .then(resp => {
                    this.$store.commit("setApiLoading", false);
                      if (resp.status == 200) {

                          this.getMyEvents()
                          this.dialog = false
                          this.$toast.success('Registro efetuado!', 'Hey', {
                              position: "topCenter"
                          })
                          // this.$router.push('/Feed')
                          // this.eventForm = ''

                      }
                  })
                  .catch(err => {
                      this.$store.commit("setApiLoading", false);
                      this.$toast.error('Erro no registro!', 'Putz', {
                          position: "topCenter"
                      })

                  })

              } catch (e) {
                throw e
              }


            }else{
              console.log('tem coisa errada ai')
            }
    }

  },
  computed: {
    ...mapGetters({
      apiLoading: "apiLoading",
      userData: 'FeedVuex/userData'
    }),
  },
};
</script>
<style lang="scss">
  .img-uploaded{
    max-width: 70%;
    width: 100%;
  }
</style>