const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Order = require('./Order');
const Table = require('./Table');

const Payment = sequelize.define('Payment', {
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    method: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'pending',
    },
}, {
    timestamps: true,
});

// İlişkilendirmeler
Payment.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });
Payment.belongsTo(Table, { foreignKey: 'tableId', as: 'table' });

module.exports = Payment;
