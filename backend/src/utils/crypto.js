const cryptojs = require("crypto-js")

const crypto = {
    encryptSHA512: (data, secretKey) => {
        return cryptojs.HmacSHA512(data, secretKey).toString()
    },
    encryptSHA3: data => cryptojs.SHA3(data).toString(),
}

module.exports = crypto
