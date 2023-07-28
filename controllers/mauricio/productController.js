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

        let indexOfProductToRemove = productos.indexOf(producto);

        if (indexOfProductToRemove !== -1) {
            //splice recibe el index como primer argumento y la cantidad de elementos que se elimina de ahi en adelante, en este caso
            //solo sera el producto identificado
            productos.splice(indexOfProductToRemove, 1);
        }

        //Escribir en el archivo JSON
        let archivoProductosActualizado = JSON.stringify(productos, null, 2);
        //console.log(archivoProductosActualizado);
        //fs.writeFileSync(path.resolve(__dirname, "../../database/productos.json"), archivoProductosActualizado);

        console.log("Producto elimiando correctamente.");
        res.redirect("/");
    }
}


module.exports = productController; 