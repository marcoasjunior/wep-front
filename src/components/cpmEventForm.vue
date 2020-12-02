<template>
    <div class="d-flex flex-column">
            <h1 class="alg-txt-c mt-7"><v-chip outlined class="title chip">Cadastro de evento</v-chip></h1>
            <v-card flat class="p10 ac mt-10 container-card-form">
                <div class="img-upload-box ac">
                    <div class="card-style-1 container-card-fields ac ">

                        <button class="ac drop-input" @click="onFileSelected" align="center">
                            <div v-if="imageUrl">
                                <img :src="imageUrl" alt="uploaded" class="img-uploaded">
                                <p>Clique para substituir a imagem do evento</p>
                            </div>
                            <div v-else>
                                <v-icon color="black" dark left>mdi-camera</v-icon>
                                <p>Adicione uma imagem ao seu evento</p>
                            </div>
                            <input @change="onFilePicked" type="file" class="hiden-input" ref="fileInput" accept="image/*">
                        </button>

                    </div>
                </div>

                <v-card flat class="mt-7 mb-3 ac align-center p15 card-style-1 container-card-fields">
                    <div class="card-style-1 p20">

                    <v-text-field 
                        class="mx-5" 
                        v-model="eventForm.title" 
                        label="Nome do evento" 
                        :rules="nameRules" 
                        :error="eventErrorForm.title"
                        color="orange" 
                        :counter="100"
                    ></v-text-field>
                    
                    <v-textarea 
                        color="orange"
                        class="mx-5" 
                        :rules="textAreaRules"
                        v-model="eventForm.description" 
                        :error="eventErrorForm.description"
                        name="input-7-4" 
                        :counter="500"
                        label="Informações do evento">
                    </v-textarea>

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


                    <v-divider class="mt-3 mb-3"></v-divider>
                   
                    <h2 class="p15 headline mt-n4">Local do evento:</h2>
                    <p class="clr-red">*Caso não consiga selecionar seu endereço no mapa clique na opção "texto"</p>

                    <v-tabs v-model="tab" fixed-tabs color="orange">
                        <v-tab v-for="(item, i) in tabItems" :key="i" class="orange--text">
                        {{ item }}
                        </v-tab>
                    </v-tabs>

                    <v-tabs-items v-model="tab">
                        <v-tab-item>
                            <p class="alg-txt-c mt-4">*Selecione no mapa o local do evento</p>
                            <div class="p15 map">

                                <SetMap @callEmit="mapsParams" v-if='!overlay' />

                                <strong>
                                    Endereço: <br/>
                                    <v-icon v-if="eventErrorForm.address" color="error">mdi-block-helper</v-icon>
                                    <v-icon v-else color="success">mdi-check-bold</v-icon>
                                    <span :class="addressClassState">{{ eventForm.address }}</span>
                                 </strong>

                                <br/>
                                <strong class="clr-red mt-3 d-block" v-if="showAddresswarning"> *O endereço não foi salvo, caso tenha colocado o endereço correto, clique no botão verde abaixo escrito "correto". </strong>
<!-- 
                                <div class="d-block mt-4" align="center">
                                    <span>o Endereço está correto?</span>
                                    <v-btn color="success" class="ml-2" @click="correctAddress">correto</v-btn>
                                </div> -->


                            </div>
                        </v-tab-item>

                        <v-tab-item>
                            <div class="container-fields">
                            <v-text-field 
                                class="mt-5"
                                v-model="eventForm.address" 
                                label="Endereço"
                                :rules="nameRules"
                                :error="eventErrorForm.address" 
                                color="orange"
                            ></v-text-field>
                            <!-- <v-text-field v-model="eventAddress.query" label="CEP" :rules="nameRules" :error="false" color="orange"></v-text-field>
                            <v-text-field v-model="eventAddress.state" label="Estado" color="orange"></v-text-field>
                            <v-text-field v-model="eventAddress.city" label="Cidade" color="orange"></v-text-field>
                            <v-text-field v-model="eventAddress.district" label="Bairro" color="orange"></v-text-field>
                            <v-text-field v-model="eventAddress.streat" label="Rua" color="orange"></v-text-field>
                            <v-text-field v-model="eventAddress.moreInfo" label="Complemento" color="orange"></v-text-field>
                            <v-text-field v-model="eventAddress.reference" label="Ponto de referência" color="orange"></v-text-field> -->
                            </div>
                        </v-tab-item>
                    </v-tabs-items>

                    <div class="container-fields">
                        <v-text-field
                            class="mt-8"
                            type="tel"
                            v-mask="'##/##/#### - ##:##'"
                            v-model="eventForm.eventDate" 
                            label="Data e hora do evento"
                            placeholder="exemplo: 24/12/2020 - 23:59"
                            :rules="dateRules" 
                            :error="eventErrorForm.eventDate"
                            color="orange"
                            :counter="18" 
                        ></v-text-field>
                    </div>

                    <!-- <v-row align="center">
                        <v-col class="text-center" cols="1" sm="12">
                            <v-btn @click="createEvent" align="center" class="ml-2" rounded color="orange" outlined dark>
                                Criar evento
                            </v-btn>
                        </v-col>
                    </v-row> -->

                    <div align="center">
                        <v-btn 
                            class="ac mt-4" 
                            color="orange" 
                            :loading="apiLoading"
                            @click="createEvent()" 
                            dark
                        >Criar Evento</v-btn>
                    </div>

                    </div>
                </v-card>
            </v-card>


                <v-overlay :value="overlay">
                    <v-progress-circular
                        indeterminate
                        size="64"
                    ></v-progress-circular>
                </v-overlay>
    </div>
</template>

<script>
import SetMap from './cpmSetMapPoints';
import axios from 'axios';
import { TheMask } from 'vue-the-mask';

import {
    mapActions,
    mapGetters
} from 'vuex'
export default {

    components: {
        SetMap,
        TheMask
    },

    data: () => ({
        overlay: false,
        userId: localStorage.getItem('id'),
        fileInput: '',
        currentFilePath: '',
        value: '',

        selectedFile: '',

        url: process.env.VUE_APP_BASE_URL,
        uploadUrl: process.env.VUE_APP_UPLOAD_URL,


        active: 0,

        srcInputFile: null,
        valid: null,
        date: null,
        menu: false,


        eventAddress:{
            query:'',
            country:'',
            state:'',
            city:'',
            streat:'',
            moreInfo:'',
            reference:'',
        },

        eventForm: {
            title: '',
            description: '',
            private: '',
            latitude: '',
            longitude: '',
            address: '',
            eventDate: '',
            img: '',
        },

        eventErrorForm: {
            title: false,
            description: false,
            private: false,
            latitude: false,
            longitude: false,
            address: false,
            eventDate: false,
            img: false,
        },

        name: '',
        inputFile: '',

        eventData: '',

        tabItems: ['Mapa', 'Texto'],
        tab: '',

        // eventData:{
        //     nameEvent:'',
        //     private:'',
        //     date:'',
        //     description:'',
        // },

        nameRules: [
            value => !!value || 'Necessário.',
            value => (value && value.length < 100) || 'Necessário preencher com um valor válido.',
        ],

        textAreaRules: [
            value => !!value || 'Necessário.',
            value => (value && value.length < 500) || 'Necessário preencher com um valor válido.',
        ],

        dateRules: [
            value => !!value || 'Necessário.',
            value => (value && value.length <= 19) || 'Necessário preencher com um valor válido.',
        ],

        items: [{
                _id: '0',
                name: 'Fluxo'
            },
            {
                _id: '1',
                name: 'Rock'
            },
            {
                _id: '2',
                name: 'Baile'
            },
            {
                _id: '3',
                name: 'Luau'
            },
            {
                _id: '4',
                name: 'Eletrônica'
            },
            {
                _id: '5',
                name: 'Bar'
            },
        ],

        addressClassState: '',

        imageData: '',
        imageUrl: '',
        image: '',
        uploadedValue: '',
        photo: '',
        possibleAddress: '',


        showAddresswarning: false,
    }),

    created() {
        this.eventForm.private = false
        // console.log("privado? " + this.eventForm.private)
    },

    computed: {
        ...mapGetters({
            apiLoading: 'apiLoading',
        })
    },

    methods: {
        ...mapActions({
            createEvent: 'createEvent'
        }),

        testVuex() {
            let obj = {
                nome: 'sei la',
                record: '21321083218'
            }

            this.$store.commit('test', obj)
        },

        save(date) {
            this.$refs.menu.save(date)
        },

        typeEvent(param) {
            if (param == 0) {

                this.active = 0
                this.eventForm.private = false

            } else {

                this.active = 1
                this.eventForm.private = true
            }
            // console.log("privado? " + this.eventForm.private)
        },

        onFileSelected() {
            this.$refs.fileInput.click()
            // console.log(e)
            // console.log("AQUI AQUI")
            // console.log(event.target.files[0])
            // console.log(event.files.target)
            // console.log(this.selectedFile)
        },

        onFilePicked(event) {
            const files = event.target.files
            let fileName = files[0].filename
            this.imageData = event.target.files[0]

            const fileReader = new FileReader()
            let uploadedFile = []
            fileReader.addEventListener('load', () => {
                this.imageUrl = fileReader.result
            })
            fileReader.readAsDataURL(files[0])
        },

        uploadPhoto() {

            const fd = new FormData();
            console.log(this.imageData)
            fd.append('photo', this.imageData)

            this.$http.post(this.uploadUrl + '/upload/image', fd)
                .then(resp => {
                    console.log(resp)
                    this.eventForm.img = resp.data
                })
        },

        

        mapsParams(param) {
            this.eventForm.latitude = param.latitude
            this.eventForm.longitude = param.longitude

            let lat = param.latitude
            let lng = param.longitude

            fetch(
                
                `https://discover.search.hereapi.com/v1/discover?at=${lat},${lng}&lang=BRL&apikey=Slch3iP_Q9gFWYa1UugeC5n5cqehI9zhr836TdXOWRw&q=restaurant`
                
                )
                    .then(result => result.json())
                    .then(result => {
                        console.log(result.items[0].address)

                        this.eventForm.address = result.items[0].address.label
                    })
        },

        correctAddress(){

            if(this.eventErrorForm.address = true){
                this.eventErrorForm.address = false
                this.showAddresswarning = false
            }

            this.eventForm.address = this.possibleAddress
            this.$toast.success('Endereço preenchido', 'uhul!', {
                position: "topCenter"
            })

            this.addressClassState = 'clr-sucess'
        },

        async createEvent() {
            
            this.checkForm()

            if(
                !this.eventErrorForm.title  &&
                !this.eventErrorForm.description &&
                !this.eventErrorForm.address &&
                !this.eventErrorForm.eventDate
            ){
                
                
            try {

                if(this.imageData == '' ||   this.imageData == null){

                    this.$toast.error('Obrigátorio colocar imagem ao evnto', '😕', {
                        dismissible: false,
                        position: "topCenter"
                    })

                }else{
                    this.$store.commit("setApiLoading", true);
                    const fd = new FormData();
                    console.log(this.imageData)
                    fd.append('photo', this.imageData);
                    await axios.post(this.uploadUrl + '/upload/image', fd).then(resp => {
                        this.eventForm.img = resp.data
                    })
                    this.$store.commit("setApiLoading", false);
                

                    this.overlay = true

                    let body = {
                        title: this.eventForm.title,
                        description: this.repleaceDescription(),
                        adress: this.eventAddress.address,
                        img: this.eventForm.img,
                        privated: this.eventForm.private,
                        eventDate: this.eventForm.eventDate,
                        latitude: this.eventForm.latitude,
                        longitude: this.eventForm.longitude,
                        user: {
                            id: this.userId
                        },
                    }
                    // console.log(body)

                    axios.post(this.url + '/event/create', body)
                        .then(resp => {
                            this.overlay = false
                            this.$store.commit("setApiLoading", false);

                            if (resp.status == 200) {
                                this.$toast.success('Registro efetuado!', 'Hey', {
                                    position: "topCenter"
                                })
                                this.$router.push('/Feed')
                                this.eventForm = ''

                            }
                        })
                        .catch(err => {
                            this.overlay = false
                            this.$store.commit("setApiLoading", false);

                            this.$toast.error('Erro no registro!', '😕', {
                                position: "topCenter"
                            })

                        })

                }

            } catch (e) {
                this.overlay = false
                this.$store.commit("setApiLoading", false);

                throw e
            }
            
            } else{
                // console.log(this.eventForm)
                this.overlay = false
                this.$store.commit("setApiLoading", false);

                this.$toast.error('Erro ao cadastrar evento', '😕', {
                    position: "topCenter"
                })
            }

        },

        checkForm(){
            if(this.eventForm.title == ''){
                this.eventErrorForm.title = true
            
            }else this.eventErrorForm.title = false
            
            if(this.eventForm.description == ''){
                this.eventErrorForm.description = true
            
            } else this.eventErrorForm.description = false

            if(this.eventForm.address == ''){
                this.eventErrorForm.address = true
                this.addressClassState = 'clr-red'
            
            } else this.eventErrorForm.address = false

            if(this.eventForm.eventDate == ''){
                this.eventErrorForm.eventDate = true
                this.showAddresswarning = true
           
           } else {
               this.eventErrorForm.eventDate = false 
               this.showAddresswarning = false
            }
         
            if(this.eventForm.eventDate == ''){
                this.eventErrorForm.eventDate = true

            } else {
               this.eventErrorForm.eventDate = false 
            }
        },

        repleaceDescription(){
            // this.eventForm.description
            let testConcole = this.eventForm.description.split("\n")
            return testConcole.join(' </br> ')
        },
    },

    watch: {

            eventAddress(value){
                // console.log(value)

                fetch(`https://autocomplete.geocoder.api.here.com/6.2/suggest.json?app_id=g4qzn6OUOLYfn2OFO6Z8&app_code=pAi1rwxOkCnBaQHm4CbURg&maxresults=1&language=pt&query=${value}&country=BRA`)
                    .then(result => result.json())
                    .then(result => {
                        
                        // console.log(result)
                    })
            },

            eventAddress:{
                deep:true,
                handler: function(value) {
                    // console.log(value.query)
                    fetch(`https://autocomplete.geocoder.api.here.com/6.2/suggest.json?app_id=g4qzn6OUOLYfn2OFO6Z8&app_code=pAi1rwxOkCnBaQHm4CbURg&maxresults=1&language=pt&query=${value.query}&country=BRA`)
                    .then(result => result.json())
                    .then(result => {
                        // console.log(result.suggestions[0].address)
                        this.eventAddress.country = result.suggestions[0].address.country
                        this.eventAddress.state = result.suggestions[0].address.state
                        this.eventAddress.city = result.suggestions[0].address.city
                        this.eventAddress.district = result.suggestions[0].address.district
                    })
                }
            },

            query: function (value) {
                fetch(`https://autocomplete.geocoder.api.here.com/6.2/suggest.json?app_id=g4qzn6OUOLYfn2OFO6Z8&app_code=pAi1rwxOkCnBaQHm4CbURg&maxresults=1&language=pt&query=${value}&country=BRA`)
                    .then(result => result.json())
                    .then(result => {
                        if (result.suggestions && result.suggestions.length > 0) {
                            if (result.suggestions[0].address.houseNumber && result.suggestions[0].address.street) {
                                this.street = result.suggestions[0].address.street + ", " + result.suggestions[0].address.houseNumber
                            } else {
                                this.street = "";
                            }
                            this.city = result.suggestions[0].address.city ? result.suggestions[0].address.city : "";
                            this.state = result.suggestions[0].address.state ? result.suggestions[0].address.state : "";
                            this.postcode = result.suggestions[0].address.postalCode ? result.suggestions[0].address.postalCode : "";
                            this.district = result.suggestions[0].address.district ? result.suggestions[0].address.district : "";
                            this.country = result.suggestions[0].address.country ? result.suggestions[0].address.country : "";
                        } else {
                            this.street = "";
                            this.city = "";
                            this.state = "";
                            this.postalCode = "";
                            this.country = "";
                        }
                    })
            }
        }
}
</script>

<style lang="scss">
.container-card-form{
    max-width: 100%;
    width: 100%;

    @media screen  and (max-width: 700px){
        max-width: 100%;
        width: 100%;
    }
}

.container-card-fields{
    max-width: 50%;
    width: 100%;

    @media screen  and (max-width: 850px){
        max-width: 100%;
        width: 100%;
    }
}

.img-upload-box{
    display: block;
    max-width: 100%;
    width: 100%;
}

.map {

    width: 800px;
    max-width: 100%;
    height: 500px;

}

.container-fields{
    width: 800px;
    max-width: 100%;
}

</style>