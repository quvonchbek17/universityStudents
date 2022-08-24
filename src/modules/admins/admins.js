const model = require("./model");

module.exports = {
  Get: async (req, res) => {
    try {
      res.json(await model.allAdmins());
    } catch (err) {
      res.sendStatus(500);
    }
  },
  Post: async (req, res) => {
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
