const express = require('express')
const httpSttCode = require('http-status-codes')
const associateBankService = require("../service/associate_bank")
const createError = require('http-errors')
const validator = require('../validator/associate_bank')

const router = express.Router()

const BANK_CODE = 'bankCode'

/*
    body: { // pgp encrypt with public key
        payload: {
            account_number: '1234656789', // string, account number of user
        },
        signature: 'sdfsdfdsfsdsdfsdf' // HmacSHA512 of payload and secret_key
    }
 */
router.post(`/:${BANK_CODE}/account-info`, validator.pgpProtocol(), async (req, res) => {
    const bankCode = req.param(BANK_CODE)

    const accountInfo = await associateBankService.getAccountInfo(bankCode,
        req.body.payload, req.body.signature)

    res.status(httpSttCode.OK)
        .json({
            message: 'success',
            data: accountInfo
        })
})

router.post(`/:${BANK_CODE}/transfer`, async (req, res) => {
    const bankCode = req.param(BANK_CODE)
    if (bankCode === '') {
        throw createError(httpSttCode.BAD_REQUEST, 'bank code is null')
    }

    if (!req.body.signature || !req.body.payload) {
        throw createError(httpSttCode.BAD_REQUEST,
            'signature or (and) payload is null')
    }

    const transferInfo = await associateBankService.transfer(bankCode,
        req.body.payload, req.body.signature)

    res.status(httpSttCode.OK)
        .json({
            message: 'success',
            data: transferInfo
        })
})

module.exports = router