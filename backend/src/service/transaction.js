const sequelize = require('../model/index')
const createError = require('http-errors')
const httpSttCode = require('http-status-codes')
const UserModel = require('../model/users')
const TransactionModel = require('../model/transactions')
const config = require('../../config')
const recieverService = require('./reciever')
const utils = require('./utils')
const { checkRoleUser } = require('./user')
const consts = require('../consts/index')

const moveMoneyBank = async (transaction, sender, recipient, recipientCharge) => {
    if (sender.balance < transaction.amount) {
        console.log(`*********** moveMoneyBank *********** `)
        throw createError(httpSttCode.NOT_ACCEPTABLE, "Số dư không đủ")
    }

    await sequelize.transaction(t => UserModel.update({
        balance: sender.balance -  transaction.amount
    }, {
        transaction: t,
        where: {id: sender.id}
    }).then(_ => {
        const newBalance = recipient.balance + (recipientCharge ?
            transaction.amount :
            transaction.amount)
        console.log(newBalance, recipient.balance, transaction.amount, "")
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
        case 'BANK':
            await moveMoneyBank(transaction, sender, recipient, recipientCharge)
    }
}

const createMoney = async(transaction,recipient) => {
    const newBalance = transaction.amount + recipient.balance
    console.log(`transaction createMoney `,transaction)
    await sequelize.transaction(t =>  UserModel.update({
            balance: newBalance
        }, {
            transaction: t,
            where: {account_number: transaction.receiver_account_number}
        })
    )
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
            await recieverService.createReciever(sender.id,
                transaction.receiver_account_number, recipient.name,
                recipient.bank_code)
        }

        await moveMoney(transaction, sender, recipient, recipientCharge)
    },

    createMoney : async (transaction) => {
        const staff = await utils.getUserByCondition({
            account_number: transaction.staff_account_number,
        }, 'Không xác thực được thông tin nhân viên, vui lòng thử lại')
        console.log(`staff createMoney `,staff)
        await checkRoleUser(staff.id,consts.ROLE.STAFF)
        const recipient = await utils.getUserByCondition({
            account_number: transaction.receiver_account_number
        }, 'Người nhận không tồn tại')
        await createMoney(transaction,recipient)
    }
}