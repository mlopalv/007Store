const express = require('express');
const router = express.Router();
const path = require('path');

module.exports = {
    
    index: (req, res)=>{
        /*let motos = mainController.leerJSON("motos.json");
        res.render(path.resolve(__dirname,"../views/admin/administrar.ejs"), {motos: motos});*/
        console.log("Vista de listado de productos");
    },
    create: (req, res) => {
        res.render(path.resolve(__dirname,"../../views/productCreate.ejs"));
    }
}