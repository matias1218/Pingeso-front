<template>
    <v-container grid-list-xs>
        <v-layout row wrap>
            <v-flex md12>
                <h1 class="display-2 font-weight-thin mb-4 white--text">Estadísticas de Docentes</h1>
                <v-divider dark ></v-divider>
            </v-flex>
            
            <v-flex md12>
                <h4 class="headline text-md-left font-weight-light mb-3 white--text">Resumen histórico</h4>
                <kendo-gantt id="gantt"
                            :height="700"
                            :editable="editable"
                            :data-source="datasource"
                            :tooltip="tooltip"
                            >
                    <kendo-gantt-column :field="'title'" :title="'Docentes'" :width="150"></kendo-gantt-column>
                   
                    <kendo-gantt-view :type="'week'" :selected="true"></kendo-gantt-view>
                </kendo-gantt>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'
export default {
    computed:{
        ...mapState(['tesis','professors','TotalProfessors','notificationSystem','estadoAsignacion','area','estadoEliminacion'])
    },
    
    data(){
        return{
            tooltip: {
                visible: false,
                template: "#= task.title #  #= task.title # "
            },
            editable: {
                create: false,
                destroy: false,
                update: false,
                dragPercentComplete: false,
                dependencyCreate: false
            },
            datasource: []
            
        }
    },
    methods: {
        ...mapActions(['obtenerProfesores'])
    },
    mounted: async function(){
      await this.obtenerProfesores();
      var datasource = [];
      var comision = [];
      this.TotalProfessors.forEach(element => {
          // primero se agrega el profesor
            datasource.push({ id:element.id,
                            orderId: 0,
                            parentId: null,
                            title: element.name +' '+ element.firstLastName+ ' '+ '(Dias Promedio'+' '+element.stats.mean+')',
                            summary: true,
                            expanded: true,
                            percentComplete: 1});

            element.trackings.forEach(element2 => {
                datasource.push({ id:element2.id,
                            orderId: 0,
                            parentId: element.id,
                            title: element2.thesis,
                            summary: true,
                            expanded: true,
                            percentComplete: 1,
                            start: element2.creationDate,
                            end: element2.endDate})
            });
            // comision = comision.json();
            // // despues se agregan las memorias asignadas a su comision
            // comision.forEach(element2 => {
            //     // obtengo el tracking de la memoria
            //     console.log(element2.id)
            // });
      });
      this.datasource = datasource;

      
    }

    

}
</script>

<style>

</style>
