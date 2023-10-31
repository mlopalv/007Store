const fs = require('fs');
const path =require('path');

function asignarSessionAVistas(req, res, next) {
    console.log("Middleware usuario para llevar al template la info de session ..." + req.session.usuarioLogueado);
    if (req.session.usuarioLogueado) {
        res.locals.user = req.session.usuarioLogueado;
    }else{
        res.locals.user = null;
    }
    next();
  }
  
module.exports = asignarSessionAVistas;

