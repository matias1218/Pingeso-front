
<template>
  <v-layout>
    <v-flex>
      <v-sheet height="500">
        <v-calendar
          :now="today"
          :value="today"
          color="primary"
          locale="es"
        >
          <template v-slot:day="{ date }">
            <template v-for="event in eventsMap[date]">
              <v-menu
                :key="event.title"
                v-model="event.open"
                full-width
                offset-x
              >
                <template v-slot:activator="{ on }">
                  <div
                    v-if="!event.time"
                    v-ripple
                    class="my-event"
                    v-on="on"
                    v-html="event.title"
                  ></div>
                </template>
                <v-card
                  color="grey lighten-4"
                  min-width="350px"
                  flat
                >
                  <v-toolbar
                    color="primary"
                    dark
                  >
                    <v-toolbar-title v-html="event.title"></v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon>
                      <v-icon>cancel</v-icon>
                    </v-btn>
                  </v-toolbar>
                  <v-card-title primary-title>
                    <span v-html="event.details"></span>
                  </v-card-title>
                  <v-card-actions>
                  </v-card-actions>
                </v-card>
              </v-menu>
            </template>
          </template>
        </v-calendar>
      </v-sheet>
    </v-flex>
  </v-layout>
</template>
<script>
// @ is an alias to /src
import Vue from 'vue'
import Vuetify from 'vuetify'
Vue.use(Vuetify)

export default {
    data: () => ({
      today: null,
      events: [
        {
          title: 'Paquete de Visualizaciín de Resultados de Motores de Búqueda ',
          details: 'Roberto Gonzáles Ibañez - MAuricio MArin Caihuan - Manuel Manríquez L.',
          date: '2019-06-19',
          open: false
        },
        {
          title: 'Redescubrimiento y creación de Metaheurísticas mediante la generación automática de algoritmos',
          details: 'Víctor Parada Daza - Monica Villanueva Ilufi - Cristían Sepúlveda Sánchez',
          date: '2019-06-13',
          open: false
        },
        {
          title: 'Aplicación Móvil para la captura de imágenes aéreas y generación de ortomosaicos',
          details: 'Arturo Álvarez Cea - Pablo Román Asenjo - Carolina Toro',
          date: '2019-06-28',
          open: false
        },
        {
          title: 'Desarrollo de un módulo para asistentes destinados a la gestión y despliegue de protocolos de investigación en MO',
          details: 'Roberto Gonzalez Ibañez -  Arturo Álvarez Cea - Daniel Vega Araya',
          date: '2019-06-17',
          open: false
        },
        {
          title: 'Plataforma para monitorear y evaluar el desarrollo de proyectos de software construidos siguiendo el enfoque  de integración continua',
          details: 'Alcides Quispe Sanca - Héctor Antillanca Espina - Cristóbal Acosta Jurado',
          date: '2019-06-11',
          open: false
        },
        {
          title: 'Examen de Título',
          details: 'Eat chocolate until you pass out',
          date: '2019-01-01',
          open: false
        },
        {
          title: 'Examen de Título',
          details: 'Mute myself the whole time and wonder why I am on this call',
          date: '2019-01-21',
          open: false
        }
      ]
    }),
    computed: {
      // convert the list of events into a map of lists keyed by date
      eventsMap () {
        const map = {}
        this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e))
        return map
      }
    },
    methods: {
      open (event) {
        alert(event.title)
      }
    }
  }
</script>

<style>
  .my-event {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 2px;
    background-color: #1867c0;
    color: #ffffff;
    border: 1px solid #1867c0;
    width: 100%;
    font-size: 12px;
    padding: 3px;
    cursor: pointer;
    margin-bottom: 1px;
  }
</style>
