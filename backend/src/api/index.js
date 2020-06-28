const express = require('express')
const middleware = require('../middleware/auth')
const consts = require('../consts/index')

const staffMiddleware = middleware.auth([consts.ROLE.STAFF])
const customerMiddleware = middleware.auth([consts.ROLE.CUSTOMER])

const router = express.Router()

router.use('/auth', require('../api/auth'))
router.use('/user', require('../api/user'))
router.use('/account', customerMiddleware, require('../api/account'))
router.use('/associate-bank', require('../api/associate_bank'))

module.exports = router