const fs = require("fs");
const path = require('path');
const { validationResult } = require('express-validator');
let db = require("../database/models");

productController = {

    productList: (req, res) => {
        db.Product.findAll({
            include: [{
                model: db.Category,
                as: "category"
            }]
        })
            .then(productos => {
                console.log("Direccionando hacia productList");
                console.log("El tamano del inventario de productos es: " + productos.length)
                /** Obtener las categorías de productos */
                return productos;

            }).then(productos => {
                db.Category.findAll()
                    .then(categorias => {
                        console.log("Direccionando hacia creacion de productos.");
                        res.render("productList", { productos, categorias });
                    });
            });
    },

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
        console.log("Id de la categoria: " + req.body.categoriaId);

        let prodImage = req.file ? req.file.filename : req.body.oldImage;

        console.log("Valor de req.body.imagenProducto = " + req.body.imagenProducto);

        let errors = validationResult(req);

        if (errors.isEmpty()) {

            db.Product.create({
                name: req.body.nombre,
                description: req.body.descripcion,
                price: Number(req.body.costo),
                category_id: parseInt(req.body.categoriaId),
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

        } else {
            console.log("El registro de producto tiene algunos errores ... " + errors.errors.length);
            errors = errors.errors;

            db.Category.findAll()
                .then(allCategories => {
                    console.log("Direccionando hacia creacion de productos.");
                    console.log("Tamano del arreglo de errores: " + errors.length);

                    res.render("productCreate.ejs", {
                        allCategories, errors, oldData: {
                            nombre: req.body.nombre,
                            descripcion: req.body.descripcion,
                            costo: Number(req.body.costo),
                            categoria: 1,
                            image_path: prodImage
                        }
                    });

                });
        }

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
    
    getById: (req, res) => {
        let idProducto = parseInt(req.params.id);

        //Codigo con manejo de persistencia usando sequielizer
        db.Product.findByPk(idProducto, {
            include: [{
                model: db.Category,
                as: "category"
            }]
            }).then(producto => {
                
                return producto;
                //res.render("productEdit", { producto });
            }).then(producto => {
                
                db.Category.findAll()
                .then(allCategories => {
                    console.log("Imagen del producto: " + producto.image_path);
                    console.log("Renderizando vista de edicion de productos");
                    console.log("Direccionando hacia edición de producto con productId = " + producto.id);
                    console.log("Direccionando hacia edición de producto con categoría = " + producto.category.id);
                    
                    res.render("productEdit", { producto, allCategories });                  

                });


            });

    },

    update: (req, res) => {

        let idProducto = parseInt(req.params.id);
        console.log("Actualizacion del producto -> Id obtenido del producto -> " + idProducto);

        let prodImage = req.file ? req.file.filename : req.body.oldImage;

        let errors = validationResult(req);

        if (errors.isEmpty()) {

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
                        category_id: parseInt(req.body.categoriaId),
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
        } else {
            console.log("La actualización del producto tiene algunos errores ... " + errors.errors.length);
            errors = errors.errors;         

            
            db.Product.findByPk(idProducto)
                .then(producto => {
                    console.log("Direccionando hacia productDetails con productoId = " + idProducto);
                    console.log("Imagen del producto: " + producto.image_path);
                    console.log("Renderizando vista de edicion de productos");
                    res.render("productEdit", { producto: {                        
                        id: idProducto,
                        name: req.body.name,
                        description: req.body.description,
                        price: Number(req.body.price),
                        category_id: 1,
                        image_path: prodImage
                    }, errors});
                    
                });           
        }

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