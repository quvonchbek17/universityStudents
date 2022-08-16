const model = require("./model");

module.exports = {
  GetAll: async (req, res) => {
    try {
      res.json(await model.allGroups());
    } catch (err) {
      res.sendStatus(500);
    }
  },
  GetSelected: async (req, res) => {
    const { groupId } = req.body;
    try {
      res.json(await model.selectedGroup(groupId));
    } catch (err) {
      res.sendStatus(500);
    }
  },
  Post: async (req, res) => {
    try {
      const { name, universityId, facultyId, directionId } = req.body;

      const createdGroup = await model.postGroup(
        name,
        universityId,
        facultyId,
        directionId
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
    const { id, name, universityId, facultyId, directionId } = req.body;
    try {
      const [oldData] = await model.selectedGroup(id);

      const Name = name ? name : oldData.group_name;
      const UniversityId = universityId ? universityId : oldData.university_id;
      const FacultyId = facultyId ? facultyId : oldData.faculty_id;

      const DirectionId = directionId ? directionId : oldData.direction_id;

      await model.updateGroups(Name, UniversityId, FacultyId, DirectionId, id);

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
      await model.deleteGroups(id);

      res.json({
        status: 200,
        message: "Deleted",
      });
    } catch (err) {
      res.sendStatus(500);
    }
  },
};
