const express = require('express')
const dotenv = require('dotenv')
const app = express()
const router = require('./modules')
const cors = require('cors')

const whitelist = ['http://localhost:3000']
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) === -1) {
      return
    }
  }
}

dotenv.config()
app.use(express.json())
app.use(cors(corsOptions))
app.use(router)
app.use('/*', (req, res) => res.sendStatus(404))
const port =  8080

app.listen(port)
