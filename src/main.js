import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbvue/build/css/mdb.css';
import 'vuetify/dist/vuetify.min.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import VueIziToast from "vue-izitoast";
import "izitoast/dist/css/iziToast.css";
import '@progress/kendo-ui'
import '@progress/kendo-theme-default/dist/all.css'
import '@progress/kendo-ui/js/messages/kendo.messages.es-ES.js'
import '@progress/kendo-ui/js/cultures/kendo.culture.es-CL.js'
import { GanttInstaller} from '@progress/kendo-gantt-vue-wrapper'
import AmCharts from 'amcharts3'
import AmSerial from 'amcharts3/amcharts/serial'

Vue.config.productionTip = false
// main.js
import '@fortawesome/fontawesome-free/css/all.css' // Ensure you are using css-loader
import Vuetify from 'vuetify'
import VueResource from 'vue-resource';

import GAuth from 'vue-google-oauth2'
const gauthOption = {
  clientId: '321796684930-h19g04r8q4aoh805btuba5d0gl64m7h4.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account',
  hosted_domain: 'usach.cl'
}
Vue.use(GAuth, gauthOption)

kendo.culture("es-CL");
Vue.use(GanttInstaller);
Vue.use(VueResource);
Vue.use(VueIziToast);
Vue.use(AmCharts);
Vue.use(AmSerial);
Vue.use(Vuetify, {
 customProperties: true,
 iconfont: 'fa',
 theme:{
  warning:'#EA7600'
 }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
