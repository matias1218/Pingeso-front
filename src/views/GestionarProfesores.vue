<template>
  <div id="gestionprofesores">
   <v-app>
    <v-card id="card1">
     <v-card-title>
         Gestionar Profesores    
      </v-card-title>
      <v-form v-model="valid">
      <v-container>
        <v-layout>
          <v-flex
            xs12
            md4
          >
            <v-text-field
              v-model="firstname"
              :rules="nameRules"
              label="Nombre"
              required
            ></v-text-field>
          </v-flex>
  
          <v-flex
            xs12
            md4
          >
            <v-text-field
              v-model="lastname"
              :rules="nameRules"
              label="Apellidos"
              required
            ></v-text-field>
          </v-flex>
  
          <v-flex
            xs12
            md4
          >
            <v-text-field
              v-model="topic"
              :rules="topicRules"
              label="Tópico"
              required
            ></v-text-field>

          </v-flex>
          <v-flex
            xs12
            md4
          >
            <v-autocomplete
            ref="carga"
            v-model="carga"
            :rules="[() => !!carga || 'Carga horaria requerida']"
            :items="cargas"
            label="Jornada"
            required
          ></v-autocomplete>
            
          </v-flex>
        </v-layout>
      </v-container>
      <v-btn round color="info">Agregar</v-btn>
    </v-form>
    
     <v-card>
      <v-card-title>
        Listado Profesores
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="desserts"
        :search="search"
        
      >
        <template v-slot:items="props">
          <td>{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item.ap }}</td>
          <td class="text-xs-right">{{ props.item.carga }}</td>
          <td class="text-xs-right">{{ props.item.espe }}</td>
          <td >
            <v-icon
              small
              class="mr-2"
              @click="editItem(props.item)"
            >
              edit
            </v-icon>
            <v-icon
              small
              @click="deleteItem(props.item)"
            >
              delete
            </v-icon>
          </td>
        </template>
        <template v-slot:no-results>
          <v-alert :value="true" color="error" icon="warning">
             "{{ search }}" no se ha encontrado.
          </v-alert>
        </template>
      </v-data-table>
    </v-card>
    </v-card>
   </v-app>
 </div>
</template>

<script>
// @ is an alias to /src
import Vue from 'vue'
import Vuetify from 'vuetify'
Vue.use(Vuetify)

export default {
  name: 'gestionprofesores',
  data () {
      return {
     //Elementos form
     cargas: ['Completa', 'Por hora'],
     valid: false,
    firstname: '',
    lastname: '',
    nameRules: [
      v => !!v || 'Es requerido',
    ],
    topic: '',
    topicRules: [
      v => !!v || 'Tópico es requerido',
    ],
     //Elementos tabla
          search: '',
      headers: [
        {
          text: 'Nombre',
          align: 'center',
          sortable: false,
          value: 'name'
        },
        { text: 'Apellidos', value: 'ap',align: 'center' },
        { text: 'Jornada', value: 'carga', align: 'center' },
        { text: 'Tópico', value: 'espe', align: 'center' },
        { text: 'Acciones', value: 'action', align: 'center' }
      ],
      desserts: [
        {
          name: 'Nombre 1',
          ap: 'ap1',
          carga: 'jc',
          espe: 'e1',
        },
        {
          name: 'Nombre 2',
          ap: 'ap2',
          carga: 'por hora',
          espe: 'e2'
        },
        {
          name: 'Nombre 3',
          ap: 'ep3',
          carga: 'jc',
          espe:'e3'
        },
        {
          name: 'Nombre 4',
          ap: 'ep4',
          carga: 'por hora',
          espe: 'e4'
        },
        {
          name: 'Nombre 5',
          ap: 'ep5',
          carga: 'jc',
          espe: 'e5'
        }
      ]
          }
  },
  methods: {
  
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
