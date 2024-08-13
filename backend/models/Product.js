const { DataTypes } = require("sequelize");
const sequalize = require("../config/db");

const Product = sequalize.define(
  "Product",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Product;
