const model = require("./model");
const { verify } = require("../../utils/jwt")

module.exports = {
  GetAll: async (req, res) => {
    try {
      res.json(await model.allstarttimes());
    } catch (err) {
      res.sendStatus(500);
    }
  },
  GETTimes: async(req, res) => {
    try {
      const { facultyId } = req.params
      res.json(await model.getstarttimes(facultyId))
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
      const createdTime = await model.postTime(name, facultyId);

      if (createdTime) {
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
      const [oldData] = await model.selectedTime(id);

      const Desc = name ? name : oldData.time_desc;
      const FacultyId = facultyId ? facultyId : oldData.faculty_id;

      await model.updateTime(Desc, FacultyId, id);

      res.json({
        status: 200,
        message: "Updated",
      });
    } catch (err) {
        console.log(err);
      res.sendStatus(500);
    }
  },
  Delete: async (req, res) => {
    const { id } = req.body;
    try {
     const deleted = await model.deleteTime(id);
     if(deleted[0]?.time_id){
      res.json({
        status: 200,
        message: "Deleted",
      });
     } else {
      res.json({
        status: 404,
        message: "Not deleted. Time not found",
      });
     }

    } catch (err) {
      res.sendStatus(500);
    }
  },
};
