import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    topicos: [],
    cosita: 'wea',
    dialog: false
  },
  mutations: {
    cambiarEstadoDialog(state,estado){
      state.dialog = estado;
    },
    actualizarTopico(state,topico){
      state.topicos = topico;
    }
  },
  actions: {
    obtenerTopicos: async function({commit,state}){
      
      // var data;
      // //const data = await fetch('http://23.20.84.8:9090/professors/topic/1');
      // this.$http.get('http://23.20.84.8:9090/professors/topic/1').then(response=>{
      //     // get body data
      //     data = response.body;
          
      // }, response=>{
      //   console.log("AWDwad");
      //     // error callback
      //     //console.log('error cargando lista');
      // });
      // var topico = await data.json();
      // commit('actualizarTopico',topico);
      commit('cambiarEstadoDialog',true);
      const data = await fetch('https://memoriausach.azurewebsites.net/topics');
      const topico = await data.json();
      commit('actualizarTopico',topico);
      commit('cambiarEstadoDialog',false);
    }
  }
})
