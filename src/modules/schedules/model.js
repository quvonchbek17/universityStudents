const { fetchData } = require("../../utils/postgres");

const ALL_SCHEDULES = `
    Select * from schedules
`;

const SELECTED_LESSON = `
    Select * from schedules where lesson_id = $1
`;

const POST_LESSON = `
    Insert into schedules(lesson_name, lesson_teacher, lesson_room, lesson_day, start_time, group_id ) values($1, $2, $3, $4, $5, $6)
`;

const UPDATE_LESSON = `
    Update schedules set lesson_name = $2, lesson_teacher = $3, lesson_room = $4, lesson_day = $5, start_time = $6, group_id = $7 where lesson_id = $1
`;
const DELETE_LESSON = `
Delete from schedules where lesson_id = $1 returning *
`;

const allLessons = () => fetchData(ALL_SCHEDULES);
const selectedLesson = (lessonId) => fetchData(SELECTED_LESSON, lessonId);
const postLesson = async (name, teacher, room, day, startTime, groupId) => {
  const created = await fetchData(
    `Select * from schedules where lesson_name = $1 and lesson_teacher = $2 and lesson_room = $3 and lesson_day = $4 and start_time = $5 and group_id = $6`,
    name,
    teacher,
    room,
    day,
    startTime,
    groupId
  );
  if (created.length > 0) {
    return null;
  } else {
    return fetchData(POST_LESSON, name, teacher, room, day, startTime, groupId);
  }
};
const updateLesson = (id, name, teacher, room, day, startTime, groupId) =>
  fetchData(UPDATE_LESSON, id, name, teacher, room, day, startTime, groupId);

const deleteLesson = (id) => fetchData(DELETE_LESSON, id);

module.exports = {
  allLessons,
  selectedLesson,
  postLesson,
  updateLesson,
  deleteLesson,
};
