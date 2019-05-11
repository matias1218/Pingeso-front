<template>
  <div id="home">
     <main>
       <v-container fluid fill-height class="loginOverlay" >
          <v-layout flex align-center justify-center>
            <v-flex xs11 sm6 elevation-6 >
              <v-toolbar class="blue darken-4">
                <v-toolbar-title class="white--text"><h4>Bienvenido/a</h4></v-toolbar-title>
              </v-toolbar>
              <v-card>
                <v-card-text class="pt-4">
                  <div>
                      <v-form v-model="valid" ref="form">
                        <v-text-field
                          prepend-icon="person"
                          label="Ingrese email"
                          v-model="email"
                          :rules="emailRules"
                          required
                        ></v-text-field>
                        <v-text-field
                          prepend-icon="lock"
                          label="Ingrese password"
                          v-model="password"
                          min="8"
                          :append-icon="e1 ? 'visibility_off' : 'visibility'"
                          :append-icon-cb="() => (e1 = !e1)"
                          :type="e1 ? 'password' : 'text'"
                          :rules="passwordRules"
                          counter
                          required
                        ></v-text-field>
                        <v-layout justify-space-between>
                            <v-btn color="primary" :class="{ 'blue darken-4 white--text' : valid, disabled: !valid }">Login</v-btn>
                            <a href="">Olvidé mi contraseña</a>
                        </v-layout>
                      </v-form>
                  </div>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
       </v-container>
     </main>
   
 </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Vue from 'vue'
import Vuetify from 'vuetify'
Vue.use(Vuetify)

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data () {
      return {
            valid: false,
            e1: true,
            password: '',
            passwordRules: [
              (v) => !!v || 'Password es requerido',
    
            ],
            email: '',
            emailRules: [
              (v) => !!v || 'Email es requerido',
              (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Email debe ser válido'
            ],
          }
  },
  methods: {
     submit () {
            if (this.$refs.form.validate() ) {
              this.$refs.form.$el.submit()
            }
        },
     clear () {
            this.$refs.form.reset()
          }
  }
}
  
</script>
<style>
.main{
  margin:1em auto;
}


</style>
