const express = require("express");
const app = express();
const path = require("path");
let session = require('express-session');
let bcrypt = require("bcryptjs");
/* Importamos method-override para poder usar acciones PUT y DELETE desde los formularios HTML */
const methodOverride = require("method-override");
const cookie = require('cookie-parser');
const recordarMiddleware = require('./middlewares/recordarMiddleware');
const asignarSesionAVistasMiddleware = require('./middlewares/asignarSessionAVistas');

/*Lybraries to work with swagger*/
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');


const publicPath = path.resolve(__dirname, "./public");
/*Seccion app.use*/
app.use(express.static(publicPath));
//Configuracion para procesamiento de envios POST
app.use(express.json());
//Uso de method-override dentro de esta aplicacion
app.use(methodOverride("_method"));
//URL encode  - Para que nos pueda llegar la información desde el formulario al req.body
app.use(express.urlencoded({ extended: false }));
//Indicamos que el template-engine a usar es ejs
app.set('view engine','ejs');
//Indicacion del uso de la session
app.use(session({secret: "Es un secreto"}));
//Las cookies
app.use(cookie());
//Recordar la cookies y reabrir session
app.use(recordarMiddleware);

//Middleware para tener acceso al usuario en las vistas
app.use(asignarSesionAVistasMiddleware);


  



//Requerir las rutas
const rutasProductos = require('./routes/productos');
const rutasUsuarios = require('./routes/usuarios');
const rutasMain = require("./routes/main");
const cookieParser = require("cookie-parser");

//Rutas para API
const rutasUsauriosAPI = require("./routes/api/usuariosRoutesAPI");
const rutasProductosAPI = require("./routes/api/productosRoutesAPI");


//Configuración de Swagger para documentar las API
const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: '007 Store API',
        version: '1.0.0',
        description: 'An API to get product and customer information from the global 007 Store site.',
        contact: {
            name: "Mauricio Lopez",
            email: "mlopalv@gmail.com",
            url: "https://github.com/mlopalv/"
          },
      },
      servers: [
        {
          url: 'http://localhost:3001',
          description: "Local server"
        },
      ],
    },
    //apis: ['./Grupo_2_Proyecto007/routes/api*.js'],
    apis: ["./routes/api/*.js"]
  };
  
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//Uso de las rutas
app.use(rutasMain);
app.use(rutasProductos);
app.use(rutasUsuarios);

//Uso de rutas para API
app.use(rutasUsauriosAPI);
app.use(rutasProductosAPI);


app.listen(3001, () => {
    console.log("Servidor corriendo en puerto 3001");
    console.log("Folder Path = " + publicPath);
});