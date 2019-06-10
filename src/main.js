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
import { GanttInstaller} from '@progress/kendo-gantt-vue-wrapper'

Vue.config.productionTip = false
// main.js
import '@fortawesome/fontawesome-free/css/all.css' // Ensure you are using css-loader
import Vuetify from 'vuetify'
import VueResource from 'vue-resource';

Vue.use(GanttInstaller);
Vue.use(VueResource);
Vue.use(VueIziToast);
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
