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
                            :height="600"
                            :editable="editable"
                            :data-source="datasource"
                            :tooltip="tooltip"
                            >
                    <kendo-gantt-column :field="'title'" :title="'Docentes'" :width="150"></kendo-gantt-column>
                    <kendo-gantt-column :field="'start'" :title="'Asignación'" :format="'{0:MM/dd/yyyy}'" :width="100" :editable="true" :sortable="true"></kendo-gantt-column>
                    <kendo-gantt-column :field="'end'" :title="'Devolución'" :format="'{0:MM/dd/yyyy}'" :width="100" :editable="true" :sortable="true"></kendo-gantt-column>
                    <kendo-gantt-view :type="'day'"></kendo-gantt-view>
                    <kendo-gantt-view :type="'week'" :selected="true"></kendo-gantt-view>
                    <kendo-gantt-view :type="'month'"></kendo-gantt-view>
                </kendo-gantt>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    
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
            datasource: [{
                id: 0,
                orderId: 0,
                parentId: null,
                title: "Profesor 1",
                summary: true,
                expanded: true,
                percentComplete: 1,
                start: new Date("2014/6/17 9:00"),
                end: new Date("2014/7/01 11:00")
            },
            {
                id: 1,
                orderId: 1,
                parentId: 0,
                title: "Memoria 1",
                percentComplete: 1,
                start: new Date("2014/6/17 11:00"),
                end: new Date("2014/6/20 14:00")
            },
                {
                id: 2,
                orderId: 2,
                parentId: 0,
                title: "Memoria 2",
                percentComplete: 1,
                start: new Date("2014/6/19 11:00"),
                end: new Date("2014/6/22 14:00")
            },
            {
                id: 3,
                orderId: 3,
                parentId: null,
                title: "Profesor 2",
                summary: true,
                expanded: true,
                percentComplete: 1,
                start: new Date("2014/6/19 11:00"),
                end: new Date("2014/6/22 14:00")
            },
            {
                id: 4,
                orderId: 4,
                parentId: 3,
                title: "Memoria 4",
                percentComplete: 1,
                start: new Date("2014/6/19 11:00"),
                end: new Date("2014/6/22 14:00")
            }]
            
        }
    },
    methods: {
        
    },

    

}
</script>

<style>

</style>
