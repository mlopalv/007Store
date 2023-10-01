const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require("multer");

const productController = require(path.resolve(__dirname,'../controllers/productController'));

//Uso de multer para almacenamiento de imagenes 
const multerDiskStorage = multer.diskStorage(
    //Objeto literal con dos funciones
    {
        destination: function (req, file, cb) {
            cb(null, path.resolve(__dirname,"../public/images/productos"));
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + path.extname(file.originalname));
        }
    }

);

//Variable que sirve como middleware para la carga con multer
const uploadFile = multer({ storage: multerDiskStorage });

router.get('/products', productController.index);
router.get('/products/create', productController.create);
router.post('/products/savenew',  uploadFile.single("imagenProducto"), productController.savenew);
/* Obtener las categorias de los productos */
router.get("/products/categories", productController.categories);
/* Ver los detalles de un producto especifico */
router.get('/products/:id', productController.details);
/* Entrega el formulario de edicion de productos */
router.get('/products/:id/edit', productController.getById);
/* Actualiza un producto especifico */
router.put('/products/:id', uploadFile.single("imagenProducto"), productController.update);
/* Borra un producto especifico */
router.delete('/products/:id', productController.delete);

/**Ver informacion del carrito */
router.get("/products/");




module.exports = router;
