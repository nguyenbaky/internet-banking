  
const express = require('express')
const recieverService = require('../service/reciever')
const httpSttCode = require('http-status-codes')

const router = express.Router()

const accountNumberParam = 'accountNumber'

router.post('/', async (req, res) => {
    const reciever = req.body
    await recieverService.createReciever(req.userID, reciever.reciever_account_number,
        reciever.reciever_name, reciever.bank_code)
    res.status(httpSttCode.CREATED)
        .json({
            message: 'Tạo gợi nhớ thành công'
        })
})

router.get('/', async (req, res) => {
    const recievers = await recieverService.getRecievers(req.userID)
    res.status(httpSttCode.OK)
        .json({
            message: 'Lấy thông tin thành công',
            data: recievers
        })
})

router.delete(`/:${accountNumberParam}`, async (req, res) => {
    const accountNumber = req.params[accountNumberParam]
    await recieverService.deleteReciever(req.userID, accountNumber)

    res.status(httpSttCode.OK)
        .json({
            message: 'Xóa gợi nhớ thành công',
        })
})

module.exports = router