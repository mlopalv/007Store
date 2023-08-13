const fs = require('fs');
const path =require('path');

function recordarMiddleware(req,res,next) {
    next();
    if (req.cookies.recordar != undefined && req.session.usuarioLogueado == undefined) {
        let usersJSON = fs.readFileSync(path.resolve(__dirname, '../database/usuarios.json'));
        let users;
        if(usersJSON==""){
            users=[]
        } else {
            users = JSON.parse(usersJSON);
        }

        let usuarioALoguearse;
        
        for (let i=0; i < users.length; i++){
            if(users[i].email==req.cookies.recordar){
                usuarioALoguearse = users[i];
                
                break;
            }
        } 
        
        req.session.usuarioLogueado = usuarioALoguearse;
        console.log('Si hay cookie, usuario:');
        console.log(JSON.stringify(usuarioALoguearse,null,4));
    } else {
        if (req.cookies.recordar != undefined) {
            console.log('Cookie = ' + req.cookies.recordar);
            
        } else {
            console.log('No hay cookie');
        }
        if (req.session.usuarioLogueado != undefined) {
            console.log(JSON.stringify(req.session.usuarioLogueado,null,4));
        } else {
            console.log('usuarioLogueado undefined');
        }
    }
}

module.exports = recordarMiddleware;