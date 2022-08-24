const { fetchData } = require("../../utils/postgres");

const ALL_STARTTIMES = `
    Select * from starttimes order by time_desc
`;

const SELECTED_TIME = `
    Select * from starttimes where time_id = $1 order by time_desc
`;

const GET_TIME = `
    Select * from starttimes where faculty_id = $1 order by time_desc
`;

const POST_TIME = `
    Insert into starttimes(time_desc, faculty_id) values($1, $2)
`;

const UPDATE_TIME = `
 Update starttimes set time_desc = $1, faculty_id = $2 where time_id = $3
`;

const DELETE_TIME = `
Delete from starttimes where time_id = $1 returning *
`;

const allstarttimes = () => fetchData(ALL_STARTTIMES);
const selectedTime = (id) => fetchData(SELECTED_TIME, id);
const getstarttimes = (facultyId) => fetchData(GET_TIME, facultyId);
const postTime = async (desc, facultyId) => {
  const created = await fetchData(
    `Select * from starttimes where time_desc = $1 and faculty_id = $2 `,
    desc,
    facultyId
  );
  if (created.length > 0) {
    return null;
  } else {
    return fetchData(POST_TIME, desc, facultyId);
  }
};

const updateTime = (desc, facultyId, id) =>
  fetchData(UPDATE_TIME, desc, facultyId, id);

const deleteTime = (id) => fetchData(DELETE_TIME, id);

module.exports = {
  allstarttimes,
  selectedTime,
  getstarttimes,
  postTime,
  updateTime,
  deleteTime,
};
