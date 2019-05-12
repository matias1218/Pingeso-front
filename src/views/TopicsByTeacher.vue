<template>
    <v-container grid-list-md>
        <v-layout row wrap >

            <!-- aqui debe ir un iterador que tome una lista
            de topicos con los profesores a cargo -->
            
                <teacher-card 
                :topicName="topic"
                :teacherName="teacher"
                :description="description"
                :src="imagen"/>    <!--  deje un bind a src para poner un link de imagen -->

                <teacher-card 
                :topicName="topic"
                :teacherName="teacher"
                :description="description"/>

                <teacher-card 
                :topicName="topic"
                :teacherName="teacher"
                :description="description"/>

                <teacher-card 
                :topicName="topic"
                :teacherName="teacher"
                :description="description"/>
                
                
            
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
        teacher:'Hector Antillanca',
        description: 'Esto es una descripcion del tópico',
        imagen:'https://goodbytes.io/files/2017/08/Dise%C3%B1o-y-desarrollo-web-03.jpg'
      }
    }
}
</script>

<style>

</style>
