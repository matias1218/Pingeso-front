<template>
  <div id="view" data-app="true">
    <v-card>
      <v-card-title >
            <span class="headline"  >Temas asignados por profesor</span>
          </v-card-title>

      <v-tree-data-table :headers="headers" :items="items" :pagination="pagination" 
      :loading="loading" :total-items="totalItems" @load="load" 
       >
        <template slot="row" slot-scope="props">
          <td class="text-xs-left">{{props.item.name}}</td>
          <td class="text-xs-left">{{props.item.revition}}</td>
          <td class="text-xs-left">{{props.item.time}}</td>
        </template>
      </v-tree-data-table>

    </v-card>

    </div>

</template>

<script>
// @ is an alias to /src
// import Styles
import "vuetify/dist/vuetify.min.css";

// import Vue
import Vue from 'vue'

import TreeDataTable from 'v-tree-data-table';
Vue.component('v-tree-data-table', TreeDataTable);
// import Vuetify
import Vuetify from "vuetify";
Vue.use(Vuetify, {
  theme: {
    primary: "#0D4163",
    secondary: "#e5e5e5",
    accent: "#ff0000",
    error: "#f44336",
    warning: "#ffeb3b",
    info: "#2196f3",
    success: "#4caf50"
  }
});

export default {
  name: 'view',
  components: {
    "v-tree-data-table": TreeDataTable
  },
  data () {
      return {
        loading: false,
        pagination: {
                ascending: true,
                rowsPerPage: 5,
                page: 1
        },
        totalItems: 3,
        align: 'left',
        sortable: false,
        headers: [
      {
        text: "Nombre profesor/temas",
        value: "name"
      },
      {
        text: "Fecha revisión",
        value: "revition"
      },
      {
        text: "Fecha defensa tema",
        value: "defense"
      }
    ],
    items: []
      }
  },
  methods: {
      /**
     * Load the records
     * @param {Object} pagination Pagination data from the DataTable
     */
    load(pagination) {
      this.pagination = pagination;
      this.$nextTick(() => {
        this.items = [
          {
            id: 1,
            name: "Victor Parada",
            align: 'left',
            sortable: false,
            depth: 1,
            children: [
              {
                id: 1.1,
                name: "tema1",
                revition: "Child of Root",
                time:"1",
                depth: 2,
                leaf: true,
              },{
                id: 1.2,
                name: "tema1",
                revition: "Child of Root",
                time:"1",
                depth: 2,
                leaf: true,
              }
            ]
          },{
            id: 2,
            name: "Fernanda Kri",
            depth: 1,
            revition:"hola",
            align: 'left',
            sortable: false,
            children: [
              {
                id: 2.1,
                name: "tema1",
                revition: "Child of Root",
                time:"1",
                depth: 2,
                leaf: true,
              },{
                id: 2.2,
                name: "tema1",
                revition: "Child of Root",
                time:"1",
                depth: 2,
                leaf: true,
              }
            ]
          }
          ,{
            id: 3,
            name: "Fernanda Kri",
            depth: 1,
            revition:"hola",
            align: 'left',
            sortable: false,
            children: [
              {
                id: 3.1,
                name: "tema1",
                revition: "Child of Root",
                time:"1",
                depth: 2,
                leaf: true,
              },{
                id: 3.2,
                name: "tema1",
                revition: "Child of Root",
                time:"1",
                depth: 2,
                leaf: true,
              }
            ]
          }
          ,{
            id: 4,
            name: "Fernanda Kri",
            depth: 1,
            revition:"hola",
            align: 'left',
            sortable: false,
            children: [
              {
                id: 4.1,
                name: "tema1",
                revition: "Child of Root",
                time:"1",
                depth: 2,
                leaf: true,
              },{
                id: 4.2,
                name: "tema1",
                revition: "Child of Root",
                time:"1",
                depth: 2,
                leaf: true,
              }
            ]
          },
          {
            id: 5,
            name: "Fernanda Kri",
            depth: 1,
            revition:"hola",
            align: 'left',
            sortable: false,
            children: [
              {
                id: 5.1,
                name: "tema1",
                revition: "Child of Root",
                time:"1",
                depth: 2,
                leaf: true,
              },{
                id: 5.2,
                name: "tema1",
                revition: "Child of Root",
                time:"1",
                depth: 2,
                leaf: true,
              }
            ]
          }
          ,{
            id: 6,
            name: "Fernanda Kri",
            depth: 1,
            revition:"hola",
            align: 'left',
            sortable: false,
            children: [
              {
                id: 6.1,
                name: "tema1",
                revition: "Child of Root",
                time:"1",
                depth: 2,
                leaf: true,
              },{
                id: 6.2,
                name: "tema1",
                revition: "Child of Root",
                time:"1",
                depth: 2,
                leaf: true,
              }
            ]
          }
          
        ];
        this.totalItems = 6;
        
      });
    }
  
  },
  
}
  
</script>
<style>

.v-tree-data-table{
  margin:1em auto;
  width: 90%;
}
.v-card{
 margin:1em auto;
width: 96%;
}



</style>
