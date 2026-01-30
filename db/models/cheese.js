const { DataTypes } = require('sequelize');
const sequelize = require('../connection.js');

const Cheese = sequelize.define('Cheese', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    origin: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    category: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

module.exports = Cheese;
