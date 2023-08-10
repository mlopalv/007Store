/*codigo para administración de productos*/ 
const express = require('express');
const router = express.Router();
const path = require('path');
//const multer = require("multer");
const { check, validationResult, body } = require('express-validator');

//const currentPath = path.resolve(__dirname,'../controllers/usersController.js');

//console.log('Current path = ' + currentPath);

//const usersController = require(currentPath);

const usersController = require('../controllers/usersController');

//Uso de multer para almacenamiento de imagenes 
/*
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
*/

//console.log('llegue hasta aqui');
//Variable que sirve como middleware para la carga con multer
//const uploadFile = multer({ storage: multerDiskStorage });


/** Chevo **/
router.get('/users/login', usersController.login);

router.post('/users/login', usersController.processLogin);

//router.get('/users/profile', usersController.showProfile);
/*
router.post('/users/login', [
        check('email').isEmail().withMessage('Email invalido'),
        check('password').isEmpty().withMessage('Contrasena vacia')
        ],usersController.processLogin);
*/

//router.get('/products/create', controllersAdminProdChevo.create);
//router.post('/products/savenew',  uploadFile.single("imagenProducto"), controllersAdminProdChevo.savenew);
//router.get('/products/:id', controllersAdminProdChevo.show);
//router.post('/products/create', controllersAdminProdChevo.save);
/** Mauricio **/
/* Ver los detalles de un producto especifico */
//router.get('/products/:id', productController.details);
/* Entrega el formulario de edicion de productos */
//router.get('/products/:id/edit', productController.getById);
/* Actualiza un producto especifico */
//router.put('/products/:id', uploadFile.single("imagenProducto"), productController.update);
/* Borra un producto especifico */
//router.delete('/products/:id', productController.delete);



module.exports = router;