const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const bcrypt = require('bcrypt');

// Kullanıcı modeli tanımı
const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('waiter', 'cashier', 'kitchen', 'admin'),
        allowNull: false,
    },
}, {
    timestamps: true,
    hooks: {
        beforeCreate: async (user) => {
            // Kullanıcı oluşturulmadan önce şifreyi hash'leyin
            if (user.password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        },
        beforeUpdate: async (user) => {
            // Şifre güncellenirse hash'leyin
            if (user.password && user.changed('password')) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        }
    },
});

// Kullanıcı şifresini doğrulamak için bir örnek yöntemi
User.prototype.validatePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = User;
