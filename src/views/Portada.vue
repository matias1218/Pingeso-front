<template>
 <div
    style=" margin:0"
  >

    <v-flex >
      <v-card>
        
        <v-card color="#DA5610" class="white--text" >
              <v-layout>   
                <v-flex >
                <img
                    src="https://www.informatica.usach.cl/multimedia/IngInf-RRSS-960x-900x275.png"
                    height="200px"
                    width="500px"
                    contain
                  /> 
                </v-flex>
                <v-flex >
                  <v-card-title primary-title>
                    <div>
                      <div class="headline" style="margin:1em auto;" >Sistema de asignación de profesores a comisiones correctoras</div>
                    </div>
                  </v-card-title>
                </v-flex>
              </v-layout>
              
            </v-card>

        <v-card-title >
            <h2  style="margin:1em auto;" 
            >¿Qué puedes hacer en este Sistema?
            </h2>

        </v-card-title>
        
          <v-card-text>

          <v-layout row >

          <v-flex xs6>
          <img src=".././assets/pc_portada.png" style="width:300px;height:400px;" >         

          </v-flex>
          
          <v-timeline
           align-top
           dense
         >
        <v-timeline-item
          color="blue"
          small
        >
          <v-layout pt-3>
            <v-flex xs10>
              <strong>
                 <h5>
                Conocer carga horaria de los profesores en comisiones correctoras 
                 </h5>
                 </strong>
            </v-flex>
          </v-layout>
        </v-timeline-item>
        <div>
          
          </div>
        <v-timeline-item
          color="red"
          small
        >
          <v-layout pt-3>
            <v-flex xs10>
              <strong>
                <h5>
                Asignar trabajos de titulación o tesis a profesores para comisiones correctoras 
                </h5>
              </strong>
            </v-flex>
          </v-layout>
        </v-timeline-item>

        <v-timeline-item
          color="blue"
          small
        >
          <v-layout wrap pt-3>
            <v-flex xs10>
              <strong>
                 <h5>
                 Asignar a profesores Guía trabajo(s) de titulación y tesis
                 </h5>
                 </strong>
            </v-flex>
            
          </v-layout>
        </v-timeline-item>
       
        
        <v-timeline-item
          color="red"
          small
        >
          <v-layout pt-3>
            <v-flex xs10>
              <strong>
                 <h5>
                Conocer estadísticas y tablas asociadas al proceso de asignación de profesores a comisiones correctoras
                 </h5>                
                </strong>
            </v-flex>
          </v-layout>
        </v-timeline-item>

        <v-timeline-item
          color="blue"
          small
        >
          <v-layout pt-3>
            <v-flex xs10>
              <strong>
                 <h5>
                Conocer asignaciones realizadas por profesor
                 </h5>
                </strong>
            </v-flex>
          </v-layout>
        </v-timeline-item>
        </v-timeline>

        </v-layout>


        </v-card-text>

         

       <v-footer class="pa-3">
      <v-spacer></v-spacer>
      <div>&copy; {{ new Date().getFullYear() }} — <strong>Javier Arredondo - Matías Paredes - Juan Barrera - Paloma Zamorano</strong></div>
    </v-footer>



      </v-card>

    </v-flex>
    
  </div>
</template>

<script>
// @ is an alias to /src
import Vue from 'vue'
import Vuetify from 'vuetify'
Vue.use(Vuetify)

export default {
  name: 'Portada',
  data () {
      return {
      }
  },
  methods: {
  
  }
}
  
</script>
<style>

 

</style>
