<template>
  <div class="text-xs-center">
    <v-dialog
      v-model="dialogo"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
          Please stand by
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
                return this.$store.state.dialog
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

</style>
