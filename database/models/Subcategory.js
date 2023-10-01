module.exports = (sequelize, dataTypes) => {
    let alias = 'Subcategory';
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },       
        description: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        subcategory_id: {
            type: dataTypes.INTEGER.UNSIGNED
        }     
    };
    let config = {
        timestamps: false
        //createdAt: 'created_at',
        //updatedAt: 'updated_at',
        //deletedAt: false
    }
    
    const Subcategory = sequelize.define(alias, cols, config);
    
    Subcategory.associate = function (modelos) {
        
        Subcategory.belongsTo(modelos.Category, {
            as: "categoria",            
            foreignKey: "category_id"           
        });
        
        Subcategory.hasMany(modelos.Product, {
            as: "productos",            
            foreignKey: "subcategory_id"           
        });
    };

    return Subcategory;
};