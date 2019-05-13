<template>
    <v-container grid-list-md>
        <v-layout row wrap >

                <!-- aqui debe ir un iterador que tome una lista
                de topicos con los profesores a cargo -->
                <v-flex md12>
                    <h1 class="display-2 font-weight-thin mb-3 white--text">Profesores por tópicos</h1>
                    <h4 class="subheading white--text">Listado de profesores segun especialidad</h4>
                </v-flex>
                <teacher-card 
                :topicName="topic"
                :teacherName="teacher"
                :description="description"
                :src="imagen"/>    <!--  deje un bind a src para poner un link de imagen -->

                <teacher-card 
                topicName="Biotecnología"
                teacherName="Mario Inostroza, ..."
                description="description"
                src="http://resources.chrysalis.cl/2016/07/shutterstock_142053856-1728x800_c.jpg"/>

                <teacher-card 
                topicName="Optimización"
                teacherName="Victor Parada, Cristian Sepulveda, ...."
                description="description"
                src="https://ocw.ua.es/es/imagenes/fotos/ingenieria-arquitectura/simulacionyoptimizacion.jpg"/>

                <teacher-card 
                topicName="Sistemas"
                teacherName="Bruno Jerardino, Edmundo Leiva, ......"
                description="description"
                src="https://conceptodefinicion.de/wp-content/uploads/2017/04/Teor%C3%ADa_de_Sistemas.jpg"/>
                
                
            
        </v-layout>
    </v-container>
</template>

<script>

import Vue from 'vue'
import Vuetify from 'vuetify'
import TeacherCard from '@/components/TeacherCard.vue'
Vue.use(Vuetify)
export default {
    name:'topicsTeacher',
    components:{
        TeacherCard
    },
    data() {
      return{
        // esto es temporal
        topic:'Ingeniería de software',
        teacher:'Hector Antillanca, ...',
        description: 'Esto es una descripcion del tópico',
        imagen:'https://goodbytes.io/files/2017/08/Dise%C3%B1o-y-desarrollo-web-03.jpg'
      }
    }
}
</script>

<style>

</style>
