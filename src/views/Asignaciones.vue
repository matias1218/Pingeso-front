<template>
    <v-content>
        <v-container >
            <v-layout align-start justify-space-between wrap row>
                <v-flex md12>
                    <h1 class="display-2 font-weight-thin mb-3 white--text">Asignaciones de memorias</h1>
                    <h3 class="display-1 font-weight-thin mb-2 white--text"> Area: {{area}}</h3>
                    <h4 class="subheading white--text">Listado de correcciones sin asignar. Arrastre las memorias del listado 
                        izquierdo hacia la tarjeta de cada profesor seleccionado
                    </h4>
                    <v-divider dark ></v-divider>
                </v-flex>
                <v-flex md7 class="elevation-2 pa-1 mt-3">
                    <v-flex xs12>
                    <v-toolbar id="bar" dark>
                      <v-toolbar-title>Memorias sin asignar</v-toolbar-title>
                      <v-spacer></v-spacer>
                      
                      <v-btn v-if="display" icon>
                        <v-icon @click="showToolbar">keyboard_arrow_up</v-icon>
                      </v-btn>
                      <v-btn v-else icon>
                        <v-icon @click="showToolbar">keyboard_arrow_down</v-icon>
                      </v-btn>
                    </v-toolbar>
                    </v-flex>
                    <!-- selector para filtrar memorias por topico -->
                    <v-flex xs12>
                    <v-toolbar v-show="display" card color="#D6D1CE" >
                        <v-layout row wrap>
                          <v-flex style="margin-top:23px" md6 d-flex>
                              <v-select
                                v-model="topicosSelection"
                                :items="topicosSelector"
                                name="Topico"
                                label="Filtrar por tópico"
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
                          </v-flex>
                          <v-spacer></v-spacer>
                          <v-flex  md5 d-flex style="margin-top:23px">
                             <v-text-field
                              v-model="profesorGuia" 
                              label="Filtrar por profesor Guía"
                              placeholder="Escriba un nombre"
                            ></v-text-field>
                          </v-flex>
                        </v-layout>
                      
                    </v-toolbar>
                    </v-flex>
                    <v-list>
                        <draggable v-model="filteredTheses" :options="{group:'people'}" style="height:600px;overflow:scroll">
                            <template v-for="item in filteredTheses" >
                                <v-card :key="item.id" avatar @click="" class="elevation-0" >
                                    <v-card-title class="py-2">
                                      <div>
                                        <h5 class="text-sm-left" v-html="item.title"></h5>
                                        <div class="text-sm-left">
                                          <v-chip>
                                            <v-avatar>
                                              <img :src="item.teacherGuide.imageUrl">
                                            </v-avatar>
                                            Guia: {{item.teacherGuide.name}}
                                          </v-chip>
                                        </div>
                                      </div>
                                    </v-card-title>
                                    <v-divider></v-divider>   
                                </v-card>
                            </template>
                        </draggable>
                    </v-list>
                </v-flex>
                <v-flex md5 class="elevation-1 pa-1 mt-3">
                    <!-- se debe generar una lista por profesor -->
                    <v-toolbar id="bar" dark>
                      <v-toolbar-title>Docentes</v-toolbar-title>
                    </v-toolbar>
                    <v-list two-line>
                    <v-subheader>
                        <v-flex id="selector" xs12  d-flex>
                            <v-select
                             v-model="profesorActual"
                             :items="professors"
                             name="profesor"
                             label="Seleccione un docente..."
                             height="45"
                             single-line
                             return-object
                             >
                              <template slot="selection" slot-scope="data">
                                <v-flex>
                                  <v-avatar size="34px">
                                    <img :src="data.item.imageUrl"/>
                                  </v-avatar>
                                </v-flex>
                                <v-flex >
                                  {{ data.item.name }}
                                </v-flex>
                              </template>
                              <template slot="item" slot-scope="data">
                                <v-list-tile-avatar>
                                  <img :src="data.item.imageUrl" />
                                </v-list-tile-avatar>
                                <v-list-tile-content>
                                  <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                                </v-list-tile-content>
                              </template>
                             </v-select>
                        </v-flex>
                    </v-subheader>
                    <v-divider></v-divider>
                    <!-- ---------------Parte donde se ven las memorias ya asignadas------------ -->
                    <!-- caso donde no se ha seleccionado profesor -->
                    <div v-if="tesisAsignadas.length <= 0">
                      <v-card class="elevation-0" >
                        <v-card-text v-if="profesorActual.length <= 0" id="text">
                          Seleccione un docente para ver sus memorias asignadas
                        </v-card-text>
                        <v-card-text v-else id="text">
                          Este docente no tiene memorias asignadas
                        </v-card-text>
                        <v-icon x-large>layers_clear</v-icon>
                      </v-card>
                    </div>
                    <!-- caso cuando se ha seleccionado un profesor -->
                    <div v-else>
                      <v-container class="pa-3">
                        <h4 class="subheading">Memorias asignadas</h4>
                        <v-divider></v-divider>
                      </v-container>
                      <template v-for="memoria in tesisAsignadas">
                          <v-list-tile :key="memoria.id">
                              <v-list-tile-content>
                                  <v-list-tile-title v-html="memoria.title"></v-list-tile-title>
                                  <v-list-tile-sub-title v-html="memoria.description"></v-list-tile-sub-title>
                              </v-list-tile-content>
                              <v-dialog v-model="dialog" persistent max-width="290">
                                <template v-slot:activator="{ on }">
                                  <v-btn flat icon color="red" dark v-on="on"><v-icon>delete</v-icon></v-btn>
                                </template>
                                <v-card>
                                  <v-card-title class="headline">Desasignar memoria a docente</v-card-title>
                                  <v-card-text>¿Está seguro que desea desasignar la memoria al docente actual?.</v-card-text>
                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="green darken-1" flat @click="dialog = false">Cancelar</v-btn>
                                    <v-btn color="green darken-1" flat @click="{eliminar(memoria),dialog = false}">Aceptar</v-btn>
                                  </v-card-actions>
                                </v-card>
                              </v-dialog>
                          </v-list-tile>
                      </template>
                    </div>
                    <!-- ------------------------------------------ -->
                    <v-divider></v-divider>
                        
                    <!-- Parte donde se van a asignar las nuevas memorias -->
                        <div v-if="nuevaAsignacion.length <= 0" id="mensaje">
                              <v-card class="elevation-0" >
                                <v-card-text id="text">
                                  Arrastre aqui para asignar
                                </v-card-text>
                                <v-icon x-large>arrow_downward</v-icon>
                              </v-card>
                        </div>
                        <div v-else>
                          <v-container class="pa-3">
                            <h4 class="subheading">Por asignar</h4>
                            <v-divider></v-divider>
                          </v-container>
                        </div>
                        <draggable v-model="nuevaAsignacion" :options="{group:'people'}" style="min-height: 10px" >
                            <template  v-for="item in nuevaAsignacion">
                                <v-list-tile :key="item.id" @click="">
                                    <v-list-tile-content>
                                        <v-list-tile-title v-html="item.title"></v-list-tile-title>
                                        <v-list-tile-sub-title v-html="item.description"></v-list-tile-sub-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                            </template>
                        </draggable>
                        <v-flex v-if="nuevaAsignacion.length > 0" class="text-xs-center">
                          <v-btn outline color="indigo" @click="asignar(nuevaAsignacion)">Asignar</v-btn>
                        </v-flex>
                    </v-list>
                    <loader-state></loader-state>
                    <!-- ------------------------------------- -->
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
</template>

<script>
import draggable from "vuedraggable";
import {mapState, mapMutations, mapActions} from 'vuex'
import LoaderState from '@/components/Loader.vue'
import iziToast from 'izitoast';
export default {
    components:{
        draggable,
        LoaderState
    },
    computed:{
        ...mapState(['tesis','professors','TotalProfessors','notificationSystem','estadoAsignacion','area','estadoEliminacion'])
    },
    data() {
        return {
            profesorGuia:'',
            display: false,
            topicosSelector:[{name:"Todos"},
                     {name:"Biología y Medicina"},
                     {name:"Informática Educativa"},
                     {name:"Aplicaciones y Sistemas Escalables para la Web"},
                     {name:"Sistemas Complejos"},
                     {name:"Redes y Seguridad"},
                     {name:"Interacción Humano-Computador"}],
            topicosSelection:'Todos',
            dialog:false,
            text:'',
            color:'',
            profesorActual: [],
            nuevaAsignacion:[],
            tesisAsignadas:[],
            filteredTheses:[]        
        };
    },
    methods:{
      ...mapActions(['asignarCorreccion','obtenerTesis','eliminarCorreccion']),
      obtenerAsignaciones: async function(profesor){
        const data = await fetch('http://34.228.238.196:9090/theses/commission/'+profesor.id);
        const tesisAsignadas = await data.json();
        return tesisAsignadas;
      },
      asignar: async function(tesisParaAsignar){ // aqui debe entrar nuevaAsignacion
        // verificar si la asignacion se hace al profesor guia
        if(this.verificarGuia(tesisParaAsignar[0].teacherGuide.id,this.profesorActual.id)){
          this.verificarGuia(tesisParaAsignar[0].teacherGuide.id,this.profesorActual.id);
          this.$store.commit('cambiarEstadoDialog',true);
          await this.asignarCorreccion({data1: tesisParaAsignar[0].id, data2: this.profesorActual.id});
          
          this.tesisAsignadas = await this.obtenerAsignaciones(this.profesorActual);
          await this.obtenerTesis();
          this.$store.commit('cambiarEstadoDialog',false);
          if(this.estadoAsignacion.response == true){
            this.$toast.success(this.estadoAsignacion.message, 'OK', this.notificationSystem.options.success);
          }
          else{
            this.$toast.warning(this.estadoAsignacion.message, 'Alto', this.notificationSystem.options.warning);
          }
        }
        else{
          console.log("nope")
        }
        
      },
      verificarGuia: function(profesor1,profesor2){
        if(profesor1 == profesor2){
          this.$toast.error('No se puede asignar la memoria al profesor guía', 'Alto', this.notificationSystem.options.error)
          return false;
        }
        else{
          return true;
        }
      },
      eliminar: async function(tesisParaEliminar){
        
        this.$store.commit('cambiarEstadoDialog',true);
        await this.eliminarCorreccion({thesisId: tesisParaEliminar.id,professorId: this.profesorActual.id});
        
        this.tesisAsignadas = await this.obtenerAsignaciones(this.profesorActual);
        await this.obtenerTesis();
        this.$store.commit('cambiarEstadoDialog',false);
        if(this.estadoEliminacion == true){
            this.$toast.success('Memoria desasignada correctamente!', 'OK', this.notificationSystem.options.success);
        }
        else{
          this.$toast.warning('No es posible desasignar la memoria', 'Alto', this.notificationSystem.options.warning);
        }
      },
      showToolbar: function(){
        if(this.display == false){
          this.display = true;
        }
        else{
          this.display = false;
        }
        //
      }
    },
    watch:{
      profesorActual: async function(){
        this.tesisAsignadas = await this.obtenerAsignaciones(this.profesorActual); 
      },
      topicosSelection: function(){
        // defecto
        if(this.topicosSelection.name == 'Todos'){
          this.filteredTheses = this.tesis
        }
        // seleccion
        else{
          this.filteredTheses = this.tesis.filter(tesis => tesis.topic == this.topicosSelection.name);
        }
        //console.log(fruits.filter(fruits => fruits.name == 'apples'));
      },
      profesorGuia: function(){
          this.filteredTheses = this.tesis.filter(tesis => {
            return tesis.teacherGuide.name.toLowerCase().includes(this.profesorGuia.toLowerCase());
          })
      }
      

    },
    mounted: async function(){
      // no puede haber una copia porque las tesis deben ser asignadas a mas de un profesor
      //this.copiaTesis = this.tesis;
      // obtener los profesores totales
      this.filteredTheses = await this.tesis;
    }
}
</script>

<style>
#filterToolbar{
  display: none;
}
#selector{
  margin-top: 17px;
}
.sdt-footer p {
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 16px;
}
.sdt-footer a {
  text-decoration: none;
}
.flip-list-move {
  transition: transform 0.3s;
}
.flip-list-item {
  display: inline-block;
  margin-right: 10px;
}
.flip-list-enter-active, .flip-list-leave-active {
  transition: all 0.3s;
}
.flip-list-enter, .flip-list-leave-to {
  opacity: 0;
  transform: translateY(-50px);
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: .5;
  background: #C8EBFB;
}
.dragArea {
  min-height: 528px;
  padding: 2px 15px !important;
}
.mdl-grid.center-items {
  justify-content: center;
}
.panel-body {
  margin-left: 10px;
  margin-bottom: -39px;
}
.forkme {
  position: absolute;
  top: 0;
  right: 0;
  border: 0;
  width: 150px;
}
.sdt-tag-icon {
  cursor: pointer;
}
 .sdt-tag-icon-left {
  margin-right: 10px;
}
 .sdt-tag-icon-right {
  margin-left: 10px;
}
.sdt-sortable-btn {
  margin: 10px 10px !important;
}
.sdt-json-section {
  padding: 0px 13px;
  height: 557px;
}
.sdt-json-section:hover {
  overflow: auto !important;
}
.sdt-json-pre {
  font-family: monospace;
  font-weight: lighter;
  font-size: 12px;
}
.sdt-header {
  text-align: center;
  color: rgba(0, 0, 0, 0.64);
  margin-bottom: 45px;
  margin-top: 30px;
}
.sdt-control-tag {
  visibility: hidden !important;
  width: 5px !important;
  background: transparent !important;
  box-shadow: none !important;
  color: transparent !important;
  margin-bottom: -64px !important;
}
.sdt-sort-button {
  float: right;
  float: right;
  z-index: 9;
  bottom: -29px;
  left: 14px;
  width: 100%;
}
.sdt-tag {
  cursor: -webkit-grab !important;
  padding: 8px !important;
  min-height: 5px !important;
}
.sdt-tag:hover {
  box-shadow: 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12), 0 5px 5px -3px rgba(0,0,0,.2);
}
.sdt-color-red {
  fill: #f44336;
  color: #f44336;
}
.sdt-color-gray {
  fill: #e0e0e0;
  color: #e0e0e0;
}
.sdt-color-teal {
  fill: #009688;
  color: #009688;
}
.sdt-color-indigo {
  fill: #3f51b5;
  color: #3f51b5;
}
.sdt-teal-switch > .mdl-switch.is-checked .mdl-switch__thumb {
  background-color: #009688 !important;
}
.sdt-teal-switch > .mdl-switch.is-checked .mdl-switch__track {
  background: rgba(0, 150, 136, 0.51) !important;
}
.mdl-switch__ripple-container .mdl-ripple {
  background: #009688 !important;
}
@media (min-width: 840px) {
  .sdt-json-section {
    top: 93px;
  }
}
#bar{
  background: #fe8c00;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #f83600, #fe8c00);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #f83600, #fe8c00); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
#text{
  color: rgb(151, 151, 151);
}
</style>