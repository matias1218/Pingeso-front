<template>  
    <v-flex xs12 sm6 id="card">
      <v-hover>
       <v-card hover slot-scope="{ hover }"
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
        <v-card-actions>
            <v-btn flat color="orange" href="/verAsignaciones" >Ver asignaciones</v-btn>
            <v-spacer></v-spacer>
            <v-btn flat color="orange" @click='onClick(profesor)'>Administrar</v-btn>
        </v-card-actions>
       </v-card> 
      </v-hover>
    </v-flex>
    
</template>

<script>
import {mapState,mapMutations, mapActions} from 'vuex'
export default {
    props:['teacherName','description','topicName','src','professor'],
    computed:{
        profesor:{
            get(){
                return this.professor
            }
        }
    },
    data(){
        return{
            idProfesores: this.professor
        }  
    },
    methods:{
        ...mapMutations(['getProfessorsId']),
        ...mapActions(['obtenerTesis']),
        onClick: async function(profe){
            await this.obtenerTesis();
            this.$store.commit('getProfessorsId',this.professor);
            this.$router.push('/asignaciones');
            
            
        }
    }
}
</script>

<style>
#card{
    padding: 30px;
    
}

</style>
