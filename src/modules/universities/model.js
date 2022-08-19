const { fetchData } = require("../../utils/postgres");

const ALL_UNIVERSITIES = `
    Select * from universities
`;

const SELECTED_UNIVERSITY = `
    Select * from universities where university_id = $1
`;

const POST_UNIVERSITY = `
    Insert into universities(university_name) values($1)
`;

const UPDATE_UNIVERSITY = `
 Update universities set university_name = $1 where university_id = $2
`;

const DELETE_UNIVERSITY = `
Delete from universities where university_id = $1 returning *
`;

const allUniversities = () => fetchData(ALL_UNIVERSITIES);
const selectedUniversities = (universityId) =>
  fetchData(SELECTED_UNIVERSITY, universityId);
const postUniversity = async (name) => {
  const created = await fetchData(
    `Select * from universities where university_name = $1`,
    name
  );
  if (created.length > 0) {
    return null;
  } else {
    return fetchData(POST_UNIVERSITY, name);
  }
};

const updateUniversity = (name, id) => fetchData(UPDATE_UNIVERSITY, name, id);

const deleteUniversity = (id) => fetchData(DELETE_UNIVERSITY, id);

module.exports = {
  allUniversities,
  selectedUniversities,
  postUniversity,
  updateUniversity,
  deleteUniversity,
};
