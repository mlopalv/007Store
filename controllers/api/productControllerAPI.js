let db = require("../../database/models");


const productControllerAPI = {
    
    list: (req, res) => {
        console.log("Product controller list ...");        

        db.Product.findAll({
            include: [{
                model: db.Category,
                as: "category"
            }]
        }).then(productos => {
                
                let meta = {
                    status: 200,
                    count: productos.length,
                    url: "api/productos"
                };

                let data = productos.map( (producto, index) => {
                     let product = {
                        id: producto.id,
                        name: producto.name,
                        description: producto.description,
                        precio: producto.price,  
                        categorie: producto.category.description,
                        imagePath: "http://localhost:3001/images/productos/" + producto.image_path,                      
                        detail: "api/productos/:"+producto.id
                    }   
                    return product;                    
                });
                //console.log(peliculas);
                //res.json({ meta, data});
                return datos = {meta, data};
            }).then( datos => {

                db.Category.findAll({
                    include: [{
                        model: db.Product,
                        as: "products"
                    }]
                }).then(allCategories => {
                    //Por cada categoría contar la cantidad de productos asociados
                    
                    let countByCategory = allCategories.map ( (category, index) => {
                        
                        console.log("Categoria: " + category.description + " Cantidad de productos: " + category.products.length);
                        let categoryMapped = {
                            category: category.description,
                            quantity: category.products.length
                        };
                        return categoryMapped;                    
                    });
                    //res.render("productEdit", { producto, allCategories }); 
                    

                    return res.json({ metadatos: datos.meta, countByCategory, data: datos.data });

                });

                

            });
    },
    
    detail: (req, res) => {
        console.log("Products controller details ...");
        let idProducto = parseInt(req.params.id);
        db.Product.findByPk(idProducto)
            .then(product => {

                let meta = {
                    status: 200,
                    total: 1,
                    url: "api/products/:id"
                };

                let data = {
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    imagePath: "http://localhost:3001/images/productos/"+product.image_path,                    
                    price: product.price                                       
                };               
                
                res.json({ meta, data});                
            });
    }

}

module.exports = productControllerAPI;