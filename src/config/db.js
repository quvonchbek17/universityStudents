const dotenv = require('dotenv')
dotenv.config()
module.exports = {
    connectionString: process.env.DB_CONFIG
 }
