const sequelize = require('../sequelize.js');
const { DataTypes, NOW } = require('sequelize');
const Order=sequelize.define('order',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    numar:{
        type:DataTypes.STRING,
       
        
    },
    total:{
        type:DataTypes.FLOAT,
        defaultValue:0

    },
    data:{
        type:DataTypes.DATE,
        values:NOW
        
    },
    finalizata:{
        type:DataTypes.BOOLEAN,
        defaultValue:0
        //mai avem campurile valoare si numar produse in functie de produsele adaugate in comanda
}}
)
module.exports=Order