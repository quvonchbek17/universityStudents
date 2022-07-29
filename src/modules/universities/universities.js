const model = require("./model");

module.exports = {
  GetAll: async (req, res) => {
    try {
      res.json(await model.allUniversities());
    } catch (err) {
      res.sendStatus(500);
    }
  },
  GetSelected: async (req, res) => {
    const { universityId } = req.body;
    try {
      res.json(await model.selectedUniversities(universityId));
    } catch (err) {
      res.sendStatus(500);
    }
  },
  Post: async (req, res) => {
    try {
      const { name } = req.body;

      const createdUniversity = await model.postUniversity(name);

      if (createdUniversity) {
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
    const { id, name } = req.body;
    try {
      const Name = name ? name : "universities.university_name";

      await model.updateUniversity(Name, id);

      res.json({
        status: 200,
        message: "Updated",
      });
    } catch (err) {
      res.sendStatus(500);
    }
  },
};
