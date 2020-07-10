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


         <v-card class="p10 ac" max-width="800">
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


                 <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="red lighten-2"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Click Me
        </v-btn>
      </template>

      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Privacy Policy
        </v-card-title>

        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
    
            </v-form>
        </v-card>
        </div>


      <div class="mx-3"></div>
    </div>
</template>
<script>
import ToolBar from '@/components/cpmToolBar'
import L from 'leaflet';
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';

export default {
    components: {
        LMap,
        LTileLayer,
        LMarker,
        ToolBar,
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