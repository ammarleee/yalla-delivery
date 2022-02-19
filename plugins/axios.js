import Vue from 'vue';

import axios from 'axios';
import VueAxios from 'vue-axios';

//  axios.defaults.baseURL = 'https://localhost:44369/api/';
axios.defaults.baseURL = 'https://infallible-perlman.161-97-176-146.plesk.page/api/';


axios.withCredentials= false,
axios.defaults.withCredentials= false,

Vue.use(VueAxios, axios);
export default axios;