const {DataTypes} = require('sequelize');
const sequelize = require('./index')

const Transaction = sequelize.define('transactions', {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    receiver_account_number: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    receiver_name: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    receiver_bank_code: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: 'YSB'
    },
    sender_account_number: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    sender_name: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    sender_bank_code: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: 'YSB'
    },
    message: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    create_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    update_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    delete_at: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'transactions'
});

module.exports = Transaction