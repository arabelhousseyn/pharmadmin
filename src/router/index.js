import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
   {
     path : '/',
     name : 'home',
     component: () => import(/* webpackChunkName: "home" */ '../components/homeComp.vue')

   },
   {
     path : '/users/',
     name : "users",
     component: () => import(/* webpackChunkName: "utlisateurs" */ '../components/usersComp.vue')
   },
   {
    path : '/fournisseurs/',
    name : "fournisseurs",
    component: () => import(/* webpackChunkName: "fournisseur" */ '../components/fourniComp.vue')
  },
  {
    path : '/achatcart/',
    name : "achatcart",
    component: () => import(/* webpackChunkName: "achat" */ '../components/achatComp.vue')
  },
  {
    path : '/clients/',
    name : "clients",
    component: () => import(/* webpackChunkName: "client" */ '../components/clientComp.vue') 
  },
  {
    path : '/warning/',
    name : "warning",
    component: () => import(/* webpackChunkName: "reclamation" */ '../components/recComp.vue') 
  },
  {
    path : '/ventecart/',
    name : "ventecart",
    component: () => import(/* webpackChunkName: "vente" */ '../components/venteComp.vue') 
  },
  {
    path : '/stock/',
    name : "stock",
    component: () => import(/* webpackChunkName: "stock" */ '../components/stockComp.vue') 
  },
  {
    path : '/vente/',
    name : "vente",
    component: () => import(/* webpackChunkName: "stock" */ '../components/stockComp.vue') 
  },
  {
    path : '/product/',
    name : "product",
    component: () => import(/* webpackChunkName: "products" */ '../components/productComp.vue') 
  },
  {
    path : '/stockventecart/',
    name : "stockventecart",
    component: () => import(/* webpackChunkName: "vente" */ '../components/venteComp.vue') 
  }
  ,
  {
    path : '/stockachatcart/',
    name : "stockachatcart",
    component: () => import(/* webpackChunkName: "achat" */ '../components/achatComp.vue')
  },
  {
    path : '/compventecart/',
    name : "compventecart",
    component: () => import(/* webpackChunkName: "vente" */ '../components/venteComp.vue') 
  }
  ,
  {
    path : '/compachatcart/',
    name : "compachatcart",
    component: () => import(/* webpackChunkName: "achat" */ '../components/achatComp.vue')
  },
  {
    path : '/affichageProduit/',
    name : 'affichageproduit',
    component: () => import(/* webpackChunkName: "achat" */ '../components/affichageComp.vue')
  }
]
//component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
