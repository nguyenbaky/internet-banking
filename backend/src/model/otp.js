const {DataTypes} = require('sequelize');
const sequelize = require('./index')

const Otp = sequelize.define('otp', {
    email: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
    },
    otp:{
        type: DataTypes.BIGINT,
        allowNull: false,
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
    tableName: 'otp'
});

module.exports = Otp