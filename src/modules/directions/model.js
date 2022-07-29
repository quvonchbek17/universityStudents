const { fetchData } = require("../../utils/postgres");

const ALL_DIRECTIONS = `
    Select * from directions
`;

const SELECTED_DIRECTION = `
    Select * from directions where faculty_id = $1
`;

const POST_DIRECTION = `
    Insert into directions(direction_name, university_id, faculty_id ) values($1, $2, $3)
`;

const UPDATE_DIRECTION = `
 Update directions set direction_name = $1, university_id = $2, faculty_id = $3 where direction_id = $4
`;

const allDirections = () => fetchData(ALL_DIRECTIONS);
const selectedDirection = (directionId) =>
  fetchData(SELECTED_DIRECTION, directionId);
const postDirection = async (name, universityId, facultyId) => {
  const created = await fetchData(
    `Select * from directions where direction_name = $1 and university_id = $2 and faculty_id = $3 `,
    name,
    universityId,
    facultyId
  );
  if (created.length > 0) {
    return null;
  } else {
    return fetchData(POST_DIRECTION, name, universityId, facultyId);
  }
};

const updateDirection = (name, universityId, facultyId, id) =>
  fetchData(UPDATE_DIRECTION, name, universityId, facultyId, id);

module.exports = {
  allDirections,
  selectedDirection,
  postDirection,
  updateDirection,
};
