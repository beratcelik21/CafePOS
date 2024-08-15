const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Product = require('./Product');  // Product modelini dahil ediyoruz

const Menu = sequelize.define('Menu', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    timestamps: true,
});

// Menünün ürünlerle ilişkisi
Menu.hasMany(Product, { as: 'products' });

module.exports = Menu;
