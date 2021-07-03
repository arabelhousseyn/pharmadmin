import Vue from 'vue'
import App from './App.vue'
import router from './router'
import jquery from 'jquery'
window.$ = window.jquery = jquery
import 'popper.js'
import 'bootstrap'
import "./assets/css/adminlte.min.css"
import "./assets/js/adminlte.min.js"
import "./assets/fonts/css/fontawesome.min.css"
import './assets/css/style.css';
import common from  './sharer/common'
import bon from './assets/css/bon.css'

import './scss/app.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch,faLockOpen,faBars,faExpandArrowsAlt,faUser,faPowerOff,faTrash,faPen,faAngleLeft,faCircle,faCartPlus,faTruckLoading,faShoppingCart,faCheck,faSave,faPlus,faEye,faArrowLeft,faFileInvoice,faPrint,faUsers,faStop,faRecycle,faExclamation,faWarehouse,faEyeSlash,faDollarSign,faMoneyBill,faBox,faChevronCircleRight,faArrowUp,faBookmark,faDesktop,faChartPie,faArrowCircleRight,faReply,faBell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faSearch)
library.add(faLockOpen)
library.add(faBars)
library.add(faExpandArrowsAlt)
library.add(faUser)
library.add(faPowerOff)
library.add(faTrash)
library.add(faPen)
library.add(faAngleLeft)
library.add(faCircle)
library.add(faCartPlus)
library.add(faTruckLoading)
library.add(faShoppingCart)
library.add(faCheck)
library.add(faSave)
library.add(faPlus)
library.add(faEye)
library.add(faArrowLeft)
library.add(faFileInvoice)
library.add(faPrint)
library.add(faUsers)
library.add(faStop)
library.add(faRecycle)
library.add(faExclamation)
library.add(faWarehouse)
library.add(faEyeSlash)
library.add(faDollarSign)
library.add(faMoneyBill)
library.add(faBox)
library.add(faChevronCircleRight)
library.add(faArrowUp)
library.add(faBookmark)
library.add(faDesktop)
library.add(faChartPie)
library.add(faArrowCircleRight)
library.add(faReply)
library.add(faBell)
Vue.config.productionTip = false
Vue.component('ic', FontAwesomeIcon)
Vue.mixin(common)

import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
