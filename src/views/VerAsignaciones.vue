<template>
    <div id="app">
        <v-card>
         <v-card-title>
            <h3>Tema(s) por profesor/a</h3>
          </v-card-title>
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
              this.$http.get('https://memoriausach.azurewebsites.net/professors/3/topics').then((response) => {
                  this.assign = response.body;
                  this.assign[0].professors.map((prof) => {
                        this.rows.push({

                            nameprof: prof.name + ' ' + prof.lastname1 + ' ' + prof.lastname2,
                            _children: prof.theses

                            }); 
                        
                        })
                   });
            console.log(this.prueba);
            console.log(this.rows);


          }
    },     
    data () {
        return {
        page: 0,
        filter: '',
        assign:[],
        prueba:[],
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
        rows: [
            {
                nameprof: 'Fernando Rannou'+ '('+ 0 + ')',
            },
            {
                nameprof: 'Luciano Hidalgo'+ '('+ 0 + ')',
            },
            {
                 nameprof: 'Victor Parada' + '('+ 3 + ')',
                _children: [
                    {
                        title: 'tema1',
                        revition: '02/03/2019',
                        time:'10:00'
                    },
                    {
                        title: 'tema2',
                        revition: '22/03/2019',
                        time:'10:00'
                    },
                    {
                        title: 'tema3',
                        revition: '12/03/2019',
                        time:'10:00'
                    },
                ],
            },
            {
                 nameprof: 'Pablo Román Asenjo'  + '('+ 4 + ')',
                _children: [
                    {
                        title: 'tema1',
                        revition: '02/03/2019',
                        time:'10:00'
                    },
                    {
                        title: 'tema2',
                        revition: '22/03/2019',
                        time:'10:00'
                    },
                    {
                        title: 'tema3',
                        revition: '12/03/2019',
                        time:'10:00'
                    },
                    {
                        title: 'tema4',
                        revition: '22/03/2019',
                        time:'10:00'
                    }
                ]
            },
            {
                 nameprof: 'J. L. Jara'  + '('+ 4 + ')',
                _children: [
                    {
                        title: 'tema1',
                        revition: '02/03/2019',
                        time:'10:00'
                    },
                    {
                        title: 'tema2',
                        revition: '22/03/2019',
                        time:'10:00'
                    },
                    {
                        title: 'tema3',
                        revition: '12/03/2019',
                        time:'10:00'
                    },
                    {
                        title: 'tema4',
                        revition: '22/03/2019',
                        time:'10:00'
                    }
                ]
            },
            {
                 nameprof: 'Mario Inostroza-Ponta'  + '('+ 4 + ')',
                _children: [
                    {
                        title: 'tema1',
                        revition: '02/03/2019',
                        time:'10:00'
                    },
                    {
                        title: 'tema2',
                        revition: '22/03/2019',
                        time:'10:00'
                    },
                    {
                        title: 'tema3',
                        revition: '12/03/2019',
                        time:'10:00'
                    },
                    {
                        title: 'tema4',
                        revition: '22/03/2019',
                        time:'10:00'
                    }
                ]
            },
            {
                 nameprof: 'Roberto González-Ibáñez'  + '('+ 4 + ')',
                _children: [
                    {
                        title: 'tema1',
                        revition: '02/03/2019',
                        time:'10:00'
                    },
                    {
                        title: 'tema2',
                        revition: '22/03/2019',
                        time:'10:00'
                    },
                    {
                        title: 'tema3',
                        revition: '12/03/2019',
                        time:'10:00'
                    },
                    {
                        title: 'tema4',
                        revition: '22/03/2019',
                        time:'10:00'
                    }
                ]
            },
            {
                 nameprof: 'Fernanda Kri'  + '('+ 4 + ')',
                _children: [
                    {
                        title: 'tema1',
                        revition: '02/03/2019',
                        time:'10:00'
                    },
                    {
                        title: 'tema2',
                        revition: '22/03/2019',
                        time:'10:00'
                    },
                    {
                        title: 'tema3',
                        revition: '12/03/2019',
                        time:'10:00'
                    },
                    {
                        title: 'tema4',
                        revition: '22/03/2019',
                        time:'10:00'
                    }
                ]
            },
            {
                 nameprof: 'Carolina Bonacic Castro'  + '('+ 4 + ')',
                _children: [
                    {
                        title: 'tema1',
                        revition: '02/03/2019',
                        time:'10:00'
                    },
                    {
                        title: 'tema2',
                        revition: '22/03/2019',
                        time:'10:00'
                    },
                    {
                        title: 'tema3',
                        revition: '12/03/2019',
                        time:'10:00'
                    },
                    {
                        title: 'tema4',
                        revition: '22/03/2019',
                        time:'10:00'
                    }
                ]
            },
            {
                 nameprof: 'Alcides Quispe Sanca'  + '('+ 4 + ')',
                _children: [
                    {
                        title: 'tema1',
                        revition: '02/03/2019',
                        time:'10:00'
                    },
                    {
                        title: 'tema2',
                        revition: '22/03/2019',
                        time:'10:00'
                    },
                    {
                        title: 'tema3',
                        revition: '12/03/2019',
                        time:'10:00'
                    },
                    {
                        title: 'tema4',
                        revition: '22/03/2019',
                        time:'10:00'
                    }
                ]
            },
            {
                 nameprof: 'Edmundo Leiva'  + '('+ 1 + ')',
                _children: [
                    {
                        title: 'tema1',
                        revition: '02/03/2019',
                        time:'10:00'
                    }
                ]
            }
        ],
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

