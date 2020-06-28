const {DataTypes} = require('sequelize');
const sequelize = require('./index')

const AssociateBank = sequelize.define('associate_banks', {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    bank_code: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    private_key: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    public_key: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    secret_key: {
        type: DataTypes.TEXT,
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
    tableName: 'associate_banks'
});

module.exports = AssociateBank