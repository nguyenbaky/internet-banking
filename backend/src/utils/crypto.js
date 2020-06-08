const cryptojs = require("crypto-js")
const bcrypt = require("bcryptjs")

const saltRounds = 10;

const crypto = {
    encryptSHA512: (data, secretKey) => {
        return cryptojs.HmacSHA512(data, secretKey).toString()
    },
    encryptSHA3: data => bcrypt.hash(data,saltRounds),
}

module.exports = crypto