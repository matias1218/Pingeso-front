<template>
    <v-content>
        <v-container >
            <v-layout align-start justify-space-between wrap row>
                <v-flex md12>
                    <h1 class="display-2 font-weight-thin mb-3 white--text">Asignaciones de memorias</h1>
                    <h4 class="subheading white--text">Listado de correcciones sin asignar. Arrastre las memorias del listado 
                        izquierdo hacia las tarjetas de cada profesor para asignar las memorias
                    </h4>
                </v-flex>
                <v-flex md7 class="elevation-2 pa-1 mt-3">
                    <v-list two-line>
                        <v-subheader>
                            MEMORIAS SIN ASIGNAR
                        </v-subheader>
                        <v-divider></v-divider>
                        <draggable v-model="tesis" :options="{group:'people'}" style="min-height: 10px">
                            <template v-for="item in tesis">
                                <v-list-tile :key="item.id" avatar>
                                    <!-- <v-list-tile-avatar>
                                        <img :src="item.avatar">
                                    </v-list-tile-avatar> -->
                                    <v-list-tile-content>
                                        <v-list-tile-title v-html="item.title"></v-list-tile-title>
                                        <v-list-tile-sub-title v-html="item.description"></v-list-tile-sub-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                            </template>
                        </draggable>
                    </v-list>
                </v-flex>
                <v-flex md5 class="elevation-1 pa-1 mt-3">
                    <!-- se debe generar una lista por profesor -->
                    <v-list two-line>
                    <v-subheader>
                         <v-flex xs12 sm6 d-flex>
                            <v-select
                             v-model="profesorActual"
                             :items="professors"
                             name="profesor"
                             label="Seleccione un profesor..."
                             return-object
                             single-line
                             item-text="name"
                             item-value="id"
                             ></v-select>
                            </v-flex>
                    </v-subheader>
                    <v-divider></v-divider>
                        <draggable v-model="tesisAsignadas" :options="{group:'people'}" style="min-height: 10px">
                            <template v-for="item in tesisAsignadas">
                                <v-list-tile :key="item.id" avatar>
                                    <v-list-tile-avatar>
                                        <img :src="item.avatar">
                                    </v-list-tile-avatar>
                                    <v-list-tile-content>
                                        <v-list-tile-title v-html="item.title"></v-list-tile-title>
                                        <v-list-tile-sub-title v-html="item.description"></v-list-tile-sub-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                            </template>
                        </draggable>
                    </v-list>
                    <!-- ------------------------------------- -->
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
</template>

<script>
import draggable from "vuedraggable";
import {mapState, mapActions} from 'vuex'
import LoaderState from '@/components/Loader.vue'
export default {
    components:{
        draggable,
        LoaderState
    },
    computed:{
        ...mapState(['tesis','professors','TotalProfessors'])
        // tesisParaAsignar:{
        //    get(){
        //      var nuevaVariable = this.tesis;
        //      return nuevaVariable;
        //    }
        // }
    },
    data() {
        return {
            profesorActual: [],
            profesor1:[],
            tesisAsignadas:[]
        };
    },
    methods:{
      obtenerAsignaciones: async function(profesor){
        const data = await fetch('http://23.20.84.8:9090/theses/commission/'+profesor.id);
        const tesisAsignadas = await data.json();
        return tesisAsignadas;
      }
    },
    watch:{
      profesorActual: async function(){
        this.tesisAsignadas = await this.obtenerAsignaciones(this.profesorActual);
      }
    },
    mounted: function(){
      // no puede haber una copia porque las tesis deben ser asignadas a mas de un profesor
      //this.copiaTesis = this.tesis;
      // obtener los profesores totales
    }
}
</script>

<style>
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
</style>
