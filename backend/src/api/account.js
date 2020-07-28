const express = require('express')
const accountService = require('../service/account')
const httpSttCode = require('http-status-codes')
const validator = require('../validator/user')

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

router.put('/change-password',validator.postChangePassword(),async(req,res) => {
    const err = validationResult(req)
    if (!err.isEmpty()) {
        throw createError(httpSttCode.BAD_REQUEST, err.array()[0].msg)
    }
    await accountService.changePassword(req,userID,req.body)
    .then(err => {
        if(err) res.status.httpSttCode.BAD_REQUEST(err)
        else req.status(httpSttCode.OK)('change password success')
    })
})

module.exports = router