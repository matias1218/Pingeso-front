    
<template>
  <div id="app" >
    <v-app>
    <sidebar-menu 
     :menu="menu" 
     :theme="selectedTheme"
     :collapsed="true"
     :show-one-child="true"/>
   
    <v-toolbar color="warning" dark extended height="80px" flat >
      <v-spacer></v-spacer>
      <v-btn flat icon>
        <v-icon>logout</v-icon>
      </v-btn>
    </v-toolbar>

    <v-container  style="margin-top: -114px;">
      <router-view/>
    </v-container>
    </v-app>
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
              //href: '/',
              title: 'Asignación de correcciones',
              icon: 'fas fa-id-card-alt', 
            },
            {
              //href: '/',
              title: 'Ver estadísticas',
              icon: 'fas fa-chart-line', 
            },
            {
              href:'/topicsByTeacher',
              title: 'Topicos',
              icon: 'fa fa-th-large'
            }

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
  /* background:  linear-gradient(180deg, #EA7600 14%,   14%); */
  background: #002F6C;
  background-repeat:no-repeat;
  background-attachment:scroll;
  background-position:center top; 
  
  
}
body{
  height:100vh;
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

