const sequelize = require('../model/index')
const createError = require('http-errors')
const httpSttCode = require('http-status-codes')
const UserModel = require('../model/users')
const TransactionModel = require('../model/transactions')
const config = require('../../config')
const recieverService = require('./reciever')
const utils = require('./utils')

const moveMoneyFee = amount => config.MOVE_MONEY_FEE * amount / 100

const minSenderBalance = (recipientCharge, amount) => {
    if (recipientCharge) {
        return amount
    }

    return amount + moveMoneyFee(amount)
}

const moveMoneyYSBBank = async (transaction, sender, recipient, recipientCharge) => {
    if (sender.balance < minSenderBalance()) {
        throw createError(httpSttCode.NOT_ACCEPTABLE, "Số dư không đủ")
    }

    await sequelize.transaction(t => UserModel.update({
        balance: sender.balance - minSenderBalance(recipientCharge, transaction.amount)
    }, {
        transaction: t,
        where: {id: sender.id}
    }).then(_ => {
        const newBalance = recipient.balance + (recipientCharge ?
            transaction.amount - moveMoneyFee(transaction.amount) :
            transaction.amount)
        console.log(newBalance, recipient.balance, transaction.amount, "hihi")
        return UserModel.update({
            balance: newBalance
        }, {
            transaction: t,
            where: {account_number: transaction.receiver_account_number}
        }).then(_ => TransactionModel.create(transaction, {transaction: t}))
    })).catch(err => {
        throw createError(httpSttCode.INTERNAL_SERVER_ERROR, err)
    })
}

const moveMoney = async (transaction, sender, recipient, recipientCharge) => {

    switch (transaction.receiver_bank_code) {
        case 'YSB':
            await moveMoneyYSBBank(transaction, sender, recipient, recipientCharge)
    }
}

module.exports = {
    moveMoney: async (transaction, recipientCharge, saveRecipient) => {
        const sender = await utils.getUserByCondition({
            account_number: transaction.sender_account_number,
        }, 'Không xác thực được thông tin người gửi, vui lòng thử lại')

        const recipient = await utils.getUserByCondition({
            account_number: transaction.receiver_account_number
        }, 'Người nhận không tồn tại')

        if (saveRecipient) {
            await recieverService.createFriend(sender.id,
                transaction.receiver_account_number, recipient.name,
                recipient.bank_code)
        }

        await moveMoney(transaction, sender, recipient, recipientCharge)
    }
}