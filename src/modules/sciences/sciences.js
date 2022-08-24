const model = require("./model");
const { verify } = require("../../utils/jwt")

module.exports = {
  GetAll: async (req, res) => {
    try {
      res.json(await model.allSciences());
    } catch (err) {
      res.sendStatus(500);
    }
  },
  GETSciences: async(req, res) => {
    try {
      const { facultyId } = req.params
      res.json(await model.getSciences(facultyId))
    } catch (error) {
      res.status(500)
    }
  },
  Post: async (req, res) => {
    try {
      const { name, token } = req.body;
      const data = verify(token)
      const facultyId = data.facultyId

      if(!name || !facultyId){
        res.json({
          status: 500,
          message: "Not created",
        });
        return
      }
      const createdScience = await model.postScience(name, facultyId);

      if (createdScience) {
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
      const [oldData] = await model.selectedScience(id);

      const Name = name ? name : oldData.science_name;
      const FacultyId = facultyId ? facultyId : oldData.faculty_id;

      await model.updateScience(Name, FacultyId, id);

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
     const deleted = await model.deleteScience(id);
     if(deleted[0]?.science_id){
      res.json({
        status: 200,
        message: "Deleted",
      });
     } else {
      res.json({
        status: 404,
        message: "Not deleted. Science not found",
      });
     }

    } catch (err) {
      res.sendStatus(500);
    }
  },
};
