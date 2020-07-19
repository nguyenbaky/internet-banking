const createError = require('http-errors')
const httpSttCode = require('http-status-codes')
const RecieverModel = require('../model/recievers')
const utilsService = require('./utils')

module.exports = {
    getFriends: async userID => {
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

    createFriend: async (userID, friendAccountNumber, name, bankCode) => {
        if (bankCode === 'BANK') {
            await utilsService.getUserByCondition({
                account_number: friendAccountNumber,
                bank_code: bankCode,
            }, 'Người dùng không tồn tại trên hệ thống')
        }

        await RecieverModel.findOne({
            where: {
                user_id: userID,
                reciever_account_number: friendAccountNumber,
            }
        }).then(f => {
            if (f !== null) {
                return
            }

            RecieverModel.create({
                user_id: userID,
                reciever_account_number: friendAccountNumber,
                reciever_name: name,
                bank_code: bankCode,
            })
        }).catch(err => {
            throw createError(httpSttCode.INTERNAL_SERVER_ERROR, err)
        })
    },

    deleteFriend: async (userID, friendAccountNumber) => {
        await RecieverModel.destroy({
            where: {
                friend_account_number: friendAccountNumber,
                user_id: userID,
            }
        }).catch(err => {
            throw createError(httpSttCode.INTERNAL_SERVER_ERROR, err)
        })
    }
}