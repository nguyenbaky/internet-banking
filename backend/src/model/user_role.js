const {DataTypes} = require('sequelize');
const sequelize = require('./index')

const UserRole = sequelize.define('user_roles', {
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
    },
    role_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
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
    tableName: 'user_roles'
});

module.exports = UserRole