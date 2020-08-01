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

router.get(`/:accountNumberParam/info`, async (req, res) => {
    console.log(`accountNumber accountNumberParam: `,req.params)
    const accountNumber = req.params.accountNumberParam
    
    const accountInfo = await accountService.getAccountInfo(req.userID, accountNumber).catch(err => {console.log(`accountNumberParam err: `,err)})
    console.log(`get account info after *************************`)
    res.status(httpSttCode.OK)
        .json({
            message: 'Lấy thông tin tài khoản thành công',
            data: {
                ...accountInfo
            }
        })
})

router.delete('/saving/:savingAccountID', async (req, res) => {
    const userID = req.userID
    const savingAccountID = req.params.savingAccountID
    await accountService.deleteSavingAccount(savingAccountID, userID)
    res.status(httpSttCode.OK)
        .json({
            message: 'Xóa tài khoản tiết kiệm thành công, số tiền trong tài khoản này đã được chuyển vào tài khoản thanh toán',
        })
})

router.put('/saving/:savingAccountID', async (req, res) => {
    const savingAccountID = req.params.savingAccountID
    const userID = req.userID
    const data = req.body
    await accountService.updateSavingAccount(data.name, data.delta_balance,
        userID, savingAccountID)
    res.status(httpSttCode.OK)
        .json({
            message: 'Cập nhật thông tin ví thành công'
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