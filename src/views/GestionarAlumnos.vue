<template>
<div>
  <v-flex md12>
        <h1 class="display-2 font-weight-thin mb-4 white--text">Gestión de alumnos</h1>
        <v-divider dark ></v-divider>
        <h4 class="subheading white--text text-xs-left pa-2">Registro de nuevos alumnos y memorias
        </h4>
  </v-flex>
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
            v-model="yearOfEntry"
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
            ref="form1"
            v-model="valid1"
            lazy-validation>

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
                v-model="topicosSelection"
                :items="topicos"
                name="Topico"
                label="Seleccione tópico"
                return-object
                >
                <template slot="selection" slot-scope="data">
                    <v-flex >
                    {{ data.item.name }}
                    </v-flex>
                </template>
                <template slot="item" slot-scope="data">
                    <v-list-tile-content>
                    <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                    </v-list-tile-content>
                </template>
            </v-select>
            
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
          :disabled="!valid1"
          @click="validate2"
        >
          Siguiente
        </v-btn>
        <v-btn flat>Cancelar</v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-container grid-list-md text-xs-center>
          <v-layout row wrap>
            <v-flex xs5>
              <v-card>
                <h4 class="subheading pt-3">Resumen alumno
                </h4>
                <v-divider class="ma-3"></v-divider>
                <v-list three-line>
                  <div class="subheading text-md-left ml-3">Datos personales:</div>
                  <v-subheader>
                    Nombre: {{ alumn.name + ' '+alumn.firstLastName + ' '+alumn.secondLastName}}
                  </v-subheader>
                  <v-subheader>
                    Correo: {{ alumn.email}}
                  </v-subheader>
                  

                  <div class="subheading text-md-left ml-3">Datos sobre la Memoria:</div>
                  <v-subheader>
                    Titulo: {{ these.title}}
                  </v-subheader>
                  <!-- <v-subheader>
                    Desc: {{ alumn.these.description}}
                  </v-subheader> -->
                  <v-subheader>
                    Tópico: {{ nameThese}}
                  </v-subheader>
                  <v-subheader>
                    Profesor guía: {{ profesoresSelection.name +" "+ profesoresSelection.firstLastName +" "+ profesoresSelection.secondLastName}}
                  </v-subheader>
                  <!-- <template v-for="(item, index) in list">
                    <v-subheader
                      v-if="item.header"
                      :key="item.header"
                      
                    >
                    {{ item.header + ' '+alumn.name}}
                    </v-subheader>
                    <v-subheader
                      v-if="item.header"
                      :key="item.header"
                      
                    >
                    {{ item.header + ' '+alumn.name}}
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
                        <v-list-tile-title v-html="item.title + ''+ alumn.these.title"></v-list-tile-title>
                        <v-list-tile-sub-title v-html="item.subtitle + '' + alumn.these.description"></v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </template> -->
                </v-list>
              </v-card>
            </v-flex>
            <v-flex xs2>  
              <img src=".././assets/flecha.svg" alt="Smiley face" height="42" width="42">
            </v-flex>
            <v-flex xs3>
                 
              <v-card id="card1">
                <h4 class="subheading pt-3">Profesor guía
                </h4>
                <v-divider></v-divider>
                <v-form 
                  ref="form2"
                  v-model="valid2"
                  lazy-validation
                >
                <v-select
                    v-model="profesoresSelection"
                    :items="TotalProfessors"
                    name="Topico"
                    label="Seleccione profesor"
                    return-object
                    >
                    <template slot="selection" slot-scope="data">
                        <v-flex >
                        {{ data.item.name + ' '+data.item.firstLastName+ ' '+data.item.secondLastName}}
                        </v-flex>
                    </template>
                    <template slot="item" slot-scope="data">
                        <v-list-tile-content>
                        <v-list-tile-title v-html="data.item.name + ' '+data.item.firstLastName+ ' '+data.item.secondLastName"></v-list-tile-title>
                        </v-list-tile-content>
                    </template>
                </v-select>
                </v-form>
              </v-card>
              
            </v-flex>
          </v-layout>
        </v-container>
        <v-btn
         color="primary"
          :disabled="!valid2"
          @click="FinalvalidateSubmit"
        >
          Siguiente
        </v-btn>
        <v-btn flat>Cancelar</v-btn>
      </v-stepper-content>
    </v-stepper-items>
    <loader-state></loader-state>
  </v-stepper>

  <v-divider dark ></v-divider>
  

    <v-flex xs12>
      <h4 class="headline text-md-left font-weight-light mb-3 white--text">Listado de alumnos</h4>
      <v-toolbar flat color="white">
      <v-toolbar-title>Listado de estudiantes</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-dialog v-model="dialog" max-width="700px">
        <v-card>
          <v-toolbar color="teal" dark>
            <v-toolbar-side-icon></v-toolbar-side-icon>
            <v-toolbar-title class="text-xs-center">Comision revisora</v-toolbar-title>
          </v-toolbar>
            <v-list subheader>
              <v-subheader>Docentes:</v-subheader>
              <div v-if="comision.length > 0">
                <v-list-tile
                v-for="item in comision"
                :key="item.id"
                avatar
                >
                  <v-list-tile-avatar>
                    <img :src="item.imageUrl">
                  </v-list-tile-avatar>    
                  <v-list-tile-content>
                    <v-list-tile-title v-html="item.name"></v-list-tile-title>
                  </v-list-tile-content>    
                </v-list-tile>
              </div>
              <div v-else>
                <v-card-text id="text">
                  {{message}}
                </v-card-text>
              </div>         
            </v-list>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Volver</v-btn>
            
          </v-card-actions>
        </v-card>
      </v-dialog>
      
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="totalAlumnos"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td class="text-xs-left">{{ props.item.name +' '+ props.item.firstLastName + ' ' +props.item.secondLastName}}</td>
        <td class="text-xs-left">{{ props.item.email }}</td>
        
        <!-- <td class="text-xs-right">{{ props.item.fat }}</td>
        <td class="text-xs-right">{{ props.item.carbs }}</td>
        <td class="text-xs-right">{{ props.item.protein }}</td> -->
        <td class="text-xs-left"  align-center justify-center row fill-height>
          <v-icon
            color="orange darken-2"
            @click="editItem(props.item)"
          >
            group
          </v-icon>
          
        </td>
      </template>
      <template v-slot:no-results>
        <v-alert :value="true" color="error" icon="warning">
          No se encontraron coincidencias para "{{ search }}".
        </v-alert>
      </template>
    </v-data-table>
    </v-flex>
  


  </div>
</template>

<script>
// @ is an alias to /src
import Vue from 'vue'
import Vuetify from 'vuetify'
import {mapState,mapActions} from 'vuex'
Vue.use(Vuetify)
import LoaderState from '@/components/Loader.vue'
import iziToast from 'izitoast'

export default {
    components:{
        LoaderState
    },
    computed:{
        ...mapState(['totalTesis','totalAlumnos','topicos','tesis','professors','TotalProfessors','notificationSystem','estadoAsignacion','area','estadoEliminacion'])
    },
    data () {
      return {
        message: '',
        dialog:false,
        editedIndex: -1,
        editedItem: {
            title: '',
            description: '',
            guideId: '',
            topicId: ''
        },
        search:'',
        headers: [
          {
            text: 'Alumnos',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Email',value: 'email'},
          { text: 'Ver comision', sortable: false }
        ],
        profesoresSelection: 'No elegido',
        topicosSelection: '',
        e1: 0,
        valid: true,
        valid1:true,
        valid2:true,
        yearOfEntry:null,
        selectopic: null,
        selectprof:null,
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
        topics: [],
        titleRules: [
          v => !!v || 'Es requerido'
        ],
        descriptionRules: [
          v => !!v || 'Es requerido'
        ],
        list: [
          { header: 'Alumno:'  },
          {
            title: 'Titulo:',
            subtitle: "<span class='text--primary'>Descripción:</span> " 
          }
        ],
        professors: [],
        nameThese:'',
        these:{
            title: '',
            description: '',
            studentId: null,                          
            guideId: null,
            topicId: null
        },
        professor:[],
        alumn : {
            name:'',
            firstLastName: '',
            secondLastName: '',
            income: null,
            email: '',
            codeProgram: 1363
            
        },
        alumnosTotal: [],
        tesisTotal: [],
        comision:[]
      }
    },
    methods: {
      ...mapActions(['obtenerTesisAll','obtenerAlumnos','obtenerProfesores','obtenerTopicos']),
      validate () {
        if (this.$refs.form.validate()) {
          this.alumn.name = this.name;
          this.alumn.firstLastName = this.firstLastName;
          this.alumn.secondLastName = this.secondLastName;
          this.alumn.email = this.email;
          this.alumn.income = this.yearOfEntry;
          this.e1 = 2
        }
      },
      validate2 () {
        if (this.$refs.form1.validate()) {
          this.these.title = this.title;
          this.these.description = this.description;
          this.nameThese = this.topicosSelection.name;
          this.e1 = 3
        }
      },
      FinalvalidateSubmit () {
        if (this.$refs.form2.validate()) { 
          this.these.guideId = this.profesoresSelection.id;
          this.these.topicId = this.topicosSelection.id;
          this.e1 = 1
          this.agregarAlumno()
        }
        
      },
      agregarAlumno: async function(){  
        this.$store.commit('cambiarEstadoDialog',{data1:true,data2:"Creando estudiante..."});
        confirm('¿seguro que desea agregar a este alumno/a?') && this.$http.post('http://34.228.238.196:9090/students/create',this.alumn).then(response=>{
            
            this.$refs.form1.reset()
            this.$refs.form.reset()
            this.$refs.form2.reset()
            console.log(response.body);
            this.these.studentId = response.body.id;
            console.log(response.body.id);
            this.$http.post('http://34.228.238.196:9090/theses/create',this.these).then(response=>{
             this.$store.commit('cambiarEstadoDialog',{data1:true,data2:"Asignando memoria..."});
             this.$refs.form1.reset()
                 this.$refs.form.reset()
                 this.$refs.form2.reset()
                 console.log("SUCCESS");
                 this.$store.commit('cambiarEstadoDialog',{data1:false,data2:""});
                 this.$toast.success("Alumno ingresado correctamente al sistema", 'OK', this.notificationSystem.options.success);
                 console.log(response.body);
            }, response=>{
              console.log("ERROR VINCULANDO LA TESIS");
            });
		    }, response=>{
            console.log("ERROR AGREGANDO EL ALUMNO");
        });
        // this.$http.post('http://34.228.238.196:9090/theses/create',these).then(response=>{
		    //  this.$refs.form1.reset()
        //      this.$refs.form.reset()
        //      this.$refs.form2.reset()
		    // }, response=>{
		    	
        // });
       
      },
      editItem (item) {
          //console.log(item.id);
          this.dialog = true;
          //var holas = this.alumnosTotal.filter(alumno => alumno.id == this.tesisTotal.student.id);
          // si el alumno tiene mas de una tesis asignada, se retornará tambien
          const comision = this.tesisTotal.filter(tesis => tesis.student.id == item.id);
          if(!comision[0].teacherCommission1){
            this.message = "No existe comision constituida para este alumno"
          }
          else{
            this.comision.push(comision[0].teacherCommission1);
          }

          if(!comision[0].teacherCommission2){
            this.message = "No existe comision constituida para este alumno"
          }
          else{
            this.comision.push(comision[0].teacherCommission2);
          }
          //console.log(hola[0].title);
      },
      close () {
          this.comision = [],
          this.dialog = false;
      },
      async save() {
      
      },
      filtrarComision(){
        console.log("dwadwad");
        this.comision = this.alumnosTotal.filter(alumno => alumno.id == this.tesisTotal.student.id);
        console.log(hola);
      }
    },
    watch:{
      totalAlumnos: function(){
        this.alumnosTotal = this.totalAlumnos;
      },
      totalTesis:function(){
        this.tesisTotal = this.totalTesis;
      }
    },
    async mounted(){
      await this.obtenerProfesores();
      await this.obtenerTopicos();
      await this.obtenerAlumnos();
      await this.obtenerTesisAll();
    },  
  }
  
</script>
<style>
#card1{
  
 padding-left: 20px;
 padding-right: 20px;

 }
 

</style>

