/*codigo para administración de productos*/ 
const express = require('express');
const router = express.Router();
const path = require('path');
const { check, validationResult, body } = require('express-validator');

const usersController = require('../controllers/usersController');

const validaciones = [
    body('nombre').notEmpty().withMessage('El nombre no puede estar vacio'),
    body('apellido').notEmpty().withMessage('El apellido no puede estar vacio'),
    body('usuario').notEmpty().withMessage('El nombre de usuario no puede estar vacio'),
    body('email').isEmail().withMessage('Email invalido'),
    body('nacimiento').notEmpty().withMessage('No hay fecha de cacimiento seleccionada'),
    //body('nacimiento').isDate().withMessage('Fecha equivocada'),
    body('domicilio').notEmpty().withMessage('La direccion no puede estar vacia'),  
    body('pais').notEmpty().withMessage('No hay pais seleccionado'),      
    body('pais').not().isIn(['Seleccionar pais','']).withMessage('No hay pais seleccionado'),
    
    body('pass1').notEmpty().withMessage('Contrasena 1 vacia'),
    body('pass2').notEmpty().withMessage('Contrasena 2 vacia')
];

/** Chevo **/
router.get('/users/login', usersController.login);

router.post('/users/login', usersController.processLogin);

router.get('/users/register', usersController.register);

router.post('/users/processRegister', validaciones, usersController.processRegister);

router.get('/users/profile', usersController.getProfile);

router.get('/users/logout', usersController.logout);

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