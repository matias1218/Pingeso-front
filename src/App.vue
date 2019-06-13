    
<template>
  <div id='app'>
    <v-app>
    
      <sidebar-menu @collapse="onCollapse" @itemClick="onItemClick" 
      :menu="menu" 
      width="310px"
      :theme="selectedTheme"
      :collapsed="state"
      :show-one-child="true"/>
    
      <v-toolbar color="warning" id="toolbar" dark flat >
        <v-spacer></v-spacer>



         <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <span v-on="on">
           <v-btn flat icon href="/calendar">
           <i class="fas fa-calendar-alt"></i>
        </v-btn>
        </span>
      </template>
      <span>Ver calendario</span>
    </v-tooltip>

         <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <span v-on="on">
           <v-btn flat icon href="/login">
          <v-icon>account_circle</v-icon>
        </v-btn>
        </span>
      </template>
      <span>Iniciar sesión</span>
    </v-tooltip>

       
      </v-toolbar>

      <v-container id="container">
        <router-view/>
      </v-container>
    </v-app>
  </div>
</template>
<script>
import { SidebarMenu } from 'vue-sidebar-menu'
import {mapActions} from 'vuex'

 export default {
   name: 'app',
   components: {
    SidebarMenu
  },
    data() {
      return {
        state: true,
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
              href: '/asignaciones',
              title: 'Asignación de correcciones',
              icon: 'fas fa-id-card-alt', 
            },
            {
              href: '/estadisticas',
              title: 'Ver estadísticas',
              icon: 'fas fa-chart-line', 
            },
            {
              href:'/topicsByTeacher',
              title: 'Topicos',
              icon: 'fa fa-th-large'
            },
            {
              href:'/revision',
              title: 'revision',
              icon: 'fas fa-user-edit'
            }

            ],
            selectedTheme: 'white-theme'

      }
    },
    methods: {
        ...mapActions(['obtenerTopicos','obtenerTesis']),
        onCollapse(collapsed) {
          if(this.state == false){
            document.getElementById("container").style.marginLeft = "11%";
            this.state = true;
          }
          else{
            document.getElementById("container").style.marginLeft = "21%";
            this.state = false;
          }  
        },
        onItemClick(event, item) {
            if(item.href == '/topicsByTeacher'){
              this.obtenerTopicos()
            }
            if(item.href == '/asignaciones'){
              this.obtenerTesis()
            }
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
  /* si se quiere sacar el gradiente se deben comentar las 2 ultimas linea*/
  /* background: #002F6C;
  background-repeat:no-repeat;
  background-attachment:scroll;
  background-position:center top; */
  background: -webkit-linear-gradient(to left, #004e92, #000428);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to left, #004e92, #000428); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
 
  
  
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
#container{
  /* margin-top: -114px; */
  
}
#toolbar{}
</style>

