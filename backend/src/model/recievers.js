const {DataTypes} = require('sequelize');
const sequelize = require('./index')

const Receiver = sequelize.define('receivers', {
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
    },
    receiver_account_number: {
        type: DataTypes.STRING(255),
        allowNull: false,
        primaryKey: true
    },
    receiver_name: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    bank_code: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: 'BANK'
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
    tableName: 'receivers'
});

module.exports = Receiver