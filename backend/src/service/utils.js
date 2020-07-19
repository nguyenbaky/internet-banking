const UserModel = require('../model/users')
const createError = require('http-errors')
const httpSttCode = require('http-status-codes')

module.exports = {
    getUserByCondition: async (condition, errorMessage, statusCode = httpSttCode.BAD_REQUEST) => {
        return await UserModel.findOne({
            where: condition
        }).then(u => {
            if (u === null) {
                throw createError(statusCode, errorMessage)
            }
            return u
        }).catch(err => {
            throw createError(httpSttCode.INTERNAL_SERVER_ERROR, err)
        })
    }
}