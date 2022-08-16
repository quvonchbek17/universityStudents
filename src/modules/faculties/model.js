const { fetchData } = require("../../utils/postgres");

const ALL_FACULTIES = `
    Select * from faculties
`;

const SELECTED_FACULTY = `
    Select * from faculties where faculty_id = $1
`;

const POST_FACULTY = `
    Insert into faculties(faculty_name, university_id) values($1, $2)
`;

const UPDATE_FACULTY = `
 Update faculties set faculty_name = $1, university_id = $2 where faculty_id = $3
`;

const DELETE_FACULTY = `
Delete from faculties where faculty_id = $1
`;

const allFaculties = () => fetchData(ALL_FACULTIES);
const selectedFaculty = (facultyId) => fetchData(SELECTED_FACULTY, facultyId);
const postFaculty = async (name, universityId) => {
  const created = await fetchData(
    `Select * from faculties where faculty_name = $1 and university_id = $2 `,
    name,
    universityId
  );
  console.log(created);
  if (created.length > 0) {
    return null;
  } else {
    return fetchData(POST_FACULTY, name, universityId);
  }
};

const updateFaculty = (name, universityId, id) =>
  fetchData(UPDATE_FACULTY, name, universityId, id);

const deleteFaculty = (id) => fetchData(DELETE_FACULTY, id);

module.exports = {
  allFaculties,
  selectedFaculty,
  postFaculty,
  updateFaculty,
  deleteFaculty,
};
