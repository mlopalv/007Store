const express = require('express');
const fs = require('fs');
const { validationResult } = require('express-validator');
const path = require('path');
let bcrypt = require("bcryptjs");


const usersController = {
    //seccion para registrar nuevos usuarios - mostrar la vista
    register: function(req,res) {
        return res.render('register');
    },
    //seccion para registrar nuevos usuarios - procesar el registro cuando dan click a REGISTRAR
    processRegister: function(req,res) {
        let errors = validationResult(req);

        //console.log(JSON.stringify(errors,null,4) );
              
 
        let usuarioARegistrar = {
            id:0,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            usuario: req.body.usuario,
            email: req.body.email,
            nacimiento: req.body.nacimiento,
            domicilio: req.body.domicilio,
            pais: req.body.pais,           
            categoria: "general"
        };

        //console.log('To String = ' + JSON.stringify(req.body.pais));

        if (errors.isEmpty()){
            console.log('NO hay errores');
            
            let usersJSON = fs.readFileSync(path.resolve(__dirname, '../database/usuarios.json'));
            let users;
            if(usersJSON==""){
                users=[]
            } else {
                users = JSON.parse(usersJSON);
            }



            let arrayOfIds = [];
            let usuarioExistente = false;

            for (let i=0; i < users.length; i++){
                
                arrayOfIds.push(users[i].id);
                if(users[i].email==req.body.email){                    
                    usuarioExistente =true;
                    break;
                }
            }

          
            if(usuarioExistente == true){
                console.log('Usuario ya existe en bd');
                return res.render('register', {errors:[
                    {msg: 'Este correo ya esta registrado'}
                ], oldData: usuarioARegistrar})
            } else {
                console.log('Usuario inexistente');
            }

            let maxID = Math.max(...arrayOfIds);
            //let maxID = Math.max(users.id);

            //console.log('Maximo ID de usuarios = ' + maxID);
    
            usuarioARegistrar.id = maxID + 1;

            /*Se cifran las contraseñas usando la librerìa bcryptjs*/
            let passOriginal = bcrypt.hashSync(req.body.pass1, 10);
            let passControl = bcrypt.hashSync(req.body.pass2, 10);
            usuarioARegistrar.password1 = passOriginal;
            usuarioARegistrar.password2 = passControl;

            users.push(usuarioARegistrar);
            users = JSON.stringify(users,null,4);

            //No estoy seguro si ya desde aqui hay que asignarle sesion al nuevo usuario
            req.session.usuarioLogueado = usuarioARegistrar;

            usuarioARegistrar = JSON.stringify(usuarioARegistrar,null,4);

            //console.log('Nuevo usuario = ' + usuarioARegistrar);
            
            fs.writeFileSync(path.resolve(__dirname, '../database/usuarios.json'),users);

            res.redirect('/users/profile');


        } else {
            console.log('Hay errores al registrar nuevo usuario');
            console.log(JSON.stringify(errors,null,4));
            console.log(JSON.stringify(usuarioARegistrar,null,4));
            return res.render('register', {errors: errors.errors, oldData: usuarioARegistrar});
        }
    },    

    //seccion para hacer login - mostrar la vista
    login: function(req,res) {
        return res.render('login');
    },
    //seccion para hacer login - cuando el usuario da click en LOGIN
    processLogin: function(req,res) {
        let errors = validationResult(req);
        
        if (errors.isEmpty()){
            let usersJSON = fs.readFileSync(path.resolve(__dirname, '../database/usuarios.json'));
            let users;
            if(usersJSON==""){
                users=[]
            } else {
                users = JSON.parse(usersJSON);
            }

            let usuarioALoguearse;
            
            for (let i=0; i < users.length; i++){
                if(users[i].email==req.body.email){
                    /* Comparamos la contraseña ingresada con la contraseña almacenada */
                    if(bcrypt.compareSync(req.body.password, users[i].password1)){
                        console.log("Contraseña válida.");
                        usuarioALoguearse = users[i];
                        break;
                    }else{
                        console.log("Contraseña inválida.");
                    }                    
                    
                }
            }

            if(usuarioALoguearse == undefined){
                return res.render('login', { errors:[
                    {msg: 'Usuario o contrasena inválidos'}
                ]})
            }

            req.session.usuarioLogueado = usuarioALoguearse;

            res.redirect('/users/profile');

        } else {
            return res.render('login', {errors: errors.errors});
        }


    },

    getProfile: function(req,res) {
        res.render('profile',{userData: req.session.usuarioLogueado})
    },

    logout: function(req,res) {
        req.session.destroy(function (err) {
          res.redirect('/'); //Inside a callback… bulletproof!
         }
    )}
};

module.exports = usersController;