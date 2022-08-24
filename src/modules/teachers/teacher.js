const model = require("./model");
const { verify } = require("../../utils/jwt");

module.exports = {
  Get: async (req, res) => {
    try {
      res.json(await model.allTeachers());
    } catch (err) {
      res.sendStatus(500);
    }
  },
  Get_By_Science: async (req, res) => {
    try {
      const { scienceId } = req.params;
      res.json(await model.Get_By_Science(scienceId));
    } catch (err) {
      res.sendStatus(500);
    }
  },
  Post: async (req, res) => {
    const { name, surname, scienceId, token } = req.body;
    const data = verify(token);
    const facultyId = data.facultyId;

    res.json(await model.addTeacher(name, surname, scienceId, facultyId));

    try {
    } catch (err) {
      res.send(sendStatus(500));
    }
  },
  Update: async (req, res) => {
    const { name, surname, scienceId, teacherId } = req.body;
    try {
      await model.updateTeacher(name, surname, scienceId, teacherId);
      res.json({
        status: 200,
        message: "Updated",
      });
    } catch (err) {
      res.sendStatus(500);
    }
  },
  Delete: async (req, res) => {
    const { teacherId } = req.body;
    try {
      await model.deleteTeacher(teacherId);
      res.json({
        status: 200,
        message: "Deleted",
      });
    } catch (err) {
      res.sendStatus(500);
    }
  },
};
