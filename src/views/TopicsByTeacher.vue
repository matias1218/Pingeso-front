<template>
    <v-container grid-list-md style="margin-top: -64px;">
        <v-layout row wrap >

            <!-- aqui debe ir un iterador que tome una lista
            de topicos con los profesores a cargo -->
            
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
        description: 'Esto es una descripcion del tópico'
      }
    }
}
</script>

<style>

</style>
