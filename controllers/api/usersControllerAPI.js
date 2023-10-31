let db = require("../../database/models");


const usersControllerAPI = {
    
    list: (req, res) => {
        console.log("Users controller list ...");        

        db.User.findAll()
            .then(usuarios => {
                
                let meta = {
                    status: 200,
                    count: usuarios.length,
                    url: "api/users"
                };

                let data = usuarios.map( (usuario, index) => {
                     let user = {
                        id: usuario.id,
                        name: usuario.name,
                        email: usuario.email,                        
                        detail: "api/users/:"+usuario.id
                    }   
                    return user;                    
                });
                //console.log(peliculas);
                res.json({ meta, data});
            });
    },
    
    detail: (req, res) => {
        console.log("Users controller details ...");

        db.User.findByPk(req.params.id)
            .then(usuario => {

                let meta = {
                    status: 200,
                    total: 1,
                    url: "api/users/:id"
                };

                let data = {
                    id: usuario.id,
                    name: usuario.name,
                    lasName: usuario.last_name,
                    loginName: usuario.login_name,
                    email: usuario.email,
                    imagePath: usuario.image_path                    
                };               
                
                res.json({ meta, data});                
            });
    }

}

module.exports = usersControllerAPI;