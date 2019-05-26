<template>  
    <v-flex d-flex xs12 sm6 id="card">
      <v-hover>
       <v-card class="flexcard" hover slot-scope="{ hover }"
        :class="`elevation-${hover ? 21 : 2}`" >
         
        <v-img :src="src"
            aspect-ratio="2.75">    
        </v-img>
        <v-card-title primary-title>
            <h1 class="display-1">{{topicName}}</h1>   
        </v-card-title>
        <hr>
        <v-card-text>
            <h4>Profesores: {{teacherName}}</h4>
            <p>{{description}}</p>
            
        </v-card-text>
        <v-card-actions id="action">            
            <v-btn flat color="orange"  @click='onClick1(topicId)' >Ver asignaciones</v-btn>
            <v-spacer></v-spacer>
            <v-btn flat color="orange" @click='onClick(profesor)'>Administrar</v-btn>
        </v-card-actions>
       </v-card> 
       <loader-state></loader-state>
      </v-hover>
    </v-flex>
    
</template>

<script>
import {mapState,mapMutations, mapActions} from 'vuex'
export default {
    props:['teacherName','description','topicName','src','professor', 'idTopic'],
    computed:{
        profesor:{
            get(){
                return this.professor
            }
        },
        topicId:{
            get(){
                return this.idTopic
            }
        }
    },
    data(){
        return{
            idProfesores: this.professor
        }  
    },
    methods:{
        ...mapActions(['obtenerTesis','obtenerProfesores']),
        onClick: async function(profe){
            this.$store.commit('cambiarEstadoDialog',true);
            await this.obtenerTesis();
            await this.obtenerProfesores();
            this.$store.commit('getProfessorsId',this.professor);
            this.$store.commit('actualizarArea',this.topicName);
            this.$router.push('/asignaciones');
            this.$store.commit('cambiarEstadoDialog',false);
            
            
        },
        onClick1: async function(idtopic){
            this.$store.commit('getTopicosId',this.idTopic);
            this.$store.commit('actualizarArea',this.topicName);
            this.$router.push('/verAsignaciones');      
        }
    }
}
</script>

<style>
#card{
    padding: 30px;   
}
.flexcard {
  display: flex;
  flex-direction: column;
}
</style>
