<template>
    <div id="app">
        <v-card>
         <v-card-title>
            <h3>Tema(s) por profesor/a</h3>
          </v-card-title>
          
         <div id="tree-table"> 
         <vue-ads-table-tree
            v-if="rows.length != 0 "
            :columns="columns"
            :rows="rows"
            :page="page"
            @filter-change="filterChanged"
            @page-change="pageChanged"
        >
        
    </vue-ads-table-tree>   
    </div>
        </v-card>
  </div>
</template>

<script>

import '../../node_modules/@fortawesome/fontawesome-free/css/all.css';
import '../../node_modules/vue-ads-table-tree/dist/vue-ads-table-tree.css';
import VueAdsTableTree from 'vue-ads-table-tree';

export default {
    name: 'app',

    components: {
        VueAdsTableTree,
    },
    mounted(){
          {
              this.$http.get('http://23.20.84.8:9090/professors/all').then((response) => {
                  this.assign = response.body;
                  this.assign.map((prof) => {
                        
                        this.rows.push({

                            nameprof: prof.name + ' ' + prof.lastname1 + ' ' + prof.lastname2,
                            _children: prof.topics

                            }); 
                        
                        })
                   });
          }
    },     
    data () {
        return {
        page: 0,
        filter: '',
        assign:[],
        columns: [
            {
                property: 'nameprof',
                title: 'Nombre profesor(cantidad Temas)',
                direction: null,
                filterable: true,
                collapseIcon: true
            },
            {
                property: 'name',
                title: 'Título Tesis',
                filterable: true,
            },
            {
                property: 'revition',
                title: 'Fecha Revisión',
                filterable: true,
            }
            ,
            {
                property: 'time',
                title: 'Hora',
                filterable: true,
            }
        ],
        rows: [],
        };
    },
    methods: {
        filterChanged (filter) {
            this.filter = filter;
        },
        
        pageChanged (page) {
            this.page = page;
        }
    }
};
</script>
<style>
#tree-table{
     margin:1em auto;
     width: 98%;
}

.v-card{
 margin:1em auto;

}

</style>

