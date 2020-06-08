const express = require('express')

const router = express.Router()

router.use('/auth', require('./auth'))
router.use('/user', require('./user'))
router.use('/associate-bank', require('./associate_bank'))

module.exports = router