const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const httpSttCode = require('http-status-codes')

const app = express()
const PORT = process.env.PORT || 5000

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

app.use('/api', require('./api/index'))

// exception handler
app.use((req, res) => {
    res.status(httpSttCode.NOT_FOUND)
        .json({
            message: 'NOT FOUND'
        })
})

// error handler
app.use((err, req, res, next) => {
    console.log(err)
    const httpCode = err.statusCode || httpSttCode.INTERNAL_SERVER_ERROR
    res.status(httpCode)
        .json({
            message: err.message
        })
})

app.listen(PORT, _ => {
    console.log(`api is running at http://localhost:${PORT}`)
})
