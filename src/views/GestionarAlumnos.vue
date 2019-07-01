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
          height="390px"
        >
        
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-text-field
      v-model="name"
      :rules="nameRules"
      :counter="10"
      label="Nombre"
      required
    ></v-text-field>

    <v-text-field
      v-model="firstLastName"
      :rules="namesRules"
      :counter="10"
      label="Primer apellido"
      required
    ></v-text-field>

    <v-text-field
      v-model="secondLastName"
      :rules="namesRules"
      :counter="10"
      label="Segundo apellido"
      required
    ></v-text-field>


    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="Mail"
      required
    ></v-text-field>

    <v-select
      v-model="select"
      :items="items"
      :rules="[v => !!v || 'El año de ingreso es requerido']"
      label="Año de ingreso"
      required
    ></v-select>
 
     <v-checkbox
      v-model="checkbox"
      :rules="[v => !!v || '¡Debe estar seguro para continuar!']"
      label="¿Está seguro que desea registrar a este alumno?"
      required
    ></v-checkbox>

      </v-form>
        </v-card>

        <v-btn
         :disabled="!valid"
          color="primary"
          @click="validate"
        >
          Siguente
        </v-btn>

        <v-btn flat>Cancelar</v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
              <v-card
          class="mb-5"
          height="390px"
        >
        
    <v-form
   
  >
      <v-text-field
      v-model="title"
      :rules="titleRules"
      label="Título"
      required
    ></v-text-field>

    <v-text-field
      v-model="description"
      :rules="descriptionRules"
      label="Descripción"
      required
    ></v-text-field>

    <v-select
      v-model="select"
      :items="topics"
      :rules="[v => !!v || 'El tópico al que pertenece el trabajo de titulación es requerido']"
      label="Tópico asociado al trabajo de titulación"
      required
    ></v-select>
 
     <v-checkbox
      v-model="checkbox1"
      :rules="[v => !!v || '¡Debe estar seguro para continuar!']"
      label="¿Está seguro que desea ingresar este trabajo de titulación o memoria?"
      required
    ></v-checkbox>

  </v-form>
        
        
        
        </v-card>
        <v-btn
          color="primary"
          @click="e1 = 3"
        >
          Siguiente
        </v-btn>

        <v-btn flat>Cancelar</v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
      


  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>

      <v-flex  xs4>
   
      <v-card>
        <v-list three-line>
          <template v-for="(item, index) in list">
            <v-subheader
              v-if="item.header"
              :key="item.header"
            >
              {{ item.header }}
            </v-subheader>

            <v-divider
              v-else-if="item.divider"
              :key="index"
              :inset="item.inset"
            ></v-divider>

            <v-list-tile
              v-else
              :key="item.title"
            >

              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
            </v-flex>



       
      <v-flex xs4>  
        <img src=".././assets/flecha.svg" alt="Smiley face" height="42" width="42">
      </v-flex>

         
      <v-flex xs4>   
         <v-card>


         
       
         <v-select
           v-model="select"
           :items="professors"
           :rules="[v => !!v || 'Seleccione al profesor asociado al trabajo de titulación']"
           label="Seleccione profesor"
           required
          ></v-select>

          </v-card>
                </v-flex>
 



  </v-layout>
  </v-container>




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
        valid: true,
        valid1:true,
        name:'',
        firstLastName: '',
        secondLastName: '',
        items: [
        2011,  
        2012,  
        2013,  
        2014,
        2015,
        2016
      ],
        nameRules: [
          v => !!v || 'Es requerido',
          v => (v && v.length <= 10)  || 'Debe poseer como máximo 10 carácteres'
        ],
        namesRules: [
          v => !!v || 'Es requerido',
           v => (v && v.length <= 10)  || 'Debe poseer como máximo 10 carácteres'
        ]
        ,
        email: '',
        emailRules: [
          v => !!v || 'Mail es requerido',
          v => /.+@.+/.test(v) || 'Ingrese mail institucional'
        ],
        checkbox: false,
        title:'',
        description: '',
        checkbox1: false,
        topics: [
       'topico1',  
       'topico2',  
       'topico3',  
       'topico4',
       'topico5',
       'topico6'
      ],
       titleRules: [
          v => !!v || 'Es requerido'
        ],
       descriptionRules: [
          v => !!v || 'Es requerido'
        ],
        select: null,


       list: [
          { header: 'Alumno:' },
          {
            title: 'Titulo:',
            subtitle: "<span class='text--primary'>Descripción:</span> Descripción "
          }
        ],
      professors: [
        'prof 1',
        'prof 2',
        'prof 3',
        'prof 4'
      ]



      }
    },
    methods: {
      validate () {
        if (this.$refs.form.validate()) {
          this.snackbar = true
          this.$refs.form.reset()
          this.e1 = 2
        }
        console.log(this.e1);
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
