const express = require('express')
const dotenv = require('dotenv')
const app = express()
const router = require('./modules')
const cors = require('cors')


// app.use('/*', (req, res) => {
//     console.log(req.headers.origin);
//     console.log(req.headers.origin != 'http://localhost:3000');
//     if(req.headers.origin != 'http://localhost:3000'){
//         res.sendStatus(404)
//         return
//     }
//    }
// )

var corsOptions = {
    origin: 'http://localhost:3000',
}


dotenv.config()
app.use(express.json())
app.use(cors(corsOptions))
app.use(router)
app.use('/*', (req, res) => res.sendStatus(404))
const port =  8080

app.listen(port)
