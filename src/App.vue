    
<template>
  <div id='app'>
    <v-app>
    
      
      <sidebar-menu v-if="isSignIn" @collapse="onCollapse" @itemClick="onItemClick" 
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
            <template  v-slot:activator="{ on }">
              <span  v-on="on">
                <!-- <v-btn flat icon href="/login" class="g-signin2" @click="onSignIn">
                <v-icon>account_circle</v-icon>
                </v-btn> -->
                <!-- <v-btn v-if="isSignIn" flat icon @click="logout">
                  <v-icon>input</v-icon>
                </v-btn>

                <v-btn v-else flat icon @click="login">
                  <v-icon>account_circle</v-icon>
                </v-btn> -->
                <div v-if="isSignIn">
                  <v-menu  v-model="popup" :close-on-content-click="false" :nudge-width="200" :nudge-bottom="40" :nudge-left="330" offset-x transition="scale-transition" origin="top right">
                    <template  v-slot:activator="{ on }">
                      <v-btn v-on="on" icon>
                        <v-avatar size="32px">
                          <img :src="user.Paa">
                        </v-avatar>
                      </v-btn>
                    </template>

                    <v-card id="tarjeta">
                      <v-list>
                        <v-list-tile avatar>
                          <v-list-tile-avatar>
                            <img :src="user.Paa" alt="John">
                          </v-list-tile-avatar>

                          <v-list-tile-content>
                            <v-list-tile-title>{{user.ig}}</v-list-tile-title>
                            <v-list-tile-sub-title>{{user.U3}}</v-list-tile-sub-title>
                          </v-list-tile-content>

                          <v-list-tile-action>
                            <v-btn
                              :class="fav ? 'red--text' : ''"
                              icon
                              @click="fav = !fav"
                            >
                              <v-icon>favorite</v-icon>
                            </v-btn>
                          </v-list-tile-action>
                        </v-list-tile>
                      </v-list>

                      <v-divider></v-divider>

                      <!-- <v-list>
                        <v-list-tile>
                          <v-list-tile-action>
                            <v-switch v-model="message" color="purple"></v-switch>
                          </v-list-tile-action>
                          <v-list-tile-title>Enable messages</v-list-tile-title>
                        </v-list-tile>

                        <v-list-tile>
                          <v-list-tile-action>
                            <v-switch v-model="hints" color="purple"></v-switch>
                          </v-list-tile-action>
                          <v-list-tile-title>Enable hints</v-list-tile-title>
                        </v-list-tile>
                      </v-list> -->

                      <v-card-actions>
                        <v-spacer></v-spacer>

                        <!-- <v-btn flat @click="popup = false">Cancel</v-btn> -->
                        <v-btn color="primary" flat @click="logout">Cerrar sesión</v-btn>
                        
                      </v-card-actions>
                    </v-card>
                  </v-menu>
                </div>
                <div v-else>
                  <v-btn flat icon @click="login">
                    <v-icon>account_circle</v-icon>
                  </v-btn>
                </div>
                


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
import {mapState,mapActions} from 'vuex'
import LoaderState from '@/components/Loader.vue'
 export default {
   name: 'app',
   components: {
    SidebarMenu
  },
  computed:{
        ...mapState(['isInit','isSignIn','user'])
  },
  data() {
      return {
        
        state: true,
        popup:false, 
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
              
              title: 'Gestionar',
              icon: 'fas fa-users-cog',
              child: [
                    { href: '/gestionprofesores',
                      title: 'Gestionar Profesores',
                      icon: 'fas fa-chalkboard-teacher'
                    },
                    { href: '/gestionalumnos',
                      title: 'Gestionar Alumnos',
                      icon: 'fas fa-address-book'
                    },
                    { href: '/gestionmemorias',
                      title: 'Gestionar Memorias',
                      icon: 'fas fa-file-alt'
                    }
              ] 
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
              title: 'Revisión',
              icon: 'fas fa-user-edit'
            }

            ],
            selectedTheme: 'white-theme'

      }
    },
    methods: {
        ...mapActions(['obtenerTopicos','obtenerTesis']),
        login(){
          this.$gAuth.signIn()
          .then(GoogleUser => {
            this.$store.commit('actualizarUser',GoogleUser.w3);
            // this.user = GoogleUser.w3;
            // On success do something, refer to https://developers.google.com/api-client-library/javascript/reference/referencedocs#googleusergetid
            // console.log('user', GoogleUser)
            // console.log(GoogleUser.getId())
            // console.log(GoogleUser.getBasicProfile())
            // console.log(GoogleUser.getAuthResponse())
            // GoogleUser.getId() : Get the user's unique ID string.
            // GoogleUser.getBasicProfile() : Get the user's basic profile information.
            // GoogleUser.getAuthResponse() : Get the response object from the user's auth session. access_token and so on
            this.$store.commit('actualizarisSignIn',this.$gAuth.isAuthorized);
            this.$router.push('/'); 
            // this.isSignIn = this.$gAuth.isAuthorized;
            // console.log(this.isSignIn);
          })
          .catch(error  => {
            //on fail do something
          })
        },
        logout(){
          this.$gAuth.signOut()
          .then(() => {
            // things to do when sign-out succeeds
            this.$store.commit('actualizarisSignIn',this.$gAuth.isAuthorized);
            this.$router.push('/login'); 
            // this.isSignIn = this.$gAuth.isAuthorized;
          })
          .catch(error  => {
            // things to do when sign-out fails
          })
        },
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
    },
    mounted: async function() {
      let that = this;
      let checkGauthLoad = await setInterval(function() {
        // that.isInit = that.$gAuth.isInit;
        that.$store.commit('actualizarInit',that.$gAuth.isInit);
        // that.isSignIn = that.$gAuth.isAuthorized;
        that.$store.commit('actualizarisSignIn',that.$gAuth.isAuthorized);
        // that.user =  that.$gAuth.GoogleAuth.currentUser.Aia.value.w3;
        that.$store.commit('actualizarUser',that.$gAuth.GoogleAuth.currentUser.Aia.value.w3);
        // console.log(that.user);
        if (that.isInit) clearInterval(checkGauthLoad);
      }, 1000);
    },
    watch:{
      isSignIn: function(){
        if(this.isSignIn == true){
          this.$router.push('/');
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
#tarjeta{
  
  margin-top: 0px;
  margin-bottom: 0px;
  
}
#menu{
  top: 44px;
}
</style>

