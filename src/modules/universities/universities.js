const model = require("./model");

module.exports = {
  GetAll: async (req, res) => {
    try {
      res.json(await model.allUniversities());
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
      const [oldData] = await model.selectedUniversities(id);

      const Name = name ? name : oldData.university_name;

      await model.updateUniversity(Name, id);

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
     const deleted = await model.deleteUniversity(id);
     if(deleted.university_id){
      res.json({
        status: 200,
        message: "Deleted",
      });
     } else {
      res.json({
        status: 404,
        message: "Not deleted. University not found"
      })
     }

    } catch (err) {
      res.sendStatus(500);
    }
  },
};
