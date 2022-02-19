import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from './plugins/axios'

import Mixins from './plugins/mixins';
import Filters from './plugins/filters';
import  './plugins/components';
import "./plugins/vendors";
// import "@/assets/global.css"
import VueHtmlToPaper from 'vue-html-to-paper';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
Vue.config.productionTip = false;

const options = {
  "name": "_blank",
  "specs": [
    "fullscreen=yes",
    "titlebar=yes",
    "scrollbars=yes"
  ],
  "styles": [
    "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",
    "https://unpkg.com/kidlat-css/css/kidlat.css",
    "public/landscape.css"
  ],
  "timeout": 1000,
  "autoClose": true,
  "windowTitle": "Vue Html To Paper - Vue mixin for html elements printing."
}
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueHtmlToPaper, options);

import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;
Vue.mixin(Mixins);
import VuetifyDialog from 'vuetify-dialog'
import 'vuetify-dialog/dist/vuetify-dialog.css'
Vue.use(VuetifyDialog, {
  context: {
    vuetify
  }
})


new Vue({
  router,
  store,
  vuetify,

  created: function () {
    this.$store.dispatch("getLocalShipments");
    axios.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
        // if you ever get an unauthorized, logout the user
          this.$store.dispatch('logOut')
          console.log("unauthorized");
        // you can also redirect to /login if needed !
        }
        throw err;
      });
    });

    axios.interceptors.request.use(
       config => {
       
        const token = localStorage.getItem('token');
        config.headers['Authorization'] = token;
        return config;
      });

  },
  render: (h) => h(App)
}).$mount('#app');
