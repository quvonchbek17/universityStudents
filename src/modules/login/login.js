const model = require("./model");
const { sign } = require('../../utils/jwt')
const { ipverify } = require('../../utils/ipverify')


module.exports = {
  token: async(req, res) => {
    if(ipverify(req, res)){
      return
    }
    try {
      const { adminName, password } = req.body;

      const admin = await model.admin(adminName, password)

      if (admin.length > 0) {
        res.json({
          status: 200,
          role: admin[0].admin_role,
          token: sign({id: admin[0].admin_id, facultyId: admin[0].faculty_id})
        });
      } else {
        res.json({
          status: 500,
          token: null,
        });
      }
    } catch (err) {
      res.sendStatus(500);
    }
  }
};
