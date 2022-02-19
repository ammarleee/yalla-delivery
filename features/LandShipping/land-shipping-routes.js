export default [
   
    {
        path:'/shipping/report',
        name: 'report',
        meta: { layout: 'dashboard' },
        component: () => import(/* webpackChunkName: "cars" */ './views/report.vue')
    },
    {
        path:'/shipping/balance',
        name: 'balance',
        meta: { layout: 'dashboard' },
        component: () => import(/* webpackChunkName: "cars" */ './views/balance.vue')
    },
    
    {
        path:'/shipping/resturant',
        name: 'resturant',
        meta: { layout: 'dashboard' },
        component: () => import(/* webpackChunkName: "resturant" */ './views/resturant.vue'),
    },
    
    {
        path:'/shipping/category',
        name: 'category',
        meta: { layout: 'dashboard' },
        component: () => import(/* webpackChunkName: "category" */ './views/category.vue'),
    },
    {
        path:'/shipping/products',
        name: 'products',
        meta: { layout: 'dashboard' },
        component: () => import(/* webpackChunkName: "products" */ './views/products.vue'),
    },
    {
        path:'/shipping/employees',
        name: 'employees',
        meta: { layout: 'dashboard' },
        component: () => import(/* webpackChunkName: "employees" */ './views/employees.vue'),
    },
    {
        path:'/shipping/jobApplicants',
        name: 'jobApplicants',
        meta: { layout: 'dashboard' },
        component: () => import(/* webpackChunkName: "cars" */ './views/jobApplicants.vue'),
    },
   
    {
        path:'/shipping/Drivers',
        name: 'DriverList',
        meta: { layout: 'dashboard' },
        component: () => import(/* webpackChunkName: "DriverList" */ './views/DriverList.vue')
    },
   
    {
        path:'/shipping/profile',
        name: 'profile',
        meta: { layout: 'dashboard' },
        component: () => import(/* webpackChunkName: "profile" */ './views/profile.vue')
    },
   
  
   
    
    
]