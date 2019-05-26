<template>
    <v-container fluid grid-list-md>
        <v-layout align-space-around justify-center row fill-height wrap>
                <loader-state></loader-state>
                <!-- aqui debe ir un iterador que tome una lista
                de topicos con los profesores a cargo -->
                <v-flex md12>
                    <h1 class="display-2 font-weight-thin mb-3 white--text">Profesores por tópicos</h1>
                    <h4 class="subheading white--text">Listado de profesores según especialidad</h4>
                </v-flex>

                <!-- Iteración de los topicos  -->
                <template v-for="topic in topicos">
                    <teacher-card :key="topic.id"
                    :idTopic="topic.id"
                    :professor="topic.professors"
                    :topicName="topic.name"
                    :description="topic.description"
                    :teacherName="addProfesores(topic.professors)"
                    :src="imagen"/>
                </template>
                <!--  -->

                <!-- <teacher-card 
                topicName="Biotecnología"
                teacherName="Mario Inostroza, ..."
                description="description"
                src="http://resources.chrysalis.cl/2016/07/shutterstock_142053856-1728x800_c.jpg"/> -->
                
        </v-layout>
    </v-container>
</template>

<script>

import Vue from 'vue'
import Vuetify from 'vuetify'
import TeacherCard from '@/components/TeacherCard.vue'
import LoaderState from '@/components/Loader.vue'
import {mapState, mapMutations, mapActions} from 'vuex'
Vue.use(Vuetify)
export default {
    name:'topicsTeacher',

    computed:{
        ...mapState(['topicos'])
    },
    components:{
        TeacherCard,
        LoaderState
    },
    data() {
      return{
        // esto es temporal
        topic:'Ingeniería de software',
        teacher:'Hector Antillanca, ...',
        description: 'Esto es una descripcion del tópico',
        imagen:'https://goodbytes.io/files/2017/08/Dise%C3%B1o-y-desarrollo-web-03.jpg'
      }
    },
    methods:{
        ...mapActions(['obtenerTopicos']),
        addProfesores: function(profesores){
            //console.log(profesores);
            var nombres = '';
            profesores.forEach(function(element){
                if(element.name != undefined){
                    nombres = nombres + element.name + ', ';
                }
            });
            return nombres;
        }
    }
}
</script>

<style>

</style>
