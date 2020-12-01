<template>

  <div style="height: 350px;">
    {{ propsCoordinates.longitude }}
    {{ propsCoordinates.latitude }}
    <div class="info" style="height: 0%">
    </div>
    <l-map
      style="height: 80%; width: 100%"
      :zoom="zoom"
      :center="center"
      @update:center="centerUpdated"
    >
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker :lat-lng="marker"></l-marker>
    </l-map>

  </div>
</template>

<script>
import {LMap, LTileLayer, LMarker} from 'vue2-leaflet';
import {
  mapGetters, mapActions
} from 'vuex';


export default {
  props:["propsCoordinates"],
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  data () {
    return {
    //   url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      url: 'https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=49778a018458470496d038cb8e74e5d8',
      zoom: 13,
      attribution:'&copy; <a href=http://osm.org/copyright>OpenStreetMap</a>contributors',
      center: L.latLng(47.413220, -1.219482),
      bounds: null,
      marker: L.latLng(47.413220, -1.219482),
      latitudePointer:'',
      longitudePointer:''
    };
  },
  created() {
    if(this.propsCoordinates != ''){
      this.checkParam()
      }else{
        this.centerUpdated(this.center)
      }
  },
      computed: {

        ...mapGetters({
            coordinateSelected: 'coordinateSelected',
        }),

    },
  methods: {
    // zoomUpdated (zoom) {
    //   this.zoom = zoom;
    // },
    centerUpdated (center) {
      this.center = center;
      this.marker = center

      // console.log(center.lat)
      // console.log(center.lng)

      let cpmMapParams = {
        latitude: center.lat,
        longitude: center.lng
      }

      this.$emit('callEmit', cpmMapParams)
    },
    // boundsUpdated (bounds) {
    //   this.bounds = bounds;
    // }

    parseMarker(){
        
        let longitude = this.coordinateSelected.longitude
        let latitude =  this.coordinateSelected.latitude
        return L.latLng(latitude, longitude)

    },

    setMarker(){
        if('geolocation' in navigator){

        navigator.geolocation.getCurrentPosition(function(position){

            this.setLocation(position)

        }, function(error){
            console.log(error)
        })
        }else{
            alert('ops, não foi possivel localizar sua possição')
        }
    },

    setLocation(position){
        let longitude = position.coords.longitude
        let latitude =  position.coords.latitude

        this.marker = L.latLng(latitude, longitude)
        this.center = L.latLng(latitude, longitude)

        // console.log(position.coords)
        // console.log(position.coords.latitude)
        // console.log(position.coords.longitude)
        // console.log("Passou para o marcador")
    },

    // dropMarker(position){
    //     let marker = new H.map.Marker({ lat: position.Latitude, lng: position.Longitude });
    //     console.log(marker)
    // }

    checkParam(){
      if(this.propsCoordinates != ''){
        console.log(this.propsCoordinates.latitude)
        console.log(this.propsCoordinates.longitude)
        this.center = L.latLng(this.propsCoordinates.latitude, this.propsCoordinates.longitude)
        this.marker = L.latLng(this.propsCoordinates.latitude, this.propsCoordinates.longitude)
      }
    }
  },

    watch: {
        marker(){
            this.$store.commit("setCoordinateSelected", this.marker);
        },


    },
}
</script>
