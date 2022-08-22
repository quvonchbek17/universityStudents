const { fetchData } = require("../../utils/postgres");

const ALL_GROUPS = `
    Select * from groups order by group_name
`;

const GROUPS = `
    Select g.group_id,g.group_name,d.direction_name,c.course_number,e.education_name
    from groups g
    inner join
    mix m on g.group_id = m.group_id
    inner join
    courses c on c.course_id = m.course_id
    inner join
    education e on e.education_id = m.education_id
    inner join
    direction d on d.direction_id = m.direction_id
    where d.direction_id = $1
`;

const SELECTED_GROUP = `
    Select * from groups where group_id = $1
`;

const POST_GROUP = `
    Insert into groups(group_name) values($1) returning *
`;

const UPDATE_GROUPS = `
 Update groups set group_name = $1 where group_id = $2
`;

const DELETE_GROUPS = `
Delete from groups where group_id = $1 returning *
`;

const POST_MIX = `
insert into mix(direction_id,course_id,education_id,group_id) values ($1,$2,$3,$4)
`;

const allGroups = () => fetchData(ALL_GROUPS);
const Groups = (directionId) => fetchData(GROUPS, directionId);
const selectedGroup = (groupId) => fetchData(SELECTED_GROUP, groupId);
const postGroup = async (name) => fetchData(POST_GROUP, name);

const updateGroups = (name, id) => fetchData(UPDATE_GROUPS, name, id);

const deleteGroups = (id) => fetchData(DELETE_GROUPS, id);

const postMix = (directionId, courseId, educationId, groupId) =>
  fetchData(POST_MIX, directionId, courseId, educationId, groupId);

module.exports = {
  allGroups,
  Groups,
  selectedGroup,
  postGroup,
  updateGroups,
  deleteGroups,
  postMix,
};
