const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

/*let motos = mainController.leerJSON("motos.json");
res.render(path.resolve(__dirname,"../views/admin/administrar.ejs"), {motos: motos});*/

module.exports = {
    
    index: (req, res)=>{
        let inventario = fs.readFileSync(path.resolve(__dirname,'../../database/productos.json'));
        inventario = JSON.parse(inventario);
        let temp = {};
        console.log("Vista de listado de productos");
        console.log("El tamano del inventario es: " + inventario.length)
        let counter = 0;
        inventario.forEach(element => {
            counter++;
            console.log("Estoy imprimiendo un objeto. El ciclo es: " + counter);
            console.log("El ID es: " + element.id);
            console.log("El nombre es: " + element.name);
            console.log("La descripcion es: " + element.description);
            console.log("La imagen es: " + element.image);
            console.log("El precio es: " + element.price + "\n");
        });
        //console.log(inventario);
        res.render(path.resolve(__dirname,"../../views/productIndex.ejs"), {inventario});

    },

    create: (req, res) => {
        res.render(path.resolve(__dirname,"../../views/productCreate.ejs"));
    }
}