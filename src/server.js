const express = require('express')
const dotenv = require('dotenv')
const app = express()
const router = require('./modules')
const cors = require('cors')
const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
	windowMs: 10 * 60 * 1000,
	max: 10000
})

app.use(limiter)
dotenv.config()
app.use(express.json())
app.use(cors())
app.use(router)
app.use('/*', (req, res) => res.sendStatus(404))
const port =  8080

app.listen(port)
