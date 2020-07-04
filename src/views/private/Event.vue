<template>
    <div>
        <h1>CRIAR EVENTO</h1>


        <div>
            <v-btn to="/Feed">voltar</v-btn>

            <span>CRIAR NOVO EVENTO</span>

            <v-badge
                bordered bottom
                color="deep-purple accent-4"
                dot offset-x="10" offset-y="10"
            >
                <v-avatar size="50">
                <v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"></v-img>
                </v-avatar>
            </v-badge>


         <v-card class="p10">
            {{ EventData }}
            <div>
                <v-file-input v-model="fileInput" multiple label="File input"></v-file-input>
            </div>

            <v-form v-model="EventData">

                <v-text-field
                    v-model="EventData.nameEvent"
                    label="Name"
                    :counter="10"
                    :rules="nameRules"
                    required
                ></v-text-field>

                <v-checkbox
                    v-model="EventData.private"
                    label="Evento privado?"
                    color="primary"
                    required
                ></v-checkbox>

                <!-- <l-map ref="myMap"> </l-map> -->

                <!-- <v-date-picker v-model="EventData.date"></v-date-picker> -->
    
            </v-form>
        </v-card>
        </div>


      <div class="mx-3"></div>
    </div>
</template>
<script>
import L from 'leaflet';
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';

export default {
    components: {
        LMap,
        LTileLayer,
        LMarker,
    },
    data:() => ({
        fileInput:'',

        map:null,
        markers:[],

        valid: null,
        date: null,
        menu: false,

        EventData:{
            nameEvent:'',
            private:false,
            date:'',
        },

        nameRules: 
        [
            v => !!v || 'Obrigátorio preencher',
            v => (v && v.length <= 10) || 'Name must be less than 10 characters',
        ],
    }),

    mounted() {
        this.map = L.map('map')
        L.titleLayer('http://{s}.title.osm.org/{z}/{x}/{y}.png',{
            attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);

        //map google data
        this.getGoogleData();
        
    },

    methods: {
      save (date) {
        this.$refs.menu.save(date)
      },
    
    getGoogleData(){
        let spreadsheetID = '1ctHA5UmH9ZmrXugYFe_DHBOr9wJHRYkHCHim8nh1Tg8'
        let worksheetID = 'od6';
        let url = 'http://spreadsheets.google.com/feeds/list/' + spreadsheetID + '/' + worksheetID + '/public/values?alt=json'
        console.log(url)
        // axios.get(url).then(response => {
        //     _.forEach(response.data.feed.entry, {
        //         function(val, i){
        //             var markeX
        //         } 
        //     });
        // })
    }

    },

}
</script>