const express = require('express')
const dotenv = require('dotenv')
const app = express()
const router = require('./modules')


app.use('/*', (req, res) => {
    if(req.headers.origin != 'http://localhost:3000'){
        res.sendStatus(404)
        return
    }
   }
)

dotenv.config()
app.use(express.json())
app.use(router)
app.use('/*', (req, res) => res.sendStatus(404))
const port =  8080

app.listen(port)
