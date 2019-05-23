<template>        
 
    <v-snackbar
        v-model="snackbar"
        right
        :timeout="timeout"
        top
        :color="color"
    >
      {{ text }}
      <v-btn
        dark
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  
</template>

<script>
export default {
    props:['snackbar','text','color'],
    data () {
      return {
       snackbar:false,
        y: 'top',
        x: 'left',
        mode: '',
        color:'color',
        timeout: 6000,
      }
    }
  }
</script>

<style>

</style>
