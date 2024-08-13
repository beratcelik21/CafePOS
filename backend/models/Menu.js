const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Menu = sequelize.define(
  "Menu",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    // Diğer özellikler eklenebilir
  },
  {
    timestamps: true,
  }
);

// Menünün ürünlerle ilişkisi
Menu.hasMany(Product, { as: "products" });

module.exports = Menu;
