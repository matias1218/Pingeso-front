<template>
  <v-container>
    <v-layout row wrap>
      
    
    <v-flex md12>
        <h1 class="display-2 font-weight-thin mb-4 white--text">Gestión de profesores</h1>
        <v-divider dark ></v-divider>
    </v-flex>
    <v-layout row wrap justify-center>
      
      <v-card id="card1">
      <v-card-title>
          Gestionar Profesores    
        </v-card-title>
        <v-form v-model="valid"
         ref="form">
        <v-container>
          <v-layout>
            <v-flex
              xs12
              md4
            >

              <v-text-field
                v-model="firstname"
                :rules="nameRules"
                label="Nombre"
                required
              ></v-text-field>
            </v-flex>
    
            <v-flex
              xs12
              md4
            >
              <v-text-field
                v-model="lastname"
                :rules="nameRules"
                label="Apellidos"
                required
              ></v-text-field>
            </v-flex>
    
            <v-flex
              xs12
              md4
            >
            <v-select
                v-model="topicosSelection"
                :items="topicos"
                :rules="topicRules"
                name="Topico"
                label="Tópico"
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
            <v-flex
              xs12
              md4
            >
            <v-autocomplete
              ref="carga"
              v-model="carga"
              :rules="[() => !!carga || 'Carga horaria requerida']"
              :items="cargas"
              label="Jornada"
              required
            ></v-autocomplete>
              
            </v-flex>
             <v-flex
              xs12
              md4
            >
              <v-text-field
                v-model="mail"
                :rules="mailRules"
                label="Mail"
                required
              ></v-text-field>

            </v-flex>

             <v-flex
              xs12
              md4
            >
              <v-text-field
                v-model="grade"
               label="Grado Académico"
               :rules="[() => !!grade || 'Grado académico requerido']"
                required
              ></v-text-field>



            </v-flex>

          </v-layout>
        </v-container>
        <v-btn round color="info" @click="agregarProfesor">Agregar</v-btn>
      </v-form>
      




      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Editar Profesor/a</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.imageUrl" label="Url Foto"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.name" label="Nombre"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.ap" label="Apellidos"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.mail" label="Email"></v-text-field>
                </v-flex>
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





      <v-card>
        <v-card-title>
          Listado Profesores
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
         <v-progress-circular
                        v-if="professors.length === 0 "
                        :size="70"
                        :width="7"
                        color="primary"
                        indeterminate
                    ></v-progress-circular>  
        <v-data-table
          v-if="professors.length !== 0 "
          :headers="headers"
          :items="professors"
          :search="search"
          
        >
       

          <template v-slot:items="props">
            <td>  <img :src="(props.item.imageUrl)" ></td>
            <td class="text-xs-right">{{ props.item.name }}</td>
            <td class="text-xs-right">{{ props.item.ap }}</td>
            <td class="text-xs-right">{{ props.item.carga }}</td>
            <td class="text-xs-right">{{ props.item.espe }}</td>
            <td class="text-xs-right">{{ props.item.mail }}</td>
            <td class="text-xs-right">{{ props.item.grade }}</td>
            <td >
              <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>

              <v-icon
                small
                @click="deleteItem(props.item)"
              >
                delete
              </v-icon>
              
            </td>
          </template>
          <template v-slot:no-results>
            <v-alert :value="true" color="error" icon="warning">
              "{{ search }}" no se ha encontrado.
            </v-alert>
          </template>
        </v-data-table>
      </v-card>
      </v-card>
    </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
// @ is an alias to /src
import Vue from 'vue'
import Vuetify from 'vuetify'
import {mapState,mapActions} from 'vuex'

Vue.use(Vuetify)

export default {
  name: 'gestionprofesores',
  async mounted(){
      await this.obtenerTopicos();
      const data1 = await fetch('http://34.228.238.196:9090/professors/all');
      const profesores = await data1.json();

      profesores.map((item) => {
           this.professors.push({
               id: item.id,
               name: item.name  ,
               imageUrl: item.imageUrl,
               ap: item.firstLastName + ' ' + item.secondLastName,
               carga: 'Completa',
               espe: 'e1',
               mail: item.email,
               grade: 'Ingeniería Civil'
            }); 
          }),
   
    console.log(this.professors)
  }, 
  data () {
      return {
     //Elementos form
     editedItem: {
        id:0,
        imageUrl: '',
        name: '',
        ap: '',
        mail: ''
      },
    imageUrl:'',
    dialog: false,
    cargas: ['Completa', 'Por hora'],
    topicosSelection:null,
    valid: true,
    editedIndex: -1,
    id:0,
    mytopics:[],
    firstname: '',
    lastname: '',
    ap:'',
    carga: null,
    espe:'',
    mail:'',
    grade:'',
    professors: [],
    mailRules: [
          v => !!v || 'Mail es requerido',
          v => /.+@.+/.test(v) || 'Ingrese mail institucional'
        ],
    nameRules: [
      v => !!v || 'Es requerido',
    ],
    topic: '',
    topicRules: [
      v => !!v || 'Tópico es requerido',
    ],
     //Elementos tabla
          search: '',
      headers: [
        {
          text: 'Foto',
          align: 'center',
          sortable: false,
          value: 'imageUrl'
        },
        { text: 'Nombre', value: 'name',align: 'center' },
        { text: 'Apellidos', value: 'ap',align: 'center' },
        { text: 'Jornada', value: 'carga', align: 'center' },
        { text: 'Tópico', value: 'espe', align: 'center' },
        { text: 'Mail', value: 'mail', align: 'center' },
        { text: 'Grado académico', value: 'grade', align: 'center' },
         { text: 'Acciones', value: 'action', align: 'center' }
      ]
          }
  },
   computed: {
     ...mapState(['topicos']),
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      }
  },
  methods: {
    ...mapActions(['obtenerTopicos']),
     editItem (item) {
        this.editedIndex = this.professors.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.editedItem.id = item.id
        this.dialog = true
      },close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.professors)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.professors[this.editedIndex], this.editedItem)
          const profesor = {
                name: this.editedItem.name,
                firstLastName: this.editedItem.ap,
                secondLastName: ' ',
                email: this.editedItem.mail,
                imageUrl: this.editedItem.imageUrl
          }
          this.$http.put('http://34.228.238.196:9090/professors/'+ this.editedItem.id, profesor).then(response=>{
		    }, response=>{
          console.log(this.editedItem.imageUrl)
		    }); 
        } else {
          this.professors.push(this.editedItem)
          const profesor = {
                name: this.editedItem.name,
                firstLastName: this.editedItem.ap,
                secondLastName: ' ',
                email: this.editedItem.mail,
                imageUrl: this.editedItem.imageUrl
          }
          this.$http.put('http://34.228.238.196:9090/professors/'+ this.editedItem.id,profesor).then(response=>{
		    }, response=>{
          console.log(this.editedItem.id)
		    });
        }
        this.close()
      },

     deleteItem (item) {
        const index = this.professors.indexOf(item)
        console.log(item.id)
        confirm('¿seguro que desea eliminar a este profesor/a?') && this.professors.splice(index, 1) 
        && this.$http.delete('http://34.228.238.196:9090/professors/'+ item.id).then(response=>{
		    }, response=>{
		    	console.log(item.id)
		    });
         
      },
   agregarProfesor: async function(){
     const mytopics=[{
        id: this.topicosSelection.id,
        name: this.topicosSelection.name,
        description: this.topicosSelection.description,
        urlImage: this.topicosSelection.urlImage 
      }]
        const profesor = {
                name: this.firstname,
                firstLastName: this.lastname,
                secondLastName: ' ',
                email: this.mail,
                imageUrl:'',
                topics: mytopics
        }
       if (this.$refs.form.validate()) {
          this.snackbar = true  
          confirm('¿seguro que desea agregar a este profesor/a?') && this.$http.post('http://34.228.238.196:9090/professors',profesor).then(response=>{
		       	  const profs = {
               name: this.firstname,
               ap: this.lastname,
               carga: 'Completa',
               espe: 'e1',
               mail: this.mail,
               grade: 'Ingeniería Civil'
              } 
              this.mytopics = []
              this.professors.push(profs)
              this.$refs.form.reset()
		    }, response=>{
		    	
        });
       }
        }

  }
}
  
</script>
<style>

#card1{
    width:130%; 
    margin-left:15%; 
    margin-right:15%;

 }
 

</style>
