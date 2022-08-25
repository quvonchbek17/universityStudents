const { fetchData } = require("../../utils/postgres");

const ALL_SCHEDULES = `
    Select * from schedules
`;

const GET_SCHEDULES = `
    Select * from schedules where group_id = $1
`;

const SELECTED_LESSON = `
    Select * from schedules where lesson_id = $1
`;

const POST_LESSON = `
    Insert into schedules(lesson_name, lesson_teacher, lesson_room, lesson_day, start_time, lesson_type, group_id ) values($1, $2, $3, $4, $5, $6, $7)
`;

const UPDATE_LESSON = `
    Update schedules set lesson_name = $2, lesson_teacher = $3, lesson_room = $4, lesson_day = $5, start_time = $6, lesson_type = $7 group_id = $8 where lesson_id = $1
`;
const DELETE_LESSON = `
Delete from schedules where lesson_id = $1 returning *
`;

const allLessons = () => fetchData(ALL_SCHEDULES);
const getLessons = (groupId) => fetchData(GET_SCHEDULES, groupId);
const selectedLesson = (lessonId) => fetchData(SELECTED_LESSON, lessonId);
const postLesson = async (name, teacher, room, day, startTime, type, groupId) => {
  const created = await fetchData(
    `Select * from schedules where lesson_name = $1 and lesson_teacher = $2 and lesson_room = $3 and lesson_day = $4 and start_time = $5 and lesson_type = $6 and group_id = $7`,
    name,
    teacher,
    room,
    day,
    startTime,
    type,
    groupId
  );
  if (created.length > 0) {
    return null;
  } else {
    return fetchData(POST_LESSON, name, teacher, room, day, startTime, type, groupId);
  }
};
const updateLesson = (id, name, teacher, room, day, startime, type, groupId) =>
  fetchData(UPDATE_LESSON, id, name, teacher, room, day,startime, type, groupId);

const deleteLesson = (id) => fetchData(DELETE_LESSON, id);

module.exports = {
  allLessons,
  getLessons,
  selectedLesson,
  postLesson,
  updateLesson,
  deleteLesson,
};
