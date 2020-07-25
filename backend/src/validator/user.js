const {body} = require('express-validator')

module.exports = {
    postRegister: _ => [
        body('name', 'name must not be empty')
            .notEmpty({ignore_whitespace: true}),
        body('email', 'email invalid')
            .notEmpty().isEmail(),
        body('password', 'password min length is 6')
            .isLength({min: 6}),
        body('balance', 'balance must be equal or greater than 1000')
            .optional().isInt({min: 1000})
    ],

    postChangePassword: _ => [
        body('userID','user ID must not be empty')
            .notEmpty(),
        body('oldPassword','password min length is 6')
            .isLength({min:6}),
        body('newPassword','password min length is 6')
            .isLength({min:6})
    ]
}