const AccountModel = require('../model/accounts')
const UserModel = require('../model/users')
const RecieverModel = require('../model/recievers')
const createError = require('http-errors')
const httpSttCode = require('http-status-codes')
const sequelize = require('../model/index')
const utilsService = require('./utils')

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
                    id: ac.id,
                    name: ac.name,
                    balance: ac.balance
                })
            })
        }

        return result
    },

    getAccountInfo: async (userID, accountNumber) => {
        let result = null
        await RecieverModel.findOne({
            where: {
                user_id: userID,
                reciever_account_number: accountNumber,
            }
        }).then(reciever => {
            if (reciever == null) {
                return
            }

            result = {
                name: reciever.reciever_name,
                bank_code: reciever.bank_code,
            }
        }).catch(err => {
            throw createError(httpSttCode.INTERNAL_SERVER_ERROR, err)
        })

        if (result === null) {
            const user = await utilsService.getUserByCondition(
                {account_number: accountNumber},
                'Không tìm thấy thông tin tài khoản'
            )

            result = {
                name: user.name,
                bank_code: user.bank_code,
            }
        }

        return result
    },

    createSavingAccount: async (user_id, name, balance) => {
        if (balance < 0) {
            throw createError(httpSttCode.BAD_REQUEST,
                'Số dư phải lớn hơn hoặc bằng 0')
        }
        const user = await UserModel.findOne({where: {id: user_id}})
            .then(u => {
                if (u === null) {
                    throw createError(httpSttCode.BAD_REQUEST, 'user not found')
                }
                return u
            })
            .catch(err => {
                throw createError(httpSttCode.INTERNAL_SERVER_ERROR, err)
            })

        // check balance
        if (user.balance < balance) {
            throw createError(httpSttCode.BAD_REQUEST, 'Số dư không đủ')
        }

        await sequelize.transaction(t => {
            return AccountModel.create({
                name: name,
                balance: balance,
                user_id: user_id
            }, {transaction: t})
                .then(_ => {
                    const newBalance = user.balance - balance
                    return UserModel.update({
                        balance: newBalance
                    }, {
                        where: {id: user.id},
                        transaction: t,
                    })
                })
        }).catch(err => {
            throw createError(httpSttCode.INTERNAL_SERVER_ERROR, err)
        })
    },

    deleteSavingAccount: async (id, userID) => {
        const savingAccount = await AccountModel.findOne({
            where: {
                user_id: userID,
                id: id,
            }
        }).then(ac => {
            if (ac === null) {
                throw createError(httpSttCode.BAD_REQUEST, 'Tài khoản không tồn tại')
            }
            return ac
        }).catch(err => {
            throw createError(httpSttCode.INTERNAL_SERVER_ERROR, err)
        })

        const user = await UserModel.findOne({where: {id: userID}})
            .then(u => {
                if (u === null) {
                    throw createError(httpSttCode.BAD_REQUEST, 'user not found')
                }
                return u
            })
            .catch(err => {
                throw createError(httpSttCode.INTERNAL_SERVER_ERROR, err)
            })

        await sequelize.transaction(t => {
            const newBalance = user.balance + savingAccount.balance
            return UserModel.update({balance: newBalance}, {
                transaction: t,
                where: {
                    id: userID,
                }
            }).then(_ => {
                return AccountModel.destroy({
                    where: {id: id},
                    transaction: t,
                })
            })
        }).catch(err => {
            throw createError(httpSttCode.INTERNAL_SERVER_ERROR, err)
        })
    },

    updateSavingAccount: async (name, deltaSavingBalance, userID, id) => {
        const savingAccount = await AccountModel.findOne({
            where: {
                user_id: userID,
                id: id,
            }
        }).then(ac => {
            if (ac === null) {
                throw createError(httpSttCode.BAD_REQUEST, 'Tài khoản không tồn tại')
            }
            return ac
        }).catch(err => {
            throw createError(httpSttCode.INTERNAL_SERVER_ERROR, err)
        })
        if (deltaSavingBalance < 0) {
            if (-deltaSavingBalance > savingAccount.balance) {
                throw createError(httpSttCode.BAD_REQUEST, 'Số dư không đủ')
            }
        }

        const user = await UserModel.findOne({where: {id: userID}})
            .then(u => {
                if (u === null) {
                    throw createError(httpSttCode.BAD_REQUEST, 'user not found')
                }
                return u
            })
            .catch(err => {
                throw createError(httpSttCode.INTERNAL_SERVER_ERROR, err)
            })

        if (deltaSavingBalance > user.balance) {
            throw createError(httpSttCode.BAD_REQUEST, 'Số dư không đủ')
        }

        await sequelize.transaction(t => {
            const newBalance = user.balance - deltaSavingBalance
            return UserModel.update({balance: newBalance}, {
                transaction: t,
                where: {
                    id: userID,
                }
            }).then(_ => {
                const newSavingBalance = savingAccount.balance + deltaSavingBalance
                return AccountModel.update({
                    name: name,
                    balance: newSavingBalance,
                }, {
                    where: {id: id},
                    transaction: t,
                })
            })
        }).catch(err => {
            throw createError(httpSttCode.INTERNAL_SERVER_ERROR, err)
        })
    },
}