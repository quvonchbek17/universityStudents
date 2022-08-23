const model = require("./model");

module.exports = {
  GetAll: async (req, res) => {
    try {
      res.json(await model.allLessons());
    } catch (err) {
      res.sendStatus(500);
    }
  },

  GetSchedules: async (req, res) => {
    try {
      const {groupId} = req.params
      res.json(await model.getLessons(groupId));
    } catch (err) {
      res.sendStatus(500);
    }
  },
  Post: async (req, res) => {
    try {
      const { name, teacher, room, day, startTime, groupId } = req.body;
      if(!name || !teacher || !room || !day || !startTime || !groupId){
        res.json({
          status: 500,
          message: "Not created",
        });
        return
      }

      const createdLesson = await model.postLesson(
        name,
        teacher,
        room,
        day,
        startTime,
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
      const { id, name, teacher, room, day, startTime, groupId } = req.body;

      const Data = await model.selectedLesson(id);
      const oldData = Data[0];

      const Name = name ? name : oldData.lesson_name;
      const Teacher = teacher ? teacher : oldData.lesson_teacher;
      const Room = room ? room : oldData.lesson_room;
      const Day = day ? day : oldData.lesson_day;
      const Time = startTime ? startTime : oldData.start_time;
      const GroupId = groupId ? groupId : oldData.group_id;

      await model.updateLesson(id, Name, Teacher, Room, Day, Time, GroupId);

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
      const deleted = await model.deleteLesson(id);
      if(deleted[0].lesson_id){
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
