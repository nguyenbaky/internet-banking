const {body} = require('express-validator')

module.exports = {
    postLogin: _ => [
        body('username', 'the username must be an email')
            .notEmpty()
            .isEmail(),
        body('password', 'the password min length is 6')
            .isLength({min: 6}),
    ],
}