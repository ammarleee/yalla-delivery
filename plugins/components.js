import Vue from 'vue';
import Default from "./../layouts/Default.vue";
import Dashboard from "./../layouts/Dashboard.vue";
import AppAutoComplete from './../features/shared/components/AppAutoComplete.vue'
import AddShipment from './../features/LandShipping/components/AddShipment.vue';
import ShipmentsTable from './../features/LandShipping/components/ShipmentsTable.vue';
import AppState from './../features/shared/components/AppState.vue';


Vue.component("AppState", AppState);
Vue.component("AddShipment", AddShipment);
Vue.component("ShipmentsTable", ShipmentsTable);
Vue.component("AppAutoComplete", AppAutoComplete);
Vue.component("default-layout", Default);
Vue.component("dashboard-layout", Dashboard);
