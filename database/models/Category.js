module.exports = (sequelize, dataTypes) => {
    let alias = 'Category';
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },       
        description: {
            type: dataTypes.STRING(100),
            allowNull: false
        }  
    };
    let config = {
        timestamps: false
        //createdAt: 'created_at',
        //updatedAt: 'updated_at',
        //deletedAt: false
    }
    
    const Category = sequelize.define(alias, cols, config);
    
    Category.associate = function (modelos) {
        
        Category.hasMany(modelos.Product, {
            as: "products",            
            foreignKey: "category_id"           
        });
    };

    return Category;
};