/*codigo para administración de productos*/ 
const express = require('express');
const router = express.Router();
const path = require('path');
const { check, validationResult, body } = require('express-validator');

const usersController = require('../controllers/usersController');

const validaciones = [
    body("nombre").notEmpty().withMessage("BV: El nombre no puede estar vacío."),
    body("nombre").isLength({min: 2}).withMessage("BV: El nombre debe tener mínimo dos caracteres."),
    
    body("apellido").notEmpty().withMessage("BV: El apellido no puede estar vacío"),
    body("apellido").isLength({min: 2}).withMessage("BV: El apellido debe tener mínimo dos caracteres."),
    
    body("usuario").notEmpty().withMessage("BV: El nombre de usuario no puede estar vacío"),
    
    body("email").notEmpty().withMessage("BV: El valor ingresado de email es inválido."),
    body("email").isEmail().withMessage("BV: El email ingresado no tiene una estructura correcta."),
    
    body("pass1").notEmpty().withMessage("BV: Contraseña 1 vacía"),
    body("pass1").isLength({min: 8}).withMessage("BV: La contraseña debe tener como mínimo 8 caracteres."),
    body("pass2").notEmpty().withMessage("BV: Contraseña 2 vacía"),
    
    /** Validar que la contraseña coincide con la contraseña de control */
    body("pass1").custom ( (value, { req }) => {            
        return value === req.body.pass2;
     }
    ).withMessage("BV: La contraseña ingresada y la contraseña de control no coinciden.")   
];

const validacionesLogin  = [
    
    body("email").notEmpty().withMessage("BV: El campo de email debe tener un valor."),
    body("email").isEmail().withMessage("BV: El email ingresado no tiene una estructura correcta."),     
    
    body("password").notEmpty().withMessage("BV: El campo contraseña debe tener un valor. "),
    body("password").isLength({min: 8}).withMessage("BV: La contraseña debe tener como mínimo 8 caracteres.")       
    
];


router.get('/users/login', usersController.login);
router.post('/users/login', validacionesLogin, usersController.processLogin);
router.get('/users/register', usersController.register);
router.post('/users/processRegister', validaciones, usersController.processRegister);
router.get('/users/profile', usersController.getProfile);
router.get('/users/logout', usersController.logout);



module.exports = router;