const express = require('express')
const accountService = require('../service/account')
const httpSttCode = require('http-status-codes')

const router = express.Router()

router.get('/', async (req, res) => {
    const accounts = await accountService.getAccount(req.userID)
    res.status(httpSttCode.OK)
        .json({
            message: 'success',
            data: {
                ...accounts
            }
        })
})

router.post('/', async (req, res) => {
    const savingAccount = req.body
    await accountService.createSavingAccount(req.userID, savingAccount.name, savingAccount.balance)
    res.status(httpSttCode.CREATED)
        .json({
            message: `Tạo tài khoản ${savingAccount.name}, tài khoản thanh toán giảm: ${savingAccount.balance}`
        })
})

module.exports = router