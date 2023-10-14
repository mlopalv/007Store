const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require("multer");
const { check, validationResult, body } = require('express-validator');

const productController = require(path.resolve(__dirname,'../controllers/productController'));

const validaciones = [
    body("nombre").notEmpty().withMessage("BV: El campo nombre de producto debe tener un valor."),
    body("nombre").isLength({min: 5}).withMessage("BV: El nombre del producto debe tener mínimo 5 caracteres."),
    
    body("descripcion").notEmpty().withMessage("BV: La descripción del producto debe tener un valor."),
    body("descripcion").isLength({min: 20}).withMessage("BV: La dscripción del producto debe de ser por lo menos de 20 caracteres."),

    body("categoriaId").notEmpty().withMessage("Debe ingresar un valor válido de categoría."),
    body("categoriaId").custom ( (value, { req }) => {            
        console.log("Dentro de validador de categoria ID" + value);
        console.log("Evaluador de categoria ID:"+(parseInt(value) === -1));
        return parseInt(value) !== -1;
     }
    ).withMessage("BV: Debe ingresar un valor válido de categoría."), 
    
    body("costo").notEmpty().withMessage("BV: El costo del producto debe tener un valor.")

      
];
//Tuve que duplicar las validaciones porque lo nombres de los campos son diferentes en las pagina de creacion y edicion
//Esto se puede arreglar posteriormente
const validacionesEdicionProducto = [
    body("name").notEmpty().withMessage("BV: El campo nombre de producto debe tener un valor."),
    body("name").isLength({min: 5}).withMessage("BV: El nombre del producto debe tener mínimo 5 caracteres."),
    
    body("description").notEmpty().withMessage("BV: La descripción del producto debe tener un valor."),
    body("description").isLength({min: 20}).withMessage("BV: La dscripción del producto debe de ser por lo menos de 20 caracteres."),

    body("categoriaId").notEmpty().withMessage("Debe ingresar un valor válido de categoría."),
    body("categoriaId").custom ( (value, { req }) => {            
        console.log("Dentro de validador de categoria ID" + value);
        console.log("Evaluador de categoria ID:"+(parseInt(value) === -1));
        return parseInt(value) !== -1;
     }
    ).withMessage("BV: Debe ingresar un valor válido de categoría."),
    
    body("price").notEmpty().withMessage("BV: El costo del producto debe tener un valor.")    
      
];

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

router.get('/', productController.productList);
router.get('/products', productController.index);
router.get('/products/create', productController.create);
router.post('/products/savenew',  uploadFile.single("imagenProducto"), validaciones, productController.savenew);
/* Obtener las categorias de los productos */
router.get("/products/categories", productController.categories);
/* Ver los detalles de un producto especifico */
router.get('/products/:id', productController.details);
/* Entrega el formulario de edicion de productos */
router.get('/products/:id/edit', productController.getById);
/* Actualiza un producto especifico */
router.put('/products/:id', uploadFile.single("imagenProducto"), validacionesEdicionProducto, productController.update);
/* Borra un producto especifico */
router.delete('/products/:id', productController.delete);

/**Ver informacion del carrito */
router.get("/products/");




module.exports = router;
