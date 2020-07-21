const createError = require('http-errors')
const httpSttCode = require('http-status-codes')
const RecieverModel = require('../model/recievers')
const utilsService = require('./utils')

module.exports = {
    getRecievers: async userID => {
        const recievers = await RecieverModel.findAll({
            where: {
                user_id: userID,
            }
        }).then(fs => {
            if (fs === null) {
                throw createError(httpSttCode.NO_CONTENT, '')
            }
            return fs
        }).catch(err => {
            throw createError(httpSttCode.INTERNAL_SERVER_ERROR, err)
        })

        return recievers.map(r => ({
            reciever_name: r.reciever_name,
            reciever_account_number: r.reciever_account_number,
            bank_code: r.bank_code,
        }))
    },

    createReciever: async (userID, recieverAccountNumber, name, bankCode) => {
        if (bankCode === 'BANK') {
            await utilsService.getUserByCondition({
                account_number: recieverAccountNumber,
                bank_code: bankCode,
            }, 'Người dùng không tồn tại trên hệ thống')
        }

        await RecieverModel.findOne({
            where: {
                user_id: userID,
                reciever_account_number: recieverAccountNumber,
            }
        }).then(f => {
            if (f !== null) {
                return
            }

            RecieverModel.create({
                user_id: userID,
                reciever_account_number: recieverAccountNumber,
                reciever_name: name,
                bank_code: bankCode,
            })
        }).catch(err => {
            throw createError(httpSttCode.INTERNAL_SERVER_ERROR, err)
        })
    },

    deleteReciever: async (userID, recieverAccountNumber) => {
        await RecieverModel.destroy({
            where: {
                reciever_account_number: recieverAccountNumber,
                user_id: userID,
            }
        }).catch(err => {
            throw createError(httpSttCode.INTERNAL_SERVER_ERROR, err)
        })
    }
}