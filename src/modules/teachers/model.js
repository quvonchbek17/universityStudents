const { fetchData } = require("../../utils/postgres");

const ALL_TEACHERS = `
select * from teachers
`;

const GET_SCIENCE_TEACHER = `
Select * from teachers where science_id = $1
`;

const POST_TEACHERS = `
Insert into teachers(teacher_name,teacher_surname,science_id,faculty_id) values($1,$2,$3,$4)
`;

const UPDATE_TEACHER = `
Update teachers set teacher_name = $1,teacher_surname = $2,science_id = $3 where teacher_id = $4
`;

const DELETE_TEACHER = `
Delete from teachers where teacher_id = $1
`;

const allTeachers = () => fetchData(ALL_TEACHERS);

const getTeachersByScience = (id) => fetchData(GET_SCIENCE_TEACHER, id);

const addTeacher = (name, surname, scienceId, facultyId) => {
    const created = await fetchData(
        `Select * from teachers where teacher_name = $1,teacher_surname = $2,science_id = $3,faculty_id = $4`,
        name,surname,scienceId,facultyId
      );
      if (created.length > 0) {
        return {message:"Bunday Ism va Familiyalik o'qituvchi mavjud"};
      } else {
          fetchData(POST_TEACHERS, name, surname, scienceId, facultyId);
          return {status:200,message:"Created"}
      }
}

const updateTeacher = (name, surname, sicenceId, id) =>
  fetchData(UPDATE_TEACHER, name, surname, sicenceId, id);

const deleteTeacher = (id) => fetchData(DELETE_TEACHER, id);

module.exports = {
  allTeachers,
  getTeachersByScience,
  addTeacher,
  updateTeacher,
  deleteTeacher,
};
