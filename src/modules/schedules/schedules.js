const model = require("./model");
const { ipverify } = require("../../utils/ipverify");

module.exports = {
  GetAll: async (req, res) => {
    if (ipverify(req, res)) {
      return;
    }
    try {
      res.json(await model.allLessons());
    } catch (err) {
      res.sendStatus(500);
    }
  },

  GetSchedules: async (req, res) => {
    try {
      if (ipverify(req, res)) {
        return;
      }
      const { groupId } = req.params;
      res.json(await model.getLessons(groupId));
    } catch (err) {
      res.sendStatus(500);
    }
  },
  Post: async (req, res) => {
    try {
      if (ipverify(req, res)) {
        return;
      }
      const { name, teacher, room, day, startTime, type, groupId } = req.body;
      if (
        !name ||
        !teacher ||
        !room ||
        !day ||
        !startTime ||
        !groupId ||
        !type
      ) {
        res.json({
          status: 500,
          message: "Not created",
        });
        return;
      }

      const createdLesson = await model.postLesson(
        name,
        teacher,
        room,
        day,
        startTime,
        type,
        groupId
      );

      if (createdLesson) {
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
    try {
      if (ipverify(req, res)) {
        return;
      }
      const { id, name, teacher, room, day, startTime, type, groupId } =
        req.body;

      const Data = await model.selectedLesson(id);
      const oldData = Data[0];
      if (!oldData) {
        res.json({
          status: 404,
          message: "Schedules not found",
        });
        return;
      }
      const Name = name ? name : oldData.lesson_name;
      const Teacher = teacher ? teacher : oldData.lesson_teacher;
      const Room = room ? room : oldData.lesson_room;
      const Day = day ? day : oldData.lesson_day;
      const Time = startTime ? startTime : oldData.start_time;
      const Type = type ? type : oldData.lesson_type;
      const GroupId = groupId ? groupId : oldData.group_id;

      await model.updateLesson(
        id,
        Name,
        Teacher,
        Room,
        Day,
        Time,
        Type,
        GroupId
      );

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
      const deleted = await model.deleteLesson(id);
      if (deleted[0].lesson_id) {
        res.json({
          status: 200,
          message: "Deleted",
        });
      } else {
        res.json({
          status: 404,
          message: "Not deleted. Lesson not found",
        });
      }
    } catch (err) {
      res.sendStatus(500);
    }
  },
};
