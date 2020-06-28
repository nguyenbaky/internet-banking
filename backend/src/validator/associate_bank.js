const {body, param} = require('express-validator')

const BANK_CODE = 'bankCode'

module.exports = {
    pgpProtocol: _ => [
        param(BANK_CODE).notEmpty({ignore_whitespace: true}),
        body('signature').notEmpty({ignore_whitespace: true}),
        body('payload').notEmpty({ignore_whitespace: true}),
    ],
}