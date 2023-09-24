module.exports = (sequelize, dataTypes) => {
    let alias = 'Product';
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
        description: {
            type: dataTypes.STRING(1024),
            allowNull: false
        },        
        image_path: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        price: {
            type: dataTypes.DECIMAL(10, 0),
            allowNull: false
        },
        category_id: {
            type: dataTypes.INTEGER.UNSIGNED            
            
        }        
    };
    let config = {
        timestamps: false
        //createdAt: 'created_at',
        //updatedAt: 'updated_at',
        //deletedAt: false
    }
    
    const Product = sequelize.define(alias, cols, config);
    
    Product.associate = function (modelos) {
        
        Product.belongsTo(modelos.Category, {
            as: "category",            
            foreignKey: "category_id"           
        });
    };

    return Product;
};