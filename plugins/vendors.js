import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import vuetify from './vuetify';
import VuetifyDialog from 'vuetify-dialog'
import 'vuetify-dialog/dist/vuetify-dialog.css'

Vue.use(VuetifyDialog, {
    context: {
      vuetify
    }
  })
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueSidebarMenu)
Vue.use(require('vue-moment'));