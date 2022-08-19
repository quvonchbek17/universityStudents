const model = require("./model");

module.exports = {
  GetAll: async (req, res) => {
    try {
      res.json(await model.allGroups());
    } catch (err) {
      res.sendStatus(500);
    }
  },
  GetGroups: async (req, res) => {
    try {
      const { directionId } = req.params;
      res.json(await model.Groups(directionId));
    } catch (err) {
      res.sendStatus(500);
    }
  },
  Post: async (req, res) => {
    try {
      const { name,directionId } = req.body;

      const createdGroup = await model.postGroup( name, directionId );

      if (createdGroup) {
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
    const { id, name, directionId } = req.body;
    try {
      const [oldData] = await model.selectedGroup(id);

      const Name = name ? name : oldData.group_name;
      const DirectionId = directionId ? directionId : oldData.direction_id;

      await model.updateGroups(Name, DirectionId, id);

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
      const deleted = await model.deleteGroups(id);
      if(deleted.group_id){
        res.json({
          status: 200,
          message: "Deleted",
        });
      } else {
        res.json({
          status: 404,
          message: "Not deleted. Group not found",
        });
      }

    } catch (err) {
      res.sendStatus(500);
    }
  },
};
