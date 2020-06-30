const Sequelize = require('sequelize')
const config = require('../../config')

const sequelize = new Sequelize.Sequelize(config.DATABASE.URL, {
    define: {
        paranoid: true,
        createdAt: 'create_at',
        updatedAt: 'update_at',
        deletedAt: 'delete_at',
    }
})
sequelize
    .authenticate()
    .then(_ => {
        console.log('connection has been established successfully')
    })
    .catch(err => {
        console.error('unable to connect to the database, err: ', err)
        process.exit(1)
    })

module.exports = sequelize
