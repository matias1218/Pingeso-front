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
                            :data-source="localdatasource"
                            :tooltip="tooltip"
                            :views="views"
                           
                            >
                    <kendo-gantt-column :field="'title'" :title="'Docentes'" :width="150" :sortable="true"></kendo-gantt-column>
                    
                </kendo-gantt>
                <loader-state></loader-state>
            </v-flex>

            <v-flex md12>
                <v-divider dark ></v-divider>
            </v-flex>
            
            <v-flex xs12>
                <h4 class="headline text-md-left font-weight-light mb-3 white--text">Resumen por profesor</h4>
                <div class="card" style="width: 100%;">
                    <v-container grid-list-xs>
                        <v-layout row wrap>
                            <v-flex xs6>
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
                            </v-flex>
                            <v-flex xs6>
                                <v-select
                                    v-model="profesoresSelection"
                                    :items="prof"
                                    name="Topico"
                                    label="Seleccione profesor"
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
                        </v-layout>
                    </v-container>
                    <div class="card-body">
                        <div id="chartdiv" ></div>
                    </div>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import LoaderState from '@/components/Loader.vue'
export default {
    components:{
        LoaderState
    },
    computed:{
        ...mapState(['topicos','tesis','professors','TotalProfessors','notificationSystem','estadoAsignacion','area','estadoEliminacion'])
    },
    
    data(){
        return{
            views: [
                { type: "day" ,
                  range: {
                    start: new Date("2019/03/01")
                  },
                  
                },
                { type: "week",
                  weekHeaderTemplate: "#=kendo.toString(start, 'D')# - #=kendo.toString(kendo.date.addDays(end, -1), 'D')#", 
                  selected: true,
                  range: {
                    start: new Date("2019/03/01")
                  },
                },
                { type: "month",
                  monthHeaderTemplate: "#=kendo.toString(start, 'MMMM, yyyy')#",
                  range: {
                    start: new Date("2019/03/01")
                  },
                }
            ],
            
            topicosSelection: '',
            profesoresSelection:'',
            prof:[],
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
            localdatasource: []
            
        }
    },
    methods: {
        ...mapActions(['obtenerProfesores','obtenerTopicos']),
        crearGrafico: function(data){
            // Themes begin
            am4core.useTheme(am4themes_kelly);
            am4core.useTheme(am4themes_animated);
            // Themes end

            // Create chart instance
            var chart = am4core.create("chartdiv", am4charts.XYChart);

            // Add data
            chart.data = data;
            

            // Create axes
            var yAxis = chart.yAxes.push(new am4charts.CategoryAxis());
            yAxis.dataFields.category = "state";
            yAxis.renderer.grid.template.location = 0;
            yAxis.renderer.labels.template.fontSize = 10;
            yAxis.renderer.minGridDistance = 10;
            yAxis.renderer.labels.template.wrap = true;
            yAxis.renderer.labels.template.maxWidth = 120;

            var xAxis = chart.xAxes.push(new am4charts.ValueAxis());

            var topContainer = chart.chartContainer.createChild(am4core.Container);
            topContainer.layout = "absolute";
            topContainer.toBack();
            topContainer.paddingBottom = 15;
            topContainer.width = am4core.percent(100);

            var axisTitle = topContainer.createChild(am4core.Label);
            axisTitle.text = "Memorias";
            axisTitle.fontWeight = 600;
            axisTitle.align = "left";
            axisTitle.paddingLeft = 10;

            var axisTitle = topContainer.createChild(am4core.Label);
            axisTitle.text = "Días demorados en corregir";
            axisTitle.fontWeight = 600;
            axisTitle.align = "right";
            axisTitle.paddingLeft = 10;

            // Create series
            var series = chart.series.push(new am4charts.ColumnSeries());
            series.dataFields.valueX = "sales";
            series.dataFields.categoryY = "state";
            series.columns.template.tooltipText = "Dias empleados: [bold]{valueX}[/]";
            series.columns.template.strokeWidth = 0;
            series.columns.template.adapter.add("fill", function(fill, target) {
            if (target.dataItem) {
                switch(target.dataItem.dataContext.region) {
                default:
                    return chart.colors.getIndex(2);
                    break; 
                }
            }
            return fill;
            });

            
            chart.cursor = new am4charts.XYCursor();
        },
        agregarProfesores: function(){

            // this.topicos.forEach(element => {
            //     if(element.name == this.topicosSelection.name){
            //         prof = element.professors;
            //     }
            // });
            var prof = this.topicos.find(topico => topico.name === this.topicosSelection.name);
            this.prof = prof.professors;
            // obtener el profesor con el tracking         
        },
        seleccionarProfesor: function(){
            var data = [];
            var i = 0;
            var profTracking = this.TotalProfessors.find(profesor => profesor.id === this.profesoresSelection.id);
            // formar el json
            profTracking.trackings.forEach(element => {
                data.push({
                    "region":element.professor,
                    "state":element.thesis,
                    "sales":profTracking.stats.days[i]
                });
                i++;
            });

            this.crearGrafico(data);
        
        }
        
    },
    watch:{
        topicosSelection: function(){
            this.agregarProfesores();
        },
        profesoresSelection:function(){
            this.seleccionarProfesor();
        }
    },
    mounted: async function(){
      this.$store.commit('cambiarEstadoDialog',{data1:true,data2:"Obteniendo estadísticas.."});
      await this.obtenerProfesores();
      var datasource = [];
      var comision = [];
      this.TotalProfessors.forEach(element => {
          // primero se agrega el profesor
            if(element.stats.mean>0){
              datasource.push({ id:element.id,
                            
                            parentId: null,
                            title: element.name +' '+ element.firstLastName+ ' '+ '(Dias Promedio:'+' '+element.stats.mean+')',
                            summary: true,
                            expanded: true,
                            percentComplete: 1});
            }
            else{
              datasource.push({ id:element.id,
                            
                            parentId: null,
                            title: element.name +' '+ element.firstLastName,
                            summary: true,
                            expanded: true,
                            percentComplete: 1});
            }
            

            element.trackings.forEach(element2 => {
                datasource.push({ id:element2.id,
                            orderId: 0,
                            parentId: element.id,
                            title: element2.thesis,
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
      this.localdatasource = datasource;
      await this.obtenerTopicos();
      this.$store.commit('cambiarEstadoDialog',{data1:false,data2:""});
      this.crearGrafico();
    
      
    }
}
</script>

<style>
#chartdiv {
  width: 100%;
  height: 800px;
}
</style>
