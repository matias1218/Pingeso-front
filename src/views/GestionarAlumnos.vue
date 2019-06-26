<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">Registrar Alumno</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2">Ingresar Memoria</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3">Asociar profesor</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card
          class="mb-5"
          height="300px"
        >
        
        <form>
    <v-text-field
      v-model="name"
      :error-messages="nameErrors"
      :rules="nameRules"
      :counter="10"
      label="Nombre"
      required
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
    ></v-text-field>

    <v-text-field
      v-model="firstLastName"
      :error-messages="nameErrors"
      :rules="nameRules"
      :counter="10"
      label="Primer apellido"
      required
      @input="$v.firstLastName.$touch()"
      @blur="$v.firstLastName.$touch()"
    ></v-text-field>

    <v-text-field
      v-model="secondLastName"
      :error-messages="nameErrors"
      :rules="nameRules"
      :counter="10"
      label="Segundo apellido"
      required
      @input="$v.secondLastName.$touch()"
      @blur="$v.secondLastName.$touch()"
    ></v-text-field>

    <v-text-field
      v-model="email"
      :error-messages="emailErrors"
      :rules="emailRules"
      label="Mail"
      required
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
    ></v-text-field>



  </form>
        
        
        
        
        
        
        </v-card>

        <v-btn
          color="primary"
          @click="e1 = 2"
        
        >
          Siguente
        </v-btn>

        <v-btn flat>Cancelar</v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card
          class="mb-5"
          color="grey lighten-1"
          height="200px"
        ></v-card>

        <v-btn
          color="primary"
          @click="e1 = 3"
        >
          Siguiente
        </v-btn>

        <v-btn flat>Cancelar</v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card
          class="mb-5"
          color="grey lighten-1"
          height="200px"
        ></v-card>

        <v-btn
          color="primary"
          @click="e1 = 1"
        >
          Siguiente
        </v-btn>

        <v-btn flat>Cancelar</v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
// @ is an alias to /src
import Vue from 'vue'
import Vuetify from 'vuetify'
Vue.use(Vuetify)

export default {
    data () {
      return {
        e1: 0,
        valid: false,
        firstname: '',
        lastname: '',
        nameRules: [
          v => !!v || 'Es requerido',
          v => v.length <= 10 || 'Debe poseer como máximo 10 carácteres'
        ],
        email: '',
        emailRules: [
          v => !!v || 'Mail es requerido',
          v => /.+@usach.cl.+/.test(v) || 'Ingrese mail institucional'
        ]
      }
    },
    methods: {
      validate () {
        if (this.$refs.form.validate()) {
          this.snackbar = true
        }
      }
      
    }  
  }
  
</script>
<style>
#card1{
 margin:1em auto;
 size: 60%;
 margin-right: 100px;

 }
 

</style>
