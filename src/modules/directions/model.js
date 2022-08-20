const { fetchData } = require("../../utils/postgres");

const ALL_DIRECTIONS = `
    Select * from directions order by direction_name
`;

const DIRECTIONS = `
    Select * from directions where faculty_id = $1 order by direction_name
`;

const SELECTED_DIRECTION = `
    Select * from directions where direction_id = $1
`;

const POST_DIRECTION = `
    Insert into directions(direction_name, faculty_id ) values($1, $2)
`;

const UPDATE_DIRECTION = `
 Update directions set direction_name = $1, faculty_id = $2 where direction_id = $3
`;

const DELETE_DIRECTION = `
Delete from directions where direction_id = $1 returning *
`;

const allDirections = () => fetchData(ALL_DIRECTIONS);
const Directions = (facultyId) => fetchData(DIRECTIONS, facultyId);
const selectedDirection = (directionId) => fetchData(SELECTED_DIRECTION, directionId);
const postDirection = async (name, facultyId) => {
  const created = await fetchData(
    `Select * from directions where direction_name = $1 and faculty_id = $2 `,
    name,
    facultyId
  );
  if (created.length > 0) {
    return null;
  } else {
    return fetchData(POST_DIRECTION, name, facultyId);
  }
};

const updateDirection = (name, facultyId, id) =>
  fetchData(UPDATE_DIRECTION, name, facultyId, id);

const deleteDirection = (id) => fetchData(DELETE_DIRECTION, id);

module.exports = {
  allDirections,
  Directions,
  selectedDirection,
  postDirection,
  updateDirection,
  deleteDirection,
};
