const {DataTypes} = require('sequelize');
const sequelize = require('./index')

const Role = sequelize.define('roles', {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    role: {
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
    tableName: 'roles',
});

module.exports = Role
