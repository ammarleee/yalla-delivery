import Vue from 'vue';
import VueRouter from 'vue-router';

import SharedRoutes from '../features/shared/shared-routes'
import LandShippingRoutes from '../features/LandShipping/land-shipping-routes'
import SettingsRoutes from '../features/Settings/settings-routes'
import FinancesRoutes from '../features/Finances/Finances-routes'
import SystemRoutes from '../features/System/system-routes'
Vue.use(VueRouter);

const routes = [
  {
    path:'/',
    
    redirect:'/shipping/clients/'
},
  ...SharedRoutes,
  ...LandShippingRoutes,
  ...SettingsRoutes,
  ...FinancesRoutes,
  ...SystemRoutes
   
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
 
  routes,
});

export default router;
