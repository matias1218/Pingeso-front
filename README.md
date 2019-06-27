# Pingeso/Tingeso FrontEnd
------
## Notas de instalacion:
* Proyecto bajo vue-cli 3.-
* Se dejó configurado Vuex en store.js
* Actualmente se esta usando Vuetify
* si me acuerdo de otra cosa lo escribiré aqui :D

## Rutas
* topicos por profesores: "/topicsByTeacher"
* gestion profesores: "/gestionprofesores"
* asignacion de memorias: "/asignaciones"
* login: "/login"
* Administrar profesores: "/gestionprofesores"
* Ver las memorias asignadas a profesores: "/verAsignaciones"
* ver estadisticas (historial Pseudo-Gantt y gráficos): "/estadisticas"

### Modulos anexados 
* Bootstrap CSS only
* postcss-import
* vue-izitoast
* vuetify
* kendo-gantt-vue-wrapper
* vue-google-oauth2

### Arquitectura

![entidades](https://vuex.vuejs.org/vuex.png)

### Instalacion modulos (en caso necesario)
```
npm i bootstrap-css-only
npm i postcss-import
npm install vue-izitoast --save
npm install --save @progress/kendo-ui
npm install --save @progress/kendo-theme-default
npm install --save @progress/kendo-gantt-vue-wrapper
npm install vue-google-oauth2
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```


