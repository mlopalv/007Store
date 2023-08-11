const express = require("express");
const app = express();
const path = require("path");
let session = require('express-session');
/* Importamos method-override para poder usar acciones PUT y DELETE desde los formularios HTML */
const methodOverride = require("method-override");

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


//Requerir las rutas
const rutasProductos = require('./routes/productos');
const rutasUsuarios = require('./routes/usuarios');
const rutasMain = require("./routes/main");


//Para usar las rutas
app.use(rutasMain);
app.use(rutasProductos);
app.use(rutasUsuarios);


app.listen(3000, () => {
    console.log("Servidor corriendo en puerto 3000");
    console.log("Folder Path = " + publicPath);
});