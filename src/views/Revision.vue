<template>
    <v-container grid-list-xs>
        <v-layout row wrap>
            <v-flex md12>
                <div>
                    <v-toolbar flat color="white">
                        <v-toolbar-title>My CRUD</v-toolbar-title>
                        <v-divider
                        class="mx-2"
                        inset
                        vertical
                        ></v-divider>
                        <v-spacer></v-spacer>
                        <v-dialog v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ on }">
                            <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
                        </template>
                        <v-card>
                            <v-card-title class="headline">Confirmar recibo de memoria?</v-card-title>
                            <v-card-text>¿Esta seguro que desea confirmar el recibo de la memoria seleccionada?.</v-card-text>

                            <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" flat @click="close">Cancelar</v-btn>
                            <v-btn color="blue darken-1" flat @click="save">Aceptar</v-btn>
                            </v-card-actions>
                        </v-card>
                        </v-dialog>
                    </v-toolbar>
                    <v-data-table
                        :headers="headers"
                        :items="fullComisiones"
                        class="elevation-1"
                    >
                        <template v-slot:items="props">
                        <td>{{ props.item.title }}</td>
                        <td class="text-xs-right">{{ props.item.student.email }}</td>
                        <!-- <td class="text-xs-right">{{ props.item.fat }}</td>
                        <td class="text-xs-right">{{ props.item.carbs }}</td>
                        <td class="text-xs-right">{{ props.item.protein }}</td> -->
                        <td class="justify-center layout px-0">
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
                        <template v-slot:no-data>
                        <v-btn color="primary" @click="initialize">Reset</v-btn>
                        </template>
                    </v-data-table>
                    </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'
  export default {
    data: () => ({
      dialog: false,
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
      desserts: [],
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
      ...mapState(['fullComisiones'])
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },
    methods: {
        ...mapActions(['asignarCorreccion','obtenerFullCommission','obtenerTesis','eliminarCorreccion']),
      initialize () {
        this.desserts = [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7
          }
        ]
      },


      async editItem (item) {
        console.log(item.id);
        // this.dialog = true
        await fetch('http://34.228.238.196:9090/theses/tocorrection/'+item.id);
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

      async save(id) {

        await fetch('http://34.228.238.196:9090/theses/tocorrection/'+id);
        
        this.close()
      }
    },

    mounted: async function(){
        await this.obtenerFullCommission();
        

    },
  }
</script>

<style>

</style>
