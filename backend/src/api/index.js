const express = require('express')
const middleware = require('../middleware/auth')
const consts = require('../consts/index')

const staffMiddleware = middleware.auth([consts.ROLE.STAFF])
const customerMiddleware = middleware.auth([consts.ROLE.CUSTOMER])

const router = express.Router()

router.use('/auth', require('./auth'))
router.use('/user', customerMiddleware,require('./user'))
router.use('/account', customerMiddleware, require('./account'))
router.use('/associate-bank', require('./associate_bank'))
router.use('/reciever',customerMiddleware,require('./reciever'))
router.use('/transaction',customerMiddleware,require('./transaction'))

module.exports = router
