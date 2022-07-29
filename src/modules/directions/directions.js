const model = require("./model");

module.exports = {
  GetAll: async (req, res) => {
    try {
      res.json(await model.allDirections());
    } catch (err) {
      res.sendStatus(500);
    }
  },
  GetSelected: async (req, res) => {
    const { directionId } = req.body;
    try {
      res.json(await model.selectedDirection(directionId));
    } catch (err) {
      res.sendStatus(500);
    }
  },
  Post: async (req, res) => {
    try {
      const { name, universityId, facultyId } = req.body;

      const createdDirection = await model.postDirection(
        name,
        universityId,
        facultyId
      );

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
    const { id, name, universityId, facultyId } = req.body;
    try {
      const Name = name ? name : "directions.direction_name";
      const UniversityId = universityId
        ? universityId
        : "directions.university_id";
      const FacultyId = facultyId ? facultyId : "directions.faculty_id";

      await model.updateDirection(Name, UniversityId, FacultyId, id);

      res.json({
        status: 200,
        message: "Updated",
      });
    } catch (err) {
      res.sendStatus(500);
    }
  },
};
