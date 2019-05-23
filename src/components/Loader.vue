<template>
  <div  class="text-xs-center">
    <v-dialog
      v-model="dialogo"
      persistent
      width="300"
    >
      <v-card id="mycard"
        color="primary"
        dark
      >
        <v-card-text >
          Por favor espere
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    computed:{
        ...mapState(['dialog']),
        dialogo: {
            get () {
                return this.dialog
            }
        }
    },
    data () {
      return {
        //dialogo: 
      }
    }
  }
</script>

<style>
#mycard{
    margin-top: 0px;
    margin-bottom: 0px;
}
</style>
