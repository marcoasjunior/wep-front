<template>
    <div class="d-flex flex-column">    
            <v-card flat class="p10 ac mt-10" max-width="90%" width="800px">
                <div>
                    <div class="card-style-1">

                        <button class="ac drop-input" @click="onFileSelected" align="center">
                            <img v-if="imageUrl" :src="imageUrl" alt="uploaded" width="500px">
                            <v-icon v-else color="black" dark left>mdi-camera</v-icon>
                            <p>Adicione uma imagem ao seu evento</p>
                            <input @change="onFilePicked" type="file" class="hiden-input" ref="fileInput" accept="image/*">
                        </button>
                        <span class="card-footer">
                            <v-text-field class="mx-5" v-model="eventForm.name" label="Nome do evento" :rules="nameRules" :error="false" color="purple" :counter="40"></v-text-field>
                        <v-textarea class="mx-5" v-model="eventForm.description" name="input-7-4" label="Descrição do evento"></v-textarea>
                         </span>

                    </div>
                </div>

                <v-card flat class="mt-7 mb-3 mr-auto ml-auto d-flex flex-column align-center" max-width="90%" width="800px" >

                    <div>
                    <v-btn class="ml-2" rounded color="primary" :outlined="active == 1" dark @click="typeEvent(0)">
                        Público
                    </v-btn>

                    <v-btn class="ml-2" rounded color="primary" :outlined="active == 0" dark @click="typeEvent(1)">
                        Privado
                    </v-btn>
                    </div>

                    <v-divider class="mt-3"></v-divider>

                    <p class="p15" v-if="active == 0">
                        Eventos públicos são visíveis para todos os usuários do wep app, é possível mudar as configurações do evento caso queira na seção de opções.
                    </p>

                    <p class="p15" v-if="active == 1">
                        Eventos Privados aparecem no feed porem sua informações são reservadas para os convidados do evento, é possível mudar as configurações do evento caso queira.
                    </p>

                    <h2 class="p15 headline mt-n4">Local do evento:</h2>

                    <div class="p15 map">

                        <SetMap @callEmit="mapsParams" />

                        <v-text-field v-model="eventForm.address" label="Endereço" :rules="nameRules" :error="false" color="purple" :counter="40"></v-text-field>

                        <v-text-field v-model="eventForm.eventDate" label="Data do evento" :rules="dateRules" :error="false" color="purple" :counter="10" type="date"></v-text-field>
                    </div>

                    <v-row align="center">
                        <v-col class="text-center" cols="1" sm="12">
                            <v-btn @click="createEvent" align="center" class="ml-2" rounded color="orange" outlined dark>
                                Criar evento
                            </v-btn>
                        </v-col>
                    </v-row>
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

import {
    mapActions,
    mapGetters
} from 'vuex'
export default {

    components: {
        SetMap
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

        eventForm: {
            name: '',
            description: '',
            private: '',
            latitude: '',
            longitude: '',
            address: '',
            eventDate: '',
            img: '',
        },

        name: '',
        inputFile: '',

        eventData: '',

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


        imageData: '',
        imageUrl: '',
        image: '',
        uploadedValue: '',
        photo: '',
    }),

    created() {
        this.eventForm.private = false
    },

    computed: {
        ...mapGetters({
            test: 'test',
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
        },

        async createEvent() {
            this.overlay = true
            try {
                const fd = new FormData();
                console.log(this.imageData)
                fd.append('photo', this.imageData);
                await axios.post(this.uploadUrl + '/upload/image', fd).then(resp => {
                    this.eventForm.img = resp.data
                })


                let body = {
                    title: this.eventForm.name,
                    description: this.eventForm.description,
                    address: this.eventForm.address,
                    img: this.eventForm.img,
                    privated: this.eventForm.private,
                    eventDate: this.eventForm.eventDate,
                    latitude: this.eventForm.latitude,
                    longitude: this.eventForm.longitude,
                    user: {
                        id: this.userId
                    },
                }

                axios.post(this.url + '/event/create', body)
                    .then(resp => {
                        this.overlay = false
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
                        this.$toast.error('Erro no registro!', 'Putz', {
                            position: "topCenter"
                        })

                    })

            } catch (e) {
                throw e
            }

        }
    },
}
</script>

<style scoped>

.map {

    width: 800px;
    max-width: 100%;
    height: 500px;

}

</style>