import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import TopicsTeacher from './views/TopicsByTeacher.vue'
import GestionarProfesores from './views/GestionarProfesores.vue'
import Asignaciones from './views/Asignaciones.vue'
import VerAsignaciones from  './views/VerAsignaciones.vue'
import Estadisticas from './views/Estadisticas.vue'
import Portada from './views/Portada.vue'
import Calendar from './views/Calendar.vue'
import Revision from './views/Revision.vue'



Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/topicsByTeacher',
      name: 'topicsTeacher',
      component: TopicsTeacher
    },
    {
      path: '/gestionprofesores',
      name: 'gestionarProfesores',
      component: GestionarProfesores
    },
    {
      path: '/asignaciones',
      name: 'asignacionProfesores',
      component: Asignaciones
    },
    {
      path: '/verAsignaciones',
      name: 'verAsignaciones',
      component: VerAsignaciones
    },
    {
      path: '/estadisticas',
      name: 'estadisticas',
      component: Estadisticas
    },
    {
      path: '/',
      name: 'Portada',
      component: Portada
    },
    {
      path: '/calendar',
      name: 'Calendar',
      component: Calendar
    },
    {
      path:'/revision',
      name: 'revision',
      component: Revision
    }
  ]
})
