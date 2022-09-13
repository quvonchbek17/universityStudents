const model = require("./model");
const { ipverify } = require('../../utils/ipverify')

module.exports = {
  GetAll: async (req, res) => {
    if(ipverify(req, res)){
      return
    }
    try {
      res.json(await model.allCourse());
    } catch (err) {
      res.sendStatus(500);
    }
  }
};
