export default [
    {
        path:'/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ './views/Home.vue')
    },
    {
        path:'/about',
        name: 'About',
       
        component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
        path:'/Dashboard',
        name: 'Dashboard',
        meta: { layout: 'dashboard' },
        component: () => import(/* webpackChunkName: "Dashboard" */ './views/Dashboard.vue')
    },
   
    {
        path:'/login',
        name: 'Login',
        
        component: () => import(/* webpackChunkName: "Login" */ './views/accounts/Login.vue')
    },
    {
        path:'/register',
        name: 'Register',
        
        component: () => import(/* webpackChunkName: "Login" */ './views/accounts/Register.vue')
    }
    
]