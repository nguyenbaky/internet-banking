const userService = require('../service/user')
const express = require('express')
const transactionService = require('../service/transaction')
const httpSttCode = require('http-status-codes')
const utilsService = require('../service/utils')
const { response } = require('express')
const createError = require('http-errors')

const router = express.Router()

router.post('/', async (req, res) => {
    console.log(` ******* backend post transaction ... `)
    const transaction = req.body.transaction
    const sender = await utilsService.getUserByCondition({
        id: req.userID
    }, "Người dùng không thể xác minh, vui lòng thử lại", httpSttCode.UNAUTHORIZED)
    console.log(`********* transaction/ sender `,sender.balance)
    console.log(`********* transaction/ amount `,transaction.amount)
    transaction.sender_account_number = sender.account_number
    transaction.sender_bank_code = sender.bank_code
    console.log(`********* transaction/ transaction `,transaction)
    await transactionService.moveMoney(transaction, req.body.recipient_charge,
        req.body.save_recipient).then((response) => {
            console.log(`******* transaction success *****`,response)
            res.status(httpSttCode.CREATED)
            .json('Giao dịch thành công')
        }).catch(e =>{
            console.log(`********** error transaction ***** `,e)
            res.status(e.status)
        })
    
})

router.post('/createmoney',async(req,res) => {
    const {transaction} = req.body
    const staff = await utilsService.getUserByCondition({
        id: req.userID
    }, "Người dùng không thể xác minh, vui lòng thử lại", httpSttCode.UNAUTHORIZED)

    if(staff.account_number !== transaction.staff_account_number)
        throw createError(httpSttCode.UNAUTHORIZED,"Nhân viên không thể xác minh, vui lòng thử lại")
    await transactionService.createMoney(transaction)
        .then(response => {
            console.log(`******* Thêm tài khoản thành công ****** `,response)
            res.status(httpSttCode.OK)
            .json('Thêm tài khoản thành công')
        })
        .catch(e => {
            console.log(`********** error thêm tài khoản ***** `,e)
            res.status(e.status)
        })
})

module.exports = router