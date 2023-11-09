const sequelize = require('../sequelize.js');
const { DataTypes } = require('sequelize');

const Users = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    telefon: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    parola: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nume: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3, 100],
        }
    },
    prenume: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3, 100],
        },

    }
   
})
module.exports = Users