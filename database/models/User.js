module.exports = (sequelize, dataTypes) => {
    let alias = "User";
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,
        name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        last_name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        login_name: {
            type: dataTypes.STRING(20),
            allowNull: false
        }, 
        password: {
            type: dataTypes.STRING(100),
            allowNull: false
        },        
        email: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        image_path: {
            type: dataTypes.STRING(100),
            allowNull: true
        }, 
        profile_id: {
            type: dataTypes.INTEGER.UNSIGNED
        }        
    };
    let config = {
        timestamps: false       
    }
    
    const User = sequelize.define(alias, cols, config);
    
    User.associate = function (modelos) {        
        User.belongsTo(modelos.Profile, {
            as: "profile",            
            foreignKey: "profile_id"           
        });
    };

    return User;
};