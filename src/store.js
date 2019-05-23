import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    topicos: [],
    cosita: 'wea',
    dialog: false,
    tesis: [],
    professors: [],
    TotalProfessors:[]
  },
  mutations: {
    cambiarEstadoDialog(state,estado){
      state.dialog = estado;
    },
    actualizarTopico(state,topico){
      state.topicos = topico;
    },
    actualizarTesis(state,tesis){
      state.tesis = tesis;
    },
    getProfessorsId(state,profesores){
      state.professors = profesores;
    },
    actualizarProfesores(state,profesores){
      state.TotalProfessors = profesores;
    }
  },
  actions: {
    obtenerTopicos: async function({commit,state}){
      commit('cambiarEstadoDialog',true);  // en teoria esto deberia hacerse con un mutation
      const data = await fetch('http://23.20.84.8:9090/topics/all');
      const topico = await data.json();
      commit('actualizarTopico',topico);
      commit('cambiarEstadoDialog',false);
    },
    obtenerTesis: async function({commit}){
      const data = await fetch('http://23.20.84.8:9090/theses/missing/commission');
      const tesis = await data.json();
      commit('actualizarTesis',tesis);
    },
    obtenerProfesores: async function({commit}){
      const data = await fetch('http://23.20.84.8:9090/professors/all');
      const profesores = await data.json();
      commit('actualizarProfesores',profesores);
    }
  }
})
