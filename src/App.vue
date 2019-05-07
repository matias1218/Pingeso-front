<template>
  <div id="app" >
    <sidebar-menu 
     :menu="menu" 
     :theme="selectedTheme"
     :show-one-child="true"/>

   
    <router-view/>
  </div>
</template>
<script>
import { SidebarMenu } from 'vue-sidebar-menu'



 export default {
   
   components: {
    SidebarMenu
  },
    data() {
      return {
        menu: [
          {
            header: true,
            title: 'DIINF',
            // component: componentName
            // visibleOnCollapse: true
            // class:''
            // attributes: {}
            },
            {
             href: '/',
             title: 'Inicio',
             icon: 'fa fa-download'       
              },
            {
              href: '/gestionprofesores',
              title: 'Gestionar Profesores',
              icon: 'fas fa-chalkboard-teacher', 
            },
            {
              href: '/',
              title: 'Asignación de correcciones',
              icon: 'fas fa-id-card-alt', 
            },
            {
              href: '/',
              title: 'Ver estadísticas',
              icon: 'fas fa-chart-line', 
            },
              {
                href:'/topicsByTeacher',
                title: 'Topicos',
                icon: 'fa fa-th-large'
              },

            ],
            selectedTheme: 'white-theme'

            }
        }
    }


</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background:  linear-gradient(180deg, #EA7600 14%, #002F6C  14%);
  background-repeat:no-repeat;
  background-attachment:scroll;
  background-position:center top; 
  height:800px;
  
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>

