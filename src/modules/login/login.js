const model = require("./model");
const { sign } = require('../../utils/jwt')

module.exports = {
  token: async(req, res) => {
    try {
      const { adminName, password } = req.body;
      const admin = await model.admin(adminName, password)

      if (admin.length > 0) {
        res.json({
          status: 200,
          role: admin[0].admin_role,
          token: sign(admin[0])
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
