const {DataTypes} = require('sequelize');
const sequelize = require('./index')

const Account = sequelize.define('accounts', {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    balance: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: '0'
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
    tableName: 'accounts'
});

module.exports = Account