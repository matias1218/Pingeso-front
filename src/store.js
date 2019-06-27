import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store =  new Vuex.Store({
  state: {
    isInit: false,
    isSignIn: false,
    user:null,
    topicos: [],
    cosita: 'wea',
    dialog: false,
    tesis: [],
    professors: [],
    TotalProfessors:[],
    topicoss:1,
    notificationSystem: {
      options: {
        show: {
          theme: "dark",
          icon: "icon-person",
          position: "topCenter",
          progressBarColor: "rgb(0, 255, 184)",
          buttons: [
            [
              "<button>Ok</button>",
              function(instance, toast) {
                alert("Hello world!");
              },
              true
            ],
            [
              "<button>Close</button>",
              function(instance, toast) {
                instance.hide(
                  {
                    transitionOut: "fadeOutUp",
                    onClosing: function(instance, toast, closedBy) {
                      console.info("closedBy: " + closedBy);
                    }
                  },
                  toast,
                  "buttonName"
                );
              }
            ]
          ],
          onOpening: function(instance, toast) {
            console.info("callback abriu!");
          },
          onClosing: function(instance, toast, closedBy) {
            console.info("closedBy: " + closedBy);
          }
        },
        ballon: {
          balloon: true,
          position: "bottomCenter"
        },
        info: {
          position: "topRight"
        },
        success: {
          position: "topRight"
        },
        warning: {
          position: "topRight"
        },
        error: {
          position: "topRight"
        },
        question: {
          timeout: 20000,
          close: false,
          overlay: true,
          toastOnce: true,
          id: "question",
          zindex: 999,
          position: "center",
          buttons: [
            [
              "<button><b>YES</b></button>",
              function(instance, toast) {
                instance.hide({ transitionOut: "fadeOut" }, toast, "button");
              },
              true
            ],
            [
              "<button>NO</button>",
              function(instance, toast) {
                instance.hide({ transitionOut: "fadeOut" }, toast, "button");
              }
            ]
          ],
          onClosing: function(instance, toast, closedBy) {
            console.info("Closing | closedBy: " + closedBy);
          },
          onClosed: function(instance, toast, closedBy) {
            console.info("Closed | closedBy: " + closedBy);
          }
        }
      }
    },
    estadoAsignacion:null,
    estadoEliminacion:null,
    area:'',
    comision: [],
    noCorregido:[],
    comisionesAsignadas:[]
  },
  mutations: {
    actualizarInit(state,estado){
      state.isInit = estado;
    },
    actualizarisSignIn(state,estado){
      state.isSignIn = estado;
    },
    actualizarUser(state,estado){
      state.user = estado;
    },
    actualizarNoCorregido(state,estado){
      state.noCorregido = estado;
    },
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
    },
    getTopicosId(state,topicoss){
      state.topicoss = topicoss;
    },
    actualizarAsignacion(state,estadoAsignacion){
      state.estadoAsignacion = estadoAsignacion;
    },
    actualizarEliminacion(state,estadoEliminacion){
      state.estadoEliminacion = estadoEliminacion;
    },
    actualizarArea(state,area){
      state.area = area;
    },
    actualizarComision(state,comision){
      state.comision = comision;
    },
    actualizarComisionesAsignadas(state,comision){
      state.comisionesAsignadas = comision;
    }
  },
  actions: {
    obtenerTopicos: async function({commit,state}){
      commit('cambiarEstadoDialog',true);  // en teoria esto deberia hacerse con un mutation
      const data = await fetch('http://34.228.238.196:9090/topics/all');
      const topico = await data.json();
      commit('actualizarTopico',topico);
      commit('cambiarEstadoDialog',false);
    },
    obtenerTesis: async function({commit}){
      const data = await fetch('http://34.228.238.196:9090/theses/missing/commission');
      const tesis = await data.json();
      commit('actualizarTesis',tesis);
    },
    obtenerProfesores: async function({commit}){
      const data = await fetch('http://34.228.238.196:9090/professors/all');
      const profesores = await data.json();
      commit('actualizarProfesores',profesores);
    },
    asignarCorreccion: async function({commit},data){ // aqui debe entrar nuevaAsignacion
      const data3 = await fetch('http://34.228.238.196:9090/students/'+data.data1+'/assign/'+data.data2);
      const estado = await data3.json();
      commit('actualizarAsignacion',estado);   
    },
    obtenerNoCorregidos: async function({commit},data){ 
      const data3 = await fetch('http://34.228.238.196:9090/theses/nocorrected');
      const estado = await data3.json();
      commit('actualizarNoCorregido',estado);   
    },
    eliminarCorreccion: async function({commit},data){
      var estado;
      var miInit = { method: 'PUT',
               mode: 'cors',
               cache: 'default' };
      await fetch('http://34.228.238.196:9090/theses/'+data.thesisId+'/removeCorrector/'+data.professorId,miInit).then(function(response) {
        if(response.ok) {
          console.log("eliminacion satisfactoria");
          estado = true;
        } else {
          console.log('Respuesta de red OK.');
          estado = false;
        }
      })
      .catch(function(error) {
        console.log('Hubo un problema con la petición Fetch:');
        estado = false;
      });
      commit('actualizarEliminacion',estado);
    },
    obtenerComision: async function({commit},data){
      const data3 = fetch('http://34.228.238.196:9090/theses/commission/'+element.id);
      const estado = await data3.json();
      commit('actualizarCommission',estado);  
    },
    obtenerTesisConComision: async function({commit}){
      const data3 = await fetch('http://34.228.238.196:9090/theses/full/commission');
      const estado = await data3.json();
      commit('actualizarComisionesAsignadas',estado);
    },
    declararRevision: async function({commit},data){
      const request = await fetch('http://34.228.238.196:9090/theses/tocorrection/'+data);
      const estado = await request.json();
      commit('actualizarAsignacion',estado);
    },
    declararDevolucion: async function({commit},data){
      const request = await fetch('http://34.228.238.196:9090/theses/'+data.data1+'/correction/'+data.data2);
      const estado = await request.json();
      commit('actualizarAsignacion',estado);
    }
  }
})
export default store