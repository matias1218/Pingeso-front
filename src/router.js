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
import Alumnos from './views/GestionarAlumnos.vue'
import store from './store'


Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'home',
      component: Home,
      meta: {
        requiresGuest: true
      }
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
      component: TopicsTeacher,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/gestionprofesores',
      name: 'gestionarProfesores',
      component: GestionarProfesores,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/asignaciones',
      name: 'asignacionProfesores',
      component: Asignaciones,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/verAsignaciones',
      name: 'verAsignaciones',
      component: VerAsignaciones,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/estadisticas',
      name: 'estadisticas',
      component: Estadisticas,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/',
      name: 'Portada',
      component: Portada,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/calendar',
      name: 'Calendar',
      component: Calendar,
      meta: {
        requiresAuth: true
      }
    },
    {
      path:'/revision',
      name: 'revision',
      component: Revision,
      meta: {
        requiresAuth: true
      }
    },
    {
      path:'/gestionalumnos',
      name: 'Gestionalumnos',
      component: Alumnos,
      meta: {
        requiresAuth: true
      }
    }
  ]
});


router.beforeEach((to,from,next) => { 
  // check for requiredAuth guard
  if(to.matched.some(record => record.meta.requiresAuth)){
    // check if not logged in
    if(!store.state.isSignIn){
      // go to login
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    } 
    else{
      next();
    }
  } 
  else if(to.matched.some(record => record.meta.requiresGuest)){
    if(store.state.isSignIn){  
      // go to dashboard
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
    } 
    else{
      next();
    }
  }
  else{
    next();
  }

});

export default router;

