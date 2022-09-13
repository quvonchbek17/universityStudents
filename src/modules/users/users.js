const model = require('./model')
const { ipverify } = require('../../utils/ipverify')

module.exports = {
    GetAll: async(req, res) => {
        try {
            if(ipverify(req, res)){
                return
              }
            res.json( await model.allUsers())
        } catch(err) {
            res.sendStatus(500)
        }
    }
}