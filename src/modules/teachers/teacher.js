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
      res.json(await model.getTeachersByScience(scienceId));
    } catch (err) {
      res.sendStatus(500);
    }
  },
  Post: async (req, res) => {
    try {
      const { name, surname, level, scienceId, token } = req.body;
      const data = verify(token);
      const facultyId = data.facultyId;

      const created = await model.addTeacher(name, surname, scienceId,level, facultyId)

      if (created) {
        res.json({
          status: 200,
          message: "Created"
        });
      } else {
        res.json({
          status: 500,
          message: "Not created"
        });
      }
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  },
  Update: async (req, res) => {
    try {
      const { name, surname, scienceId, level, id } = req.body;
      const Data = await model.selectedTeacher(id);
      const oldData = Data[0];
      if(!oldData){
        res.json({
          status: 404,
          message: "Teacher not found"
        })
        return
      }
      const Name = name ? name : oldData.teacher_name;
      const Surname = surname ? surname : oldData.teacher_surname;
      const ScienceId = scienceId ? scienceId : oldData.science_id;
      const Level = level ? level : oldData.teacher_level;
      await model.updateTeacher(Name, Surname, ScienceId, Level, id);
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
      await model.deleteTeacher(id);
      res.json({
        status: 200,
        message: "Deleted",
      });
    } catch (err) {
      res.sendStatus(500);
    }
  },
};
