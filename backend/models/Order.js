const { DataTypes } = require("sequelize");
const sequalize = require("../config/db");
const Table = require("./Table");
const Product = require("./Product");
const sequelize = require("../config/db");

const Order = sequelize.define(
  "Order",
  {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "pending",
    },
  },
  {
    timestamps: true,
  }
);
Order.belongsTo(Table, { foreignKey: "tableId", as: "table" });
Order.belongsTo(Product, { foreignKey: "productId", as: "product" });

module.exports = Order;
