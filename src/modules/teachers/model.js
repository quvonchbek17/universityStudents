const { fetchData } = require("../../utils/postgres");

const ALL_TEACHERS = `
select * from teachers
`;

const SELECTED_TEACHER = `
select * from teachers where teacher_id = $1
`;

const GET_SCIENCE_TEACHER = `
Select * from teachers where science_id = $1
`;

const POST_TEACHERS = `
Insert into teachers(teacher_name,teacher_surname,science_id,teacher_level,faculty_id) values($1,$2,$3,$4,$5)
`;

const UPDATE_TEACHER = `
Update teachers set teacher_name = $1,teacher_surname = $2,science_id = $3, teacher_level = $4 where teacher_id = $5
`;

const DELETE_TEACHER = `
Delete from teachers where teacher_id = $1
`;

const allTeachers = () => fetchData(ALL_TEACHERS);
const selectedTeacher = () => fetchData(SELECTED_TEACHER);

const getTeachersByScience = (id) => fetchData(GET_SCIENCE_TEACHER, id);

const addTeacher = async (name, surname, scienceId,level, facultyId) => {
    const created = await fetchData(
        `Select * from teachers where teacher_name = $1 and teacher_surname = $2 and science_id = $3 and teacher_level = $4 and faculty_id = $5`,
        name, surname , scienceId,level,facultyId
      );
      if (created.length > 0) {
        return null;
      } else {
        return  fetchData(POST_TEACHERS, name, surname, scienceId, level, facultyId);
      }
}

const updateTeacher = (name, surname, sicenceId,level, id) =>
  fetchData(UPDATE_TEACHER, name, surname, sicenceId,level, id);

const deleteTeacher = (id) => fetchData(DELETE_TEACHER, id);

module.exports = {
  allTeachers,
  selectedTeacher,
  getTeachersByScience,
  addTeacher,
  updateTeacher,
  deleteTeacher,
};
