const express = require('express')
const middleware = require('../middleware/auth')
const consts = require('../consts/index')

const staffMiddleware = middleware.auth([consts.ROLE.STAFF])
const customerMiddleware = middleware.auth([consts.ROLE.CUSTOMER])

const router = express.Router()

router.use('/auth', require('./auth'))
router.use('/user', require('./user'))
router.use('/account', customerMiddleware, require('./account'))
router.use('/associate-bank', require('./associate_bank'))

module.exports = router
