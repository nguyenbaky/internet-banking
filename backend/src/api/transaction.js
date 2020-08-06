const express = require('express')
const transactionService = require('../service/transaction')
const httpSttCode = require('http-status-codes')
const utilsService = require('../service/utils')
const { response } = require('express')

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

module.exports = router