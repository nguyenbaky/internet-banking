const config = {
    PGP_SECRET_KEY: "asdasdasdasdasd",
    JWT: {
        SECRET_KEY: "asdasdasdasdasd",
        EXPIRATION_TIME: '1h'
    },
    
    DATABASE: {
        URL: 'mysql://root@localhost:3306/bank'
    },

    MOVE_MONEY_FEE: 3

}
module.exports = config
