const jwt = require('jsonwebtoken')
const httpSttCode = require('http-status-codes')
const config = require('../../config')
const userService = require('../service/user')

const auth = roles => (req, res, next) => {
    const token = getTokenFromBearer(req)
    if (token === '') {
        return res.status(httpSttCode.FORBIDDEN).json({
            message: 'forbidden'
        })
    }

    try {
        const decoded = jwt.verify(token, config.JWT.SECRET_KEY)
        const userID = decoded.userID
        userService.checkRoleUser(userID, roles)
        req.userID = userID
    } catch (err) {
        return res.status(httpSttCode.UNAUTHORIZED).json({
            message: err.message
        })
    }

    next()
}

function getTokenFromBearer(req) {
    if (!req.headers.hasOwnProperty("authorization")) {
        return ''
    }

    const authorization = req.headers.authorization
    const strs = authorization.split('Bearer ')
    if (strs.length !== 2) {
        return ''
    }

    return strs[1]
}

module.exports = {
    auth: auth,
}
