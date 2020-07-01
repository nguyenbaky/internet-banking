const jwt = require('jsonwebtoken')
const config = require('../../config')


module.exports = {
    uid: _ => {
        const length = 8;
        const timestamp = +new Date;

        let _getRandomInt = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        let ts = timestamp.toString();
        let parts = ts.split("").reverse();
        var id = "";

        for (let i = 0; i < length; ++i) {
            let index = _getRandomInt(0, parts.length - 1);
            id += parts[index];
        }

        return id;
    },

    jwtToken: userID => {
        const payload = {userID}
        return jwt.sign(payload, config.JWT.SECRET_KEY, {
            expiresIn: config.JWT.EXPIRATION_TIME
        })
    }
}
