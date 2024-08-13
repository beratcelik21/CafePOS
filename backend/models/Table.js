const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Table = sequelize.define(
  "Table",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "available",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Table;
