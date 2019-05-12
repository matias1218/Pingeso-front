<template>  
    <v-flex xs12 sm6 id="card">
       <v-card hover >
         
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
            <v-btn flat color="orange">Ver asignaciones</v-btn>
            <v-spacer></v-spacer>
            <v-btn flat color="orange">Administrar</v-btn>
        </v-card-actions>
       </v-card> 
    </v-flex>
    
</template>

<script>
export default {
    props:['teacherName','description','topicName','src'],
    data(){
        return{
            
        }
        
    }
}
</script>

<style>
#card{
    padding: 30px;
    
}

</style>
