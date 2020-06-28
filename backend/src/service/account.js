const AccountModel = require('../model/accounts')
const UserModel = require('../model/users')
const createError = require('http-errors')
const httpSttCode = require('http-status-codes')


module.exports = {
    getAccount: async (userID) => {
        const user = await UserModel.findOne({where: {id: userID}})
            .then(u => {
                if (u === null) {
                    throw createError(httpSttCode.NOT_FOUND, 'user not exists')
                }
                return u
            })
            .catch(err => {
                throw createError(httpSttCode.INTERNAL_SERVER_ERROR, err)
            })

        const accounts = await AccountModel.findAll({where: {user_id: userID}})
            .catch(err => {
                throw createError(httpSttCode.INTERNAL_SERVER_ERROR, err)
            })

        let result = {
            account_number: user.account_number,
            balance: user.balance,
        }
        if (accounts.length > 0) {
            result.saving_account = []
            accounts.forEach(ac => {
                result.saving_account.push({
                    name: ac.name,
                    balance: ac.balance
                })
            })
        }

        return result
    },

    createSavingAccount: async (user_id, name, balance) => {
        await UserModel.findOne({where: {id: user_id}})
            .then(u => {
                if (u === null) {
                    throw createError(httpSttCode.BAD_REQUEST, 'user not found')
                }
            })
            .catch(err => {
                throw createError(httpSttCode.INTERNAL_SERVER_ERROR, err)
            })

        await AccountModel.create({name: name, balance: balance, user_id: user_id})
            .catch(err => {
                throw createError(httpSttCode.INTERNAL_SERVER_ERROR, err)
            })
    }
}