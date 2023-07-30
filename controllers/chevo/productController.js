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
        /*
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
        */
        //console.log(inventario);
        res.render(path.resolve(__dirname,"../../views/productIndex.ejs"), {inventario});

    },

    create: (req, res) => {
        res.render(path.resolve(__dirname,"../../views/productCreate.ejs"));
    },

    savenew: (req,res) => {
        console.log('Entrando a save new');
        
        console.log('nombre = ' + req.query.nombre);
        console.log('descripcion = ' + req.query.descripcion);
        console.log('costo = ' + req.query.costo);
        let prodImage = req.file ? req.file.filename : req.body.oldImage;
        console.log("Valor de req.body.imagen = " + req.body.imagen);

        let newProd = {
            id: 100,
            name: req.query.nombre,
            description: req.query.descripcion,
            image: prodImage,
            price: Number(req.query.costo)
        }
        
        //newProd = JSON.stringify(newProd);

        let inventario = fs.readFileSync(path.resolve(__dirname,'../../database/productos.json'));
        inventario = JSON.parse(inventario);
        
        let arrayOfIds = [];

        for (let i=0; i < inventario.length; i++) {
            arrayOfIds.push(inventario[i].id);
            //console.log('Valor de ID = ' + inventario[i].id);
        };

        counter = 0;
        arrayOfIds.forEach(element => {
            counter++;
            //console.log("arrayOfIds [" + counter + "] = " + element);
        });        

        let maxID = Math.max(...arrayOfIds);

        console.log('Maximo ID = ' + maxID);

        newProd.id = maxID + 1;

        inventario.push(newProd);
        inventario = JSON.stringify(inventario, null, 4);
        console.log(inventario);
        fs.writeFileSync(path.resolve(__dirname,'../../database/productos.json'),inventario);
        //res.send('Producto agregado');
        inventario = JSON.parse(inventario);
        res.render(path.resolve(__dirname,"../../views/productIndex.ejs"), {inventario});
    }
}