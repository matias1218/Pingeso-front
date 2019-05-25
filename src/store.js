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
    estadoAsignacion:null
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
    },
    getTopicosId(state,topicoss){
      state.topicoss = topicoss;
    },
    actualizarAsignacion(state,estadoAsignacion){
      state.estadoAsignacion = estadoAsignacion;
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
    },
    asignarCorreccion: async function({commit},data){ // aqui debe entrar nuevaAsignacion
      console.log(data.data1);
      console.log(data.data2);
      const data3 = await fetch('http://23.20.84.8:9090/students/'+data.data1+'/assign/'+data.data2);
      const estado = await data3.json();
      console.log(estado);
      commit('actualizarAsignacion',estado);
      // tesisParaAsignar.forEach(element => {
        
      //   this.$http.get('http://23.20.84.8:9090/students/'+tesisParaAsignar[0].student.id+'/assign/'+this.profesorActual.id).then(response=>{
      //       // get body data
      //       retorno = response.body;
      //       if(retorno == true){  
      //         this.$toast.success('Memoria asignada correctamente!', 'OK', this.notificationSystem.options.success);
      //         console.log("good");
      //       }
      //       else{
      //         this.$toast.warning('No es posible asignar la memoria', 'Alto', this.notificationSystem.options.warning);
      //         console.log("error");
      //       }
      //       console.log(retorno);
      //       console.log("good");
      //   }, response=>{
      //         console.log("error");
      //   });     
      // });
      
    },
  }
})
