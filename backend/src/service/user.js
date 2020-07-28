const UserModel = require('../model/users')
const httpSttCode = require('http-status-codes')
const createError = require('http-errors')
const sequelize = require('../model/index')
const UserRoles = require('../model/user_roles')
const crypto = require('../utils/crypto')
const generator = require('../utils/generator')
const consts = require('../consts/index')



module.exports = {
    createUser: async (user, roles) => {
        // hash password
        user.password = crypto.encryptSHA3(user.password)
        user.account_number = generator.uid()
        user.bank_code = consts.BANK_CODE

        // create user with transaction
        await sequelize.transaction(t => {
            return UserModel.create(user, {transaction: t})
                .then(u => {
                    let promises = []
                    roles.forEach(role => promises.push(
                        UserRoles.create({
                            user_id: u.id,
                            role_id: role.id,
                        }, {transaction: t})
                    ))
                    return Promise.all(promises)
                })
        }).catch(err => {
            throw createError(httpSttCode.INTERNAL_SERVER_ERROR, err.toString())
        })

        delete user.password
        return user
    },

    checkRoleUser: async (userID, roles) => {
        await UserModel.findOne({where: {id: userID}})
            .then(u => {
                if (u === null) {
                    throw createError(httpSttCode.NOT_FOUND, 'user not exists')
                }
            })
            .catch(err => {
                throw createError(httpSttCode.INTERNAL_SERVER_ERROR, err)
            })

        const userRoles = await UserRoles.findAll({where: {user_id: userID}})
            .catch(err => {
                throw createError(httpSttCode.INTERNAL_SERVER_ERROR, err)
            })

        roles.forEach(r => {
            const found = userRoles.find(ur => ur.role_id === r)
            if (!found) {
                throw createError(httpSttCode.NOT_ACCEPTABLE, "access denied")
            }
        })
    },
}