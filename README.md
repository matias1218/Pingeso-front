# Pingeso/Tingeso FrontEnd
------
## Notas de instalacion:
* Proyecto bajo vue-cli 3.-
* Se dejó configurado Vuex en store.js
* Actualmente se esta usando Vuetify

### Modulos anexados 
* Bootstrap CSS only
* postcss-import
* vue-izitoast
* vuetify
* kendo-gantt-vue-wrapper

### Instalacion modulos (en caso necesario)
```
npm i bootstrap-css-only
npm i postcss-import
npm install vue-izitoast --save
npm install --save @progress/kendo-ui
npm install --save @progress/kendo-theme-default
npm install --save @progress/kendo-gantt-vue-wrapper
```

## Rutas
* Portada: "/"
* topicos por profesores: "/topicsByTeacher"
* gestion profesores: "/gestionprofesores"
* asignacion de memorias: "/asignaciones"
* login: "/login"
* Administrar profesores: "/gestionprofesores"
* Ver las memorias asignadas a profesores: "/verAsignaciones"
* ver estadisticas (historial Pseudo-Gantt y gráficos): "/estadisticas"
* trazamiento de memorias: "/revision"
* ver comisiones por alumno y agregar nuevos junto a su memoria: "/gestionalumnos"
* ver memorias y editarlas: "/gestionMemorias"

### Diagrama de diálogo

![entidades](https://i.ibb.co/NF8ND4P/Sin-t-tulo.png)


### Arquitectura

![entidades](https://vuex.vuejs.org/vuex.png)


### Descarga de dependencias
```
$ npm install
```

###  Compilaciones y recargas reactivas para desarrollo
```
$ npm run serve
```



