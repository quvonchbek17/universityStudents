const model = require("./model");

module.exports = {
  GetAll: async (req, res) => {
    try {
      res.json(await model.allFaculties());
    } catch (err) {
      res.sendStatus(500);
    }
  },
  GetSelected: async (req, res) => {
    const { facultyId } = req.body;
    try {
      res.json(await model.selectedFaculty(facultyId));
    } catch (err) {
      res.sendStatus(500);
    }
  },
  Post: async (req, res) => {
    try {
      const { name, universityId } = req.body;

      const createdFaculty = await model.postFaculty(name, universityId);
      console.log(createdFaculty);

      if (createdFaculty) {
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
    const { id, name, universityId } = req.body;
    try {
      const [oldData] = await model.selectedFaculty(id);

      const Name = name ? name : oldData.faculty_name;
      const UniversityId = universityId ? universityId : oldData.university_id;

      await model.updateFaculty(Name, UniversityId, id);

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
      await model.deleteFaculty(id);

      res.json({
        status: 200,
        message: "Deleted",
      });
    } catch (err) {
      res.sendStatus(500);
    }
  },
};
