const express = require('express');
const fs = require("fs");
const path = require('path');

productController = {

    getById: (req, res) => {
        let idProducto = parseInt(req.params.id);
        let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../database/productos.json")));

        let producto = productos.find((producto) => {
            return producto.id === idProducto ? true : false;
        });

        //console.log(producto);

        //res.render(path.resolve(__dirname,"../views/admin/administrar.ejs"), {motos: motos});
        console.log("Renderizando vista de edicion de productos");
        res.render("productEdit", { producto });

    },
    update: (req, res) => {

        let idProducto = parseInt(req.params.id);
        console.log("Actualizacion del producto -> Id obtenido del producto -> " + idProducto);
        let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../database/productos.json")));

        let producto = productos.find((p) => {
            return p.id === idProducto ? true : false;
        });

        console.log("Producto obtenido para la actualizacion: " + producto.name);
        //TOoDo adicional validaciones
        producto.name = req.body.name;
        producto.description = req.body.description.trim();
        producto.price = req.body.price;


        //Escribir en el archivo JSON
        let archivoProductosActualizado = JSON.stringify(productos, null, 2);
        //console.log(archivoProductosActualizado);
        fs.writeFileSync(path.resolve(__dirname, "../../database/productos.json"), archivoProductosActualizado);
        //console.log("Actualizacion de producto " + req.params.id);
        //console.log(producto);

        console.log("Producto actualizado correctamente.");
        res.render("productEdit", { producto });



    },
    delete: (req, res) => {
        let idProducto = parseInt(req.params.id);
        console.log("Eliminacion de producto -> Id obtenido del producto -> " + idProducto);
        let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../database/productos.json")));

        let producto = productos.find((p) => {
            return p.id === idProducto ? true : false;
        });

        console.log('ID del Producto a borrar: ' + JSON.stringify(producto));

        let indexOfProductToRemove = productos.indexOf(producto);

        console.log('indexOfProductToRemove = ' + indexOfProductToRemove);

        let temp1 = {};

        if (indexOfProductToRemove !== -1) {
            //splice recibe el index como primer argumento y la cantidad de elementos que se elimina de ahi en adelante, en este caso
            //solo sera el producto identificado
            console.log('producto encontrado');
            temp1 = productos.splice(indexOfProductToRemove, 1);
        } else {
            console.log('Producto no encontrado');
        }

        console.log("temp1 = " + JSON.stringify(temp1));
        //Escribir en el archivo JSON
        let archivoProductosActualizado = JSON.stringify(productos, null, 2);
        //console.log(archivoProductosActualizado);
        fs.writeFileSync(path.resolve(__dirname, "../../database/productos.json"), archivoProductosActualizado);

        console.log("Producto elimiando correctamente.");
        res.redirect("/products");
    }
}


module.exports = productController; 