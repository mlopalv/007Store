module.exports = (sequelize, dataTypes) => {
    let alias = "Profile";
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },       
        description: {
            type: dataTypes.STRING(45),
            allowNull: false
        }  
    };
    let config = {
        timestamps: false        
    }
    
    const Profile = sequelize.define(alias, cols, config);
    
    Profile.associate = function (modelos) {
        
        Profile.hasMany(modelos.User, {
            as: "users",            
            foreignKey: "profile_id"           
        });
    };

    return Profile;
};