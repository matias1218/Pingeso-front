<template>
    <v-container grid-list-xs>
        <v-layout row wrap>
            <!-- lista de no entregados para correccion -->
            <v-flex md12 >
                <h1 class="display-2 font-weight-thin mb-4 white--text">Estado de Memorias</h1>
                <v-divider dark ></v-divider>
            </v-flex>
            <v-flex md6>
               <h4 class="headline text-md-left font-weight-light white--text">Memorias no entregadas</h4>
                <div >
                    <v-dialog v-model="dialog" max-width="300px">
                      <template v-slot:activator="{ on }">
                      </template>
                      <v-card>
                        <v-card-text>
                          <v-container grid-list-md>
                            <v-layout wrap>
                              <v-card-title class="headline">Confirmar recibo de memoria?</v-card-title>
                              <v-card-text>¿Esta seguro que desea confirmar el recibo de la memoria seleccionada?.</v-card-text>
                            </v-layout>
                          </v-container>
                        </v-card-text>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="blue darken-1" flat @click="close">Cancelar</v-btn>
                          <v-btn color="blue darken-1" flat @click="confirm">Aceptar</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>



                    <v-data-table
                        :headers="headers"
                        :items="noCorregido"
                        class="elevation-1"
                    >
                        <template v-slot:items="props">
                        <td>{{ props.item.title }}</td>
                        <td class="text-xs-right">{{ props.item.student.email }}</td>
                        <!-- <td class="text-xs-right">{{ props.item.fat }}</td>
                        <td class="text-xs-right">{{ props.item.carbs }}</td>
                        <td class="text-xs-right">{{ props.item.protein }}</td> -->
                        <td align-center justify-center row fill-height>
                            <v-icon
                            medium
                            @click="editItem(props.item)"
                            >
                            arrow_forward
                            </v-icon>
                        </td>
                        </template>
                        
                    </v-data-table>
                </div>
            </v-flex>
            <!-- lista de entregados para correccion -->
            <v-flex md6>
               <h4 class="headline text-md-left font-weight-light white--text">Memorias entregadas y en corrección</h4>
                <div>
                    <v-dialog v-model="dialog" max-width="300px">
                      <template v-slot:activator="{ on }">
                      </template>
                      <v-card>
                        <v-card-text>
                          <v-container grid-list-md>
                            <v-layout wrap>
                              <v-card-title class="headline">Confirmar recibo de memoria?</v-card-title>
                              <v-card-text>¿Esta seguro que desea confirmar el recibo de la memoria seleccionada?.</v-card-text>
                            </v-layout>
                          </v-container>
                        </v-card-text>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="blue darken-1" flat @click="dialog = false">Cancelar</v-btn>
                          <v-btn color="blue darken-1" flat @click="confirm">Aceptar</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <!-- dialogo para confirmar el profesor -->
                    <v-dialog v-model="selectProfesorDialog" scrollable max-width="300px">
                    <template v-slot:activator="{ on }">
                    </template>
                    <v-card>
                      <v-card-title>Selección de docente que entrega</v-card-title>
                      <v-divider></v-divider>
                      <v-card-text style="height: 200px;">
                        <v-radio-group v-model="profesorQueDevuelveID" column>
                          <!-- <v-radio label="Bahamas, The" value="bahamas"></v-radio> -->
                          <v-radio v-for="item in comisionDeTesis" :key="item.id"  :label="item.name" :value="item.id"></v-radio>
                          
                        </v-radio-group>
                      </v-card-text>
                      <v-divider></v-divider>
                      <v-card-actions>
                        <v-btn color="blue darken-1" flat @click="selectProfesorDialog = false">Cancelar</v-btn>
                        <v-btn color="blue darken-1" flat @click="confirmarRecibo">Aceptar</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>

                    <v-data-table
                        :headers="headers2"
                        :items="entregados"
                        class="elevation-1"
                    >
                        <template v-slot:items="props">
                        <td>{{ props.item.title }}</td>
                        <td class="text-xs-right">{{ props.item.student.email }}</td>
                        <!-- <td class="text-xs-right">{{ props.item.fat }}</td>
                        <td class="text-xs-right">{{ props.item.carbs }}</td>
                        <td class="text-xs-right">{{ props.item.protein }}</td> -->
                        <td align-center justify-center row fill-height>
                            <v-icon
                            medium
                            @click="editItemProfessors(props.item)"
                            >
                            done
                            </v-icon>
                        </td>
                        </template>
                        
                    </v-data-table>
                </div>
            </v-flex>
            <!-- lista de devueltos -->
            <v-flex md12>
              <v-divider dark></v-divider>
               <h4 class="headline text-md-left font-weight-light white--text mb-4">Memorias Devueltas por Docentes</h4>
                <div>
                    <!-- <v-dialog v-model="dialog" max-width="300px">
                      <template v-slot:activator="{ on }">
                      </template>
                      <v-card>
                        <v-card-text>
                          <v-container grid-list-md>
                            <v-layout wrap>
                              <v-card-title class="headline">Confirmar recibo de memoria?</v-card-title>
                              <v-card-text>¿Esta seguro que desea confirmar el recibo de la memoria seleccionada?.</v-card-text>
                            </v-layout>
                          </v-container>
                        </v-card-text>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="blue darken-1" flat @click="close">Cancelar</v-btn>
                          <v-btn color="blue darken-1" flat @click="confirm">Aceptar</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog> -->
                    <v-data-table
                        :headers="headers3"
                        :items="devueltas"
                        class="elevation-1"
                    >
                        <template v-slot:items="props">
                        <td>{{ props.item.title }}</td>
                        <td class="text-xs-right">{{ props.item.trackings.find(tracking => tracking.status === 'CORRECCION_1' || tracking.status === 'CORRECCION_2').professor }}</td>
                        <!-- <td class="text-xs-right">{{ props.item.fat }}</td>
                        <td class="text-xs-right">{{ props.item.carbs }}</td>
                        <td class="text-xs-right">{{ props.item.protein }}</td> -->
                        
                        </template>
                        
                    </v-data-table>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import iziToast from 'izitoast';
  export default {
    data: () => ({
      devueltas:[],
      profesorQueDevuelveID:'',
      comisionDeTesis:[],
      dialog: false,
      selectProfesorDialog:false,
      headers: [
        {
          text: 'Memoria',
          align: 'left',
          sortable: false,
          value: 'title'
        },
        { text: 'Email', value:'student.id' },
        { text: 'Confirmar entrega', sortable: false }
      ],
      headers2: [
        {
          text: 'Memoria',
          align: 'left',
          sortable: false,
          value: 'title'
        },
        { text: 'Email', value:'student.id' },
        { text: 'Confirmar devolución', sortable: false }
      ],
      headers3: [
        {
          text: 'Memoria',
          align: 'left',
          sortable: false,
          value: 'title'
        },
        { text: 'Revisada por', value:'student.id' }
      ],
      item: [],
      entregados:[],
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      ...mapState(['noCorregido','comisionesAsignadas','estadoAsignacion','notificationSystem'])
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },
    methods: {
        ...mapActions(['declararDevolucion','declararRevision','obtenerTesisConComision','asignarCorreccion','obtenerNoCorregidos','obtenerTesis','eliminarCorreccion']),
      
      confirmarRecibo: async function(){
          await this.declararDevolucion({data1:this.item.id,data2:this.profesorQueDevuelveID});
          console.log(this.estadoAsignacion);
          if(this.estadoAsignacion == true){
              this.$toast.success('Devolución registrada correctamente', 'OK', this.notificationSystem.options.success);
              this.selectProfesorDialog = false;
            }
            else{
              this.$toast.warning('Ocurrió un error en la entrega', 'Alto', this.notificationSystem.options.warning);
              this.selectProfesorDialog = false;
          }
      },
      confirm: async function(){    
        await this.declararRevision(this.item.id);
        console.log(this.estadoAsignacion);
        if(this.estadoAsignacion == true){
            this.$toast.success('Entrega registrada correctamente', 'OK', this.notificationSystem.options.success);
            this.dialog = false;
          }
          else{
            this.$toast.warning('Ocurrió un error en la entrega', 'Alto', this.notificationSystem.options.warning);
            this.dialog = false;
        }
      },
      editItem: function(item) {
        this.item = item;
        this.dialog = true;
      },
      editItemProfessors: function(item) {
        this.item = item;

        this.comisionDeTesis = [];
        // se crea la lista con los profesores que son de la comision evaluadora.
        // // se agrega el profesor Guia
        // this.comisionDeTesis.push({ id:item.teacherGuide.id,
        //                             name: item.teacherGuide.name});
        // se agrega el profesor de la comision 1
        this.comisionDeTesis.push({ id:item.teacherCommission1.id,
                                    name: item.teacherCommission1.name});
        // // se agrega el profesor de la comision 2
        if(item.teacherCommission2 != null){
          this.comisionDeTesis.push({ id:item.teacherCommission2.id,
                                      name: item.teacherCommission2.name});
        }
        this.selectProfesorDialog = true;
      },
      close: function() {
        this.dialog = false;
        this.selectProfesorDialog = false;
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      obtenerEntregados: function(){
        var entregados = [];
        this.comisionesAsignadas.forEach(element => {
          const getStatus1 = element.trackings.find(tracking => tracking.status === 'ENTREGA_REALIZADA');
          const getStatus2 = element.trackings.find(tracking => tracking.status === 'CORRECCION_1' || tracking.status === 'CORRECCION_2' );
          // si el estado es igual a entregado y distinto a las correcciones de la comision 1 o 2
          if (getStatus1 !== undefined && getStatus2 === undefined) {
              entregados.push(element);
          }
        });
        this.entregados = entregados;

      },
      obtenerDevueltas: function(){
        var devueltas = [];
        this.comisionesAsignadas.forEach(element => {
          const getStatus2 = element.trackings.find(tracking => tracking.status === 'CORRECCION_1' || tracking.status === 'CORRECCION_2' );
          if (getStatus2 !== undefined) {
              devueltas.push(element);
          }
        });
        this.devueltas = devueltas;
      }
    },
    watch:{
      dialog: async function(){
        await this.obtenerNoCorregidos();
        // obtener comisiones asignadas
        await this.obtenerTesisConComision();
        await this.obtenerEntregados();
        await this.obtenerDevueltas();
      },
      selectProfesorDialog: async function(){
        await this.obtenerNoCorregidos();
        // obtener comisiones asignadas
        await this.obtenerTesisConComision();
        await this.obtenerEntregados();
        await this.obtenerDevueltas();
      }
    },
    mounted: async function(){
        await this.obtenerNoCorregidos();
        await this.obtenerTesisConComision();
        await this.obtenerEntregados();
        await this.obtenerDevueltas();
    },
  }
</script>

<style scoped>
#flex1{
height: 700px;
}
</style>
