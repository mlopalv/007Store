/*codigo para administración de productos*/ 
const express = require('express');
const router = express.Router();
const path = require('path');
const { check, validationResult, body } = require('express-validator');

const usersController = require('../controllers/usersController');

const validaciones = [
    body("nombre").notEmpty().withMessage("BV: The name field should not be empty."),
    body("nombre").isLength({min: 2}).withMessage("BV: The name field should have at least two characters."),
    
    body("apellido").notEmpty().withMessage("BV: The last name field should not be empty."),
    body("apellido").isLength({min: 2}).withMessage("BV: The last name field should have at least two characters."),
    
    body("usuario").notEmpty().withMessage("BV: The user name should not be emtpy."),
    
    body("email").notEmpty().withMessage("BV: The email address entered is not valid."),
    body("email").isEmail().withMessage("BV: The email address entered doesn't have a valid email structure."),
    
    body("pass1").notEmpty().withMessage("BV: Password number one is empty."),
    body("pass1").isLength({min: 8}).withMessage("BV: The password should have at least 8 characters."),
    body("pass2").notEmpty().withMessage("BV: Password number two is empty."),
    
    /** Validar que la contraseña coincide con la contraseña de control */
    body("pass1").custom ( (value, { req }) => {            
        return value === req.body.pass2;
     }
    ).withMessage("BV: The password and the control password are not the same.")   
];

const validacionesLogin  = [
    
    body("email").notEmpty().withMessage("BV: The email field should have a value."),
    body("email").isEmail().withMessage("BV: The email address entered doesn't have a valid email structure."),     
    
    body("password").notEmpty().withMessage("BV: The password field should have a value."),
    body("password").isLength({min: 8}).withMessage("BV: The password should have at least 8 characters.")       
    
];


router.get('/users/login', usersController.login);
router.post('/users/login', validacionesLogin, usersController.processLogin);
router.get('/users/register', usersController.register);
router.post('/users/processRegister', validaciones, usersController.processRegister);
router.get('/users/profile', usersController.getProfile);
router.get('/users/logout', usersController.logout);



module.exports = router;