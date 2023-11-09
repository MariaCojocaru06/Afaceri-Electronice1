const sequelize = require('../sequelize.js');
const { DataTypes } = require('sequelize');

const Product=sequelize.define('product',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    denumire:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            len:[3,100],
        },
    },
    pret:{
        type:DataTypes.NUMBER,
        allowNull:false,

    },
    gramaj:{
        type:DataTypes.NUMBER,
        allowNull:false,
    },
    img:{
        type:DataTypes.STRING,
        
    },
   


})
module.exports=Product