const model = require("./model");
const { verify } = require("../../utils/jwt");
const { ipverify } = require("../../utils/ipverify");

module.exports = {
  Get: async (req, res) => {
    try {
      if (ipverify(req, res)) {
        return;
      }
      res.json(await model.allAdmins());
    } catch (err) {
      res.sendStatus(500);
    }
  },
  verifyAdmin: async (req, res) => {
    try {
      if (ipverify(req, res)) {
        return;
      }
      const { token } = req.body;
      const data = verify(token);
      if (data.id) {
        return res.json({
          status: 200,
          message: "Confirmed",
        });
      } else {
        return res.json({
          status: 404,
          message: "Not found",
        });
      }
    } catch (err) {
      return res.json({
        status: 500,
        message: "Not found",
      });
    }
  },

  Post: async (req, res) => {
    if (ipverify(req, res)) {
      return;
    }
    const { name, password, role, universityId, facultyId } = req.body;
    try {
      if (role == "superadmin") {
        await model.postSuperAdmin(name, password, role);
      } else if (role == "universityadmin") {
        await model.postUniversityAdmin(name, password, role, universityId);
      } else if (role == "facultyadmin") {
        await model.postFacultyAdmin(name, password, role, facultyId);
      }
      return res.json({
        status: 200,
        message: "Created",
      });
    } catch (err) {
      return res.json({
        status: 500,
        message: "Not created",
      });
    }
  },
  Update: async (req, res) => {
    if (ipverify(req, res)) {
      return;
    }
    const { name, password, id } = req.body;
    try {
      await model.updateAdmin(name, password, id);
      res.json({
        status: 200,
        message: "Updated",
      });
    } catch (err) {
      res.sendStatus(500);
    }
  },
  Delete: async (req, res) => {
    if (ipverify(req, res)) {
      return;
    }
    const { id } = req.body;
    try {
      await model.deleteAdmin(id);
      res.json({
        status: 200,
        message: "deleted",
      });
    } catch (err) {
      res.sendStatus(500);
    }
  },
};
