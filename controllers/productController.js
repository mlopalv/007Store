const fs = require("fs");
const path = require('path');
let db = require("../database/models");

productController = {

    index: (req, res) => {

        db.Product.findAll()
            .then(inventario => {
                console.log("Direccionando hacia productIndex");
                console.log("El tamano del inventario es: " + inventario.length)
                res.render("productIndex", { inventario });
            });
    },

    create: (req, res) => {

        db.Category.findAll()
            .then(allCategories => {
                console.log("Direccionando hacia creacion de productos.");
                res.render("productCreate.ejs", { allCategories });
                //res.render("productIndex", {inventario});
            });
    },

    savenew: (req, res) => {
        console.log('Creando nuevo producto ...');
        console.log('nombre = ' + req.body.nombre);
        console.log('descripcion = ' + req.body.descripcion);
        console.log('costo = ' + req.body.costo);

        let prodImage = req.file ? req.file.filename : req.body.oldImage;

        console.log("Valor de req.body.imagenProducto = " + req.body.imagenProducto);

        db.Product.create({
            name: req.body.nombre,
            description: req.body.descripcion,
            price: Number(req.body.costo),
            subcategory_id: 1,
            image_path: prodImage

        }).then(product => {
            console.log("Producto agregado correctamente: " + product.name);
        }
        ).then(
            db.Product.findAll()
                .then(inventario => {
                    console.log("Direccionando hacia productIndex");
                    res.render("productIndex", { inventario });
                })
        );

    },
    details: (req, res) => {
        console.log("Product details ...");

        let idProducto = parseInt(req.params.id);

        //Codigo manejo de persistencia con sequilizer
        db.Product.findByPk(idProducto)
            .then(producto => {
                console.log("Direccionando hacia productDetails con productoId = " + idProducto);
                console.log("Imagen del producto: " + producto.image_path);
                res.render("productDetails", { producto });
            });

    },
    //Codigo manejo de persistencia con archivos planos
    getById: (req, res) => {
        let idProducto = parseInt(req.params.id);

        //Codigo con manejo de persistencia usando sequielizer
        db.Product.findByPk(idProducto)
            .then(producto => {
                console.log("Direccionando hacia productDetails con productoId = " + idProducto);
                console.log("Imagen del producto: " + producto.image_path);
                console.log("Renderizando vista de edicion de productos");
                res.render("productEdit", { producto });
            });

    },

    update: (req, res) => {

        let idProducto = parseInt(req.params.id);
        console.log("Actualizacion del producto -> Id obtenido del producto -> " + idProducto);

        let prodImage = req.file ? req.file.filename : req.body.oldImage;

        db.Product.findByPk(idProducto)
            .then(producto => {
                console.log("Obteniendo producto para actualización: " + idProducto);
                console.log("Imagen del producto: " + producto.image_path);

                return producto;
            }).then(producto => {

                producto = producto.update({
                    name: req.body.name,
                    description: req.body.description,
                    price: Number(req.body.price),
                    subcategory_id: 1,
                    image_path: prodImage
                }).then(producto => {
                    producto.save();
                    return producto
                });

                return producto;

            }).then(producto => {
                console.log("Actualización realizada corectamente: " + producto.id);
                console.log("Producto actualizado correctamente.");
                res.redirect("/");
            });

    },

    delete: (req, res) => {
        let idProducto = parseInt(req.params.id);
        console.log("Eliminacion de producto -> Id obtenido del producto -> " + idProducto);

        db.Product.findByPk(idProducto)
            .then(producto => {
                console.log("Obteniendo producto para actualización: " + idProducto);
                console.log("Imagen del producto: " + producto.image_path);

                return producto;
            }).then(producto => {

                producto = producto.destroy({
                    where: { id: producto.id }
                });

                return producto;

            }).then(producto => {
                console.log("Eliminación de producto realizada corectamente: " + producto);
                console.log("Tratando de borrar producto con image_path= " + producto.image_path);
                fs.unlinkSync(path.resolve(__dirname, "../public/images/productos/" + producto.image_path));
                res.redirect("/");
            });
    },
    categories: (req, res,) => {
        console.log("Obteniendo categorias ...");
        var type = req.query.type;
        var search_query = req.query.parent_value;

        db.Category.findAll()
            .then(categorias => {
                
                var data_arr = [];

                categorias.forEach(function (categoria) {
                    data_arr.push(categoria);
                });

                res.json(data_arr);
                //res.render("productIndex", {inventario});
            })

    }

}


module.exports = productController; 