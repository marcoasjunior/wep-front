import './assets/index.scss'
import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
// import vuetify from './plugins/vuetify'
import '@mdi/font/css/materialdesignicons.css'
import '@babel/polyfill'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'

Vue.use(VueAxios, axios)

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,

  // vuetify,
  render: h => h(App)
}).$mount('#app')
