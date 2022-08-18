const { fetchData } = require("../../utils/postgres");

const ALL_GROUPS = `
    Select * from groups
`;

const GROUPS = `
    Select * from groups where direction_id = $1
`;

const SELECTED_GROUP = `
    Select * from groups where group_id = $1
`;

const POST_GROUP = `
    Insert into groups(group_name, direction_id) values($1, $2)
`;

const UPDATE_GROUPS = `
 Update groups set group_name = $1,  direction_id = $2 where group_id = $3
`;

const DELETE_GROUPS = `
Delete from groups where group_id = $1
`;

const allGroups = () => fetchData(ALL_GROUPS);
const Groups = (directionId) => fetchData(GROUPS, directionId);
const selectedGroup = (groupId) => fetchData(SELECTED_GROUP, groupId);
const postGroup = async (name,  directionId) => {
  const created = await fetchData(
    `Select * from groups where group_name = $1 and direction_id = $2 `,
    name,
    directionId
  );
  if (created.length > 0) {
    return null;
  } else {
    return fetchData(POST_GROUP, name, directionId);
  }
};

const updateGroups = (name, directionId, id) =>
  fetchData(UPDATE_GROUPS, name, directionId, id);

const deleteGroups = (id) => fetchData(DELETE_GROUPS, id);

module.exports = {
  allGroups,
  Groups,
  selectedGroup,
  postGroup,
  updateGroups,
  deleteGroups,
};
