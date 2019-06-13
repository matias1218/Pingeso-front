<template>
    <v-container grid-list-xs>
        <v-layout row wrap>
            <v-flex md12>
                <h1 class="display-2 font-weight-thin mb-3 white--text">Asignaciones actuales</h1>
                <h3 class="display-1 font-weight-thin mb-2 white--text"> Area: {{area}}</h3>
                <h4 class="subheading white--text">Listado de asignaciones por profesor. 
                </h4>
                <v-divider dark ></v-divider>
            </v-flex>
            <v-flex md12>   
                <h4 class="headline text-md-left font-weight-light mb-3 white--text">Tema(s) por profesor/a</h4>
                <v-card>
                    <v-progress-circular
                        v-if="rows.length === 0 "
                        :size="70"
                        :width="7"
                        color="primary"
                        indeterminate
                    ></v-progress-circular>  

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
            </v-flex>
        </v-layout>
  </v-container>
</template>

<script>

import '../../node_modules/@fortawesome/fontawesome-free/css/all.css';
import '../../node_modules/vue-ads-table-tree/dist/vue-ads-table-tree.css';
import VueAdsTableTree from 'vue-ads-table-tree';
import {mapState, mapActions} from 'vuex'

export default {
    name: 'app',

    components: {
        VueAdsTableTree,
    },
    computed:{
        ...mapState(['topicoss','area'])
    },
   async mounted(){
        this.profesoresTesis = await this.obtenerProfesores(this.topicoss);
         this.profesoresTesis.professors.map((prof) => {
                        this.rows.push({
                            nameprof: prof.name,
                            _children: prof.commissions
                            }); 
                        
               })

    },     
    data () {
        return {
        page: 0,
        filter: '',
        assign:[],
        prueba:[],
        profesoresTesis:[],
        columns: [
            {
                property: 'nameprof',
                title: 'Nombre profesor(cantidad Tesis)',
                direction: null,
                filterable: true,
                collapseIcon: true
            },
            {
                property: 'title',
                title: 'Título Tesis',
                filterable: true,
            },
            {
                property: 'revition',
                title: 'Fecha Examen',
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
        obtenerProfesores: async function(topicId){
        const data = await fetch('http://34.228.238.196:9090/topics/'+ topicId);
        const profesoresTesis = await data.json();

        return profesoresTesis ;
        },
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

