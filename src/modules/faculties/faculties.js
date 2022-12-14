const model = require("./model");
const { ipverify } = require("../../utils/ipverify");

module.exports = {
  GetAll: async (req, res) => {
    try {
      if (ipverify(req, res)) {
        return;
      }
      res.json(await model.allFaculties());
    } catch (err) {
      res.sendStatus(500);
    }
  },
  GETFaculties: async (req, res) => {
    try {
      if (ipverify(req, res)) {
        return;
      }
      const { universityId } = req.params;
      res.json(await model.faculties(universityId));
    } catch (error) {
      res.status(500);
    }
  },
  Post: async (req, res) => {
    try {
      if (ipverify(req, res)) {
        return;
      }
      const { name, universityId } = req.body;

      if (!name || !universityId) {
        res.json({
          status: 500,
          message: "Not created",
        });
        return;
      }
      const createdFaculty = await model.postFaculty(name, universityId);

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
    if (ipverify(req, res)) {
      return;
    }
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
    if (ipverify(req, res)) {
      return;
    }
    const { id } = req.body;
    try {
      const deleted = await model.deleteFaculty(id);
      if (deleted[0]?.faculty_id) {
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
