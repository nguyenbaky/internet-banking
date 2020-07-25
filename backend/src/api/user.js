const express = require('express')
const userService = require('../service/user')
const httpSttCode = require('http-status-codes')
const validator = require('../validator/user')
const {validationResult} = require('express-validator')
const createError = require('http-errors')

const router = express.Router()

router.post('/register', validator.postRegister(), async (req, res) => {
    const err = validationResult(req)
    if (!err.isEmpty()) {
        throw createError(httpSttCode.BAD_REQUEST, err.array()[0].msg)
    }
    const defaultRoles = [{id: 1, name: 'customer'}]
    const user = await userService.createUser(req.body, defaultRoles)
    res.status(httpSttCode.CREATED)
        .json({
            message: 'success',
            data: {
                user: user,
            }
        })
})

router.post('/change-password',validator.postChangePassword(),async(req,res) => {
    const err = validationResult(req)
    if (!err.isEmpty()) {
        throw createError(httpSttCode.BAD_REQUEST, err.array()[0].msg)
    }
    await userService.changePassword(req.body)
    .then(err => {
        if(err) res.status.httpSttCode.BAD_REQUEST(err)
        else req.status(httpSttCode.OK)('change password success')
    })
})

module.exports = router