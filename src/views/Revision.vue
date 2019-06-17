<template>
    <v-container grid-list-xs>
        <v-layout row wrap>
            <!-- lista de no entregados para correccion -->
            <v-flex md12>
                <h1 class="display-2 font-weight-thin mb-4 white--text">Estados de Memorias</h1>
                <v-divider dark ></v-divider>
            </v-flex>
            <v-flex md6>
               <h4 class="headline text-md-left font-weight-light white--text">Memorias no entregadas</h4>
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
                          <v-btn color="blue darken-1" flat @click="close">Cancelar</v-btn>
                          <v-btn color="blue darken-1" flat @click="confirm">Aceptar</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>



                    <v-data-table
                        :headers="headers"
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
                            @click="editItem(props.item)"
                            >
                            arrow_forward
                            </v-icon>
                        </td>
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
      dialog: false,
      dialog2:false,
      headers: [
        {
          text: 'Memoria',
          align: 'left',
          sortable: false,
          value: 'title'
        },
        { text: 'Email', value:'student.id' },
        { text: 'Acciones', sortable: false }
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
        ...mapActions(['declararRevision','obtenerTesisConComision','asignarCorreccion','obtenerNoCorregidos','obtenerTesis','eliminarCorreccion']),
      
      confirm: async function(){
        
        await this.declararRevision(this.item.id);
        console.log(this.estadoAsignacion);
        if(this.estadoAsignacion == true){
            this.$toast.success('Entrega realizada', 'OK', this.notificationSystem.options.success);
            this.dialog = false;
          }
          else{
            this.$toast.warning('Ocurrió un error en la entrega', 'Alto', this.notificationSystem.options.warning);
            this.dialog = false;
        }
      },
      editItem: function(item) {
        this.item = item;
        this.dialog = true
        
        //await fetch('http://34.228.238.196:9090/theses/tocorrection/'+item.id);
      },
      close: function() {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      obtenerEntregados: function(){
        var entregados = [];
        this.comisionesAsignadas.forEach(element => {
           element.trackings.forEach(element2 => {
              if(element2.status == "ENTREGA_REALIZADA"){
                entregados.push(element);
              }
           });
        });
        this.entregados = entregados;

      }
    },
    watch:{
      dialog: async function(){
        await this.obtenerNoCorregidos();
        // obtener comisiones asignadas
        await this.obtenerTesisConComision();
        await this.obtenerEntregados();
      }
    },
    mounted: async function(){
        await this.obtenerNoCorregidos();
        await this.obtenerTesisConComision();
        await this.obtenerEntregados();
    },
  }
</script>

<style>

</style>
