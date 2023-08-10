const express = require('express');
const fs = require('fs');
const { validationResult } = require('express-validator');
const path = require('path');
//const { encode } = require('punycode');

const usersController = {
    login: function(req,res) {
        return res.render('login');
    },
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
                    /*
                    if(bcrypt.compareSync(req.body.password,users[i].password)){

                    }
                    */
                    usuarioALoguearse = users[i];
                    break;
                }
            }

            if(usuarioALoguearse == undefined){
                return res.render('login', {errors:[
                    {msg: 'Usuario o contrasena invalidos'}
                ]})
            }

            req.session.usuarioLogueado = usuarioALoguearse;

            res.redirect('/users/profile');


        } else {
            return res.render('login', {errors: errors.errors});
        }


    }
};

module.exports = usersController;