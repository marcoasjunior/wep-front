import Vue from 'vue'
import App from './App.vue'
import './assets/index.scss'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueIziToast from 'vue-izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import defaultOptionsObject from './util/iziToast'
import VueTheMask from 'vue-the-mask'
Vue.use(VueIziToast, defaultOptionsObject);
Vue.use(VueTheMask)

import 'leaflet/dist/leaflet.css';

import { Icon } from 'leaflet';

import Cloudinary, { CldImage } from 'cloudinary-vue';


Vue.use(Cloudinary, {
    configuration: { cloudName: 'dxblalpv2' },
    components: [ CldImage ]
})


delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});


Vue.config.productionTip = false

Vue.prototype.$url = process.env.VUE_APP_BASE_URL

new Vue({
  router,
  store,
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')
