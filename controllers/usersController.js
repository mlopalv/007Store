const fs = require('fs');
let db = require("../database/models");
const { validationResult } = require('express-validator');
const path = require('path');
let bcrypt = require("bcryptjs");


const usersController = {
    //seccion para registrar nuevos usuarios - mostrar la vista
    register: function (req, res) {
        //Verificar si tiene sesión iniciada
        if(req.session.usuarioLogueado){
            return res.render("profile", { userData: req.session.usuarioLogueado })
        }else{
            return res.render('register');
        }
       
    },
    //seccion para registrar nuevos usuarios - procesar el registro cuando dan click a REGISTRAR
    processRegister: function (req, res) {
        let errors = validationResult(req);

        let usuarioARegistrar = {
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

        if (errors.isEmpty()) {
            console.log("No hay errores ...");
            /*Se cifran las contraseñas usando la librerìa bcryptjs*/

            let passOriginal = bcrypt.hashSync(req.body.pass1, 10);
            let passControl = bcrypt.hashSync(req.body.pass2, 10);
            usuarioARegistrar.password1 = passOriginal;
            usuarioARegistrar.password2 = passControl;

            db.User.create({
                name: req.body.nombre,
                last_name: req.body.apellido,
                login_name: req.body.usuario,
                password: passOriginal,
                email: req.body.email,
                profile_id: 2

            }).then(user => {
                console.log("Usuario agregado correctamente: " + user.name);
                return user;
            }).then(user => {
                console.log("Direccionando hacia perfil de usuario ..." + user.id + " " + user.name);
                res.render("profile", { userData: user });
            });           

        } else {
            console.log("Existen errores en el registro del nuevo usuario.");
            console.log(JSON.stringify(errors, null, 4));
            console.log(JSON.stringify(usuarioARegistrar, null, 4));
            return res.render('register', { errors: errors.errors, oldData: usuarioARegistrar });
        }
    },

    //seccion para hacer login - mostrar la vista
    login: function (req, res) {
        //Verificar si tiene sesión iniciada
        if(req.session.usuarioLogueado){
            return res.render("profile", { userData: req.session.usuarioLogueado })
        }else{
            return res.render("login");
        }
       
    },
    //seccion para hacer login - cuando el usuario da click en LOGIN
    processLogin: function (req, res) {
        let errors = validationResult(req);

        if (errors.isEmpty()) {

            //Confirmar si el usuario existe en el registro de la base de datos
            db.User.findOne({
                where: {
                    email: req.body.email
                }
            })
                .then(user => {
                    if (user != "undefined" && user != null) {
                        console.log("El usuario se encuentra en la base de datos. Revisando contrasena " + user);
                        console.log("Validando contrasena.");
                        //Validar la contrasena ingresada                    
                        if (bcrypt.compareSync(req.body.password, user.password)) {
                            console.log("Contraseña válida.");
                           
                            req.session.usuarioLogueado = user;

                            if (req.body.recordar != undefined) {
                                res.cookie("recordar", user.email, { maxAge: 600000 })
                            } else {
                                console.log("El usuario no quiere ser recordado.");
                            }
                            console.log("Redireccionando nuevamente a profile ...");
                            res.redirect("/users/profile");

                        } else {
                            console.log("Contraseña inválida.");
                            return res.render("login", {
                                errors: [
                                    { msg: "Usuario o contraseña inválidos." }
                                ]
                            })
                        }

                    } else {
                        console.log("El usuario no se encuentra en la base de datos. Desplegando login nuevamente. " + user);

                        return res.render('login', {
                            errors: [
                                { msg: "Usuario o contraseña inválidos." }
                            ]
                        })
                    }
                });
        }
    },

    getProfile: function (req, res) {
        console.log("Redireccionando al perfil del usuario logueado " + req.session.usuarioLogueado.email );
        res.render("profile", { userData: req.session.usuarioLogueado })
    },

    logout: function (req, res) {
        res.clearCookie("recordar");
        //req.session.destroy();
        delete req.session.usuarioLogueado;
        return res.redirect('/');        
    }
};

module.exports = usersController;