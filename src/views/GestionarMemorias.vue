<template>
   
    <div>
    <v-flex md12>
        <h1 class="display-2 font-weight-thin mb-4 white--text">Gestión de memorias</h1>
        <v-divider dark ></v-divider>
    </v-flex>
        
     <loader-state></loader-state> 
    
    <v-toolbar flat color="white">
      <v-toolbar-title>Listado de memorias</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-dialog v-model="dialog" max-width="700px">
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 > 
                  <v-toolbar-title>Editar memoria</v-toolbar-title>
                </v-flex>
                <v-flex xs12 >
                  <v-text-field v-model="editedItem.title" label="Titulo de memoria"></v-text-field>
                </v-flex>
                <v-flex xs12 >
                  <v-text-field v-model="editedItem.description" label="Descripción"></v-text-field>
                </v-flex>
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
                <!-- <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field> -->
                
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancelar</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="allTesis"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.title }}</td>
        <td class="text-xs-right">{{ props.item.student.email }}</td>
        <td class="text-xs-right">{{ props.item.teacherGuide.name }}</td>
        
        <!-- <td class="text-xs-right">{{ props.item.fat }}</td>
        <td class="text-xs-right">{{ props.item.carbs }}</td>
        <td class="text-xs-right">{{ props.item.protein }}</td> -->
        <td align-center justify-center row fill-height>
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          
        </td>
      </template>
      <template v-slot:no-results>
        <v-alert :value="true" color="error" icon="warning">
          No se encontraron coincidencias para "{{ search }}".
        </v-alert>
      </template>
    </v-data-table>
       
    </div>
        
  
    
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import LoaderState from '@/components/Loader.vue'
import iziToast from 'izitoast';
  export default {
    components:{
        LoaderState
    },
    computed:{
        ...mapState(['topicos','tesis','professors','TotalProfessors','notificationSystem','estadoAsignacion','area','estadoEliminacion'])
    },
    data () {
      return {
        dialog:false,
        search: '',
        topicosSelection: '',
        profesoresSelection:'',
        prof:[],
        headers: [
          {
            text: 'Memorias',
            align: 'left',
            sortable: false,
            value: 'title'
          },
          { text: 'Email',value: 'student.email'},
          { text: 'Prof. guía',value: 'teacherGuide.name'},
          { text: 'Acciones', sortable: false }
        ],
        allTesis: [],
        editedIndex: -1,
        editedItem: {
            title: '',
            description: '',
            guideId: '',
            topicId: ''
        },
        elemento: {
            title: '',
            description: '',
            guideId: '',
            topicId:''
        },
        defaultItem: {
            name: '',
            calories: 0,
            fat: 0,
            carbs: 0,
            protein: 0
        }
      }
    },
    methods:{
        ...mapActions(['obtenerTesis','editarMemoria','obtenerProfesores']),
        editItem (item) {
            this.editedIndex = this.allTesis.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem (item) {
            const index = this.desserts.indexOf(item)
            confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
        },

        close () {
            this.dialog = false
            setTimeout(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
            }, 300)
        },

        async save() {
            

            
            // Object {name:"Skip",age:2,favoriteFood:"Steak"}
            
            this.elemento.title = this.editedItem.title;
            this.elemento.description = this.editedItem.description;
            this.elemento.guideId = this.profesoresSelection.id;
            this.elemento.topicId = this.topicosSelection.id;
            console.log(this.profesoresSelection.id);
            console.log(this.topicosSelection.id);
            //this.editarMemoria(edited);
            await this.$http.post('http://34.228.238.196:9090/theses/update/'+this.editedItem.id,this.elemento).then(response=>{
		    
			    console.log(response.body);
		    }, response=>{
		    	console.log("Error callback");
		       	// error callback
		       	//console.log('error cargando lista');
            });
            this.close();
            this.$store.commit('cambiarEstadoDialog',{data1:true,data2:"Actualizando Registro.."});
            await this.obtenerTesis();
            this.$store.commit('cambiarEstadoDialog',{data1:false,data2:""});
            this.$toast.success("Edición completada satisfactoriamente", 'OK', this.notificationSystem.options.success);
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
        //this.obtenerTesis();
    },
    mounted: async function(){
        this.$store.commit('cambiarEstadoDialog',{data1:true,data2:"Obteniendo Memorias.."});
        await this.obtenerTesis();
        
        await this.obtenerProfesores();
        this.$store.commit('cambiarEstadoDialog',{data1:false,data2:""});
    },
    watch:{
        tesis: function(){
            this.allTesis = this.tesis;
        },
        topicosSelection: function(){
            this.agregarProfesores();
        }
    }
  }
</script>

<style>

</style>
