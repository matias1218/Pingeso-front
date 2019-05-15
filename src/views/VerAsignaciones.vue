<template>
    <div id="app">
        <v-card>
         <vue-ads-table-tree
            :columns="columns"
            :rows="rows"
            :filter="filterValue"
            :page="page"
            @filter-change="filterChanged"
            @page-change="pageChanged"
        >
    </vue-ads-table-tree>   
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

    data () {
        return {
        page: 0,
        filter: '',
        columns: [
            {
                property: 'name',
                title: 'Nombre profesor(cantidad Temas)',
                direction: null,
                filterable: true,
                collapseIcon: true
            },
            {
                property: 'tema',
                title: 'Título Tema/s',
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
        rows: [
            {
                name: 'Fernando Rannou'+ '('+ 0 + ')',
            },
            {
                name: 'Luciano Hidalgo'+ '('+ 0 + ')',
            },
            {
                name: 'Victor Parada' + '('+ 3 + ')',
                _children: [
                    {
                        tema: 'tema1',
                        revition: '02/03/2019',
                        time:'10:00'
                    },
                    {
                        tema: 'tema2',
                        revition: '22/03/2019',
                        time:'10:00'
                    },
                    {
                        tema: 'tema3',
                        revition: '12/03/2019',
                        time:'10:00'
                    },

                ],
            },
            {
                name: 'Fernanda Kri'  + '('+ 4 + ')',
                _children: [
                    {
                        tema: 'tema1',
                        revition: '02/03/2019',
                        time:'10:00'
                    },
                    {
                        tema: 'tema2',
                        revition: '22/03/2019',
                        time:'10:00'
                    },
                    {
                        tema: 'tema3',
                        revition: '12/03/2019',
                        time:'10:00'
                    },
                    {
                        tema: 'tema4',
                        revition: '22/03/2019',
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
        },
    }
};
</script>
