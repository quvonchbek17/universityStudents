const express = require('express')
const dotenv = require('dotenv')
const app = express()
const router = require('./modules')
const cors = require('cors')

const whitelist = ['http://localhost:3000']

app.use('/*', (req, res) => {
    console.log(req.headers.host);
    if(req.headers.host != 'localhost:3000'){
        res.sendStatus(404)
    }
   }
)

dotenv.config()
app.use(express.json())
app.use(router)
app.use('/*', (req, res) => res.sendStatus(404))
const port =  8080

app.listen(port)
