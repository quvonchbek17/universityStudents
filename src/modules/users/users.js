const model = require('./model')

module.exports = {
    GetAll: async(req, res) => {
        try {
            res.json( await model.allUsers())
        } catch(err) {
            res.sendStatus(500)
        }
    }
}