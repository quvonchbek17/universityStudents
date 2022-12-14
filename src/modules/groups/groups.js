const model = require("./model");
const { ipverify } = require("../../utils/ipverify");

module.exports = {
  GetAll: async (req, res) => {
    if (ipverify(req, res)) {
      return;
    }
    try {
      res.json(await model.allGroups());
    } catch (err) {
      res.sendStatus(500);
    }
  },
  GetGroups: async (req, res) => {
    try {
      if (ipverify(req, res)) {
        return;
      }
      const { directionId } = req.params;
      res.json(await model.Groups(directionId));
    } catch (err) {
      res.sendStatus(500);
    }
  },
  Post: async (req, res) => {
    try {
      if (ipverify(req, res)) {
        return;
      }
      const { name, directionId, courseId, educationId } = req.body;

      if (!name || !directionId || !courseId || !educationId) {
        res.json({
          status: 500,
          message: "Not created",
        });
        return;
      }
      const createdGroup = await model.postGroup(name);

      await model.postMix(
        directionId,
        courseId,
        educationId,
        createdGroup[0].group_id
      );

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
    if (ipverify(req, res)) {
      return;
    }
    const { id, name } = req.body;

    try {
      const [oldData] = await model.selectedGroup(id);
      const Name = name ? name : oldData.group_name;

      await model.updateGroups(Name, id);

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
    if (ipverify(req, res)) {
      return;
    }
    const { id } = req.body;
    try {
      const deleted = await model.deleteGroups(id);
      await model.deleteMix(id);
      if (deleted[0].group_id) {
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
