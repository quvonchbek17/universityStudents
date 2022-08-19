const model = require("./model");

module.exports = {
  GetAll: async (req, res) => {
    try {
      res.json(await model.allFaculties());
    } catch (err) {
      res.sendStatus(500);
    }
  },
  GETFaculties: async(req, res) => {
    try {
      const { universityId } = req.params
      res.json(await model.faculties(universityId))
    } catch (error) {
      res.status(500)
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
     const deleted = await model.deleteFaculty(id);
     if(deleted[0]?.faculty_id){
      res.json({
        status: 200,
        message: "Deleted",
      });
     } else {
      res.json({
        status: 404,
        message: "Not deleted. Faculty not found",
      });
     }

    } catch (err) {
      res.sendStatus(500);
    }
  },
};
