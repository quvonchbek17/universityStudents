const model = require("./model");
const { verify } = require("../../utils/jwt")

module.exports = {
  GetAll: async (req, res) => {
    try {
      res.json(await model.allDirections());
    } catch (err) {
      res.sendStatus(500);
    }
  },
  GetDirections: async (req, res) => {
    try {
      const { token } = req.params;
      const adminData = verify(token)
      res.json(await model.Directions(adminData.faculty_id));
    } catch (err) {
      res.sendStatus(500);
    }
  },
  Post: async (req, res) => {
    try {
      const { name, facultyId } = req.body;

      const createdDirection = await model.postDirection(name, facultyId);

      if (createdDirection) {
        res.json({
          status: 200,
          message: "Created",
        });
      } else {
        res.json({
          status: 500,
          message: "Not created",
        });
      }
    } catch (err) {
      res.sendStatus(500);
    }
  },

  Update: async (req, res) => {
    const { id, name, facultyId } = req.body;
    try {
      const [oldData] = await model.selectedDirection(id);

      const Name = name ? name : oldData.direction_name;
      const FacultyId = facultyId ? facultyId : oldData.faculty_id;

      await model.updateDirection(Name, FacultyId, id);

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
      await model.deleteDirection(id);

      res.json({
        status: 200,
        message: "Deleted",
      });
    } catch (err) {
      res.sendStatus(500);
    }
  },
};
