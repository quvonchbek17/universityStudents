const { Pool } = require('pg')
const cn = require('../config/db')

const pool = new Pool({
    connectionString: cn.connectionString
})

const fetchData = async(query, ...params) => {

    const client = await pool.connect()
    try {
        const { rows } = await client.query(query, params.length ? params : null)
        return rows
    } finally {
        client.release()
    }
}

module.exports = {
    fetchData
}