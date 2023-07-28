const express = require("express");
const app = express();
const path = require("path");
/* Importamos method-override para poder usar acciones PUT y DELETE desde los formularios HTML */
const methodOverride = require("method-override");

const publicPath = path.resolve(__dirname, "./public");

app.use(express.static(publicPath));
//Configuracion para procesamiento de envios POST
app.use(express.urlencoded({extended:false}));
app.use(express.json());
//Uso de method-override dentro de esta aplicacion
app.use(methodOverride("_method"));
//Indicamos que el template-engine a usar es ejs
app.set('view engine','ejs');


//Requerir las rutas
const rutasProductos = require('./routes/productos');
const rutasMain = require("./routes/main");


//Para usar las rutas
app.use(rutasMain);
app.use(rutasProductos);


app.listen(3000, () => {
    console.log("Servidor corriendo en puerto 3000");
    console.log("Folder Path = " + publicPath);
});