const { fetchData } = require("../../utils/postgres");

const ALL_SCIENCES = `
    Select * from sciences order by science_name
`;

const SELECTED_SCIENCE = `
    Select * from sciences where science_id = $1 order by science_name
`;

const GET_SCIENCE = `
    Select * from sciences where faculty_id = $1 order by science_name
`;

const POST_SCIENCE = `
    Insert into sciences(science_name, faculty_id) values($1, $2)
`;

const UPDATE_SCIENCE = `
 Update sciences set science_name = $1, faculty_id = $2 where science_id = $3
`;

const DELETE_SCIENCE = `
Delete from sciences where science_id = $1 returning *
`;

const allSciences = () => fetchData(ALL_SCIENCES);
const selectedScience = (id) => fetchData(SELECTED_SCIENCE, id);
const getSciences = (facultyId) => fetchData(GET_SCIENCE, facultyId);
const postScience = async (name, facultyId) => {
  const created = await fetchData(
    `Select * from sciences where science_name = $1 and faculty_id = $2 `,
    name,
    facultyId
  );
  if (created.length > 0) {
    return null;
  } else {
    return fetchData(POST_SCIENCE, name, facultyId);
  }
};

const updateScience = (name, facultyId, id) =>
  fetchData(UPDATE_SCIENCE, name, facultyId, id);

const deleteScience = (id) => fetchData(DELETE_SCIENCE, id);

module.exports = {
  allSciences,
  selectedScience,
  getSciences,
  postScience,
  updateScience,
  deleteScience,
};
