const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const httpSttCode = require('http-status-codes')

const app = express()
const PORT = process.env.PORT || 8080

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())


app.listen(PORT, _ => {
    console.log(`api is running at http://localhost:${PORT}`)
})