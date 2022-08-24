const { fetchData } = require("../../utils/postgres");

const ALL_ADMINS = `
    Select * from systemadmins
`;

const POST_SUPER_ADMIN = `
Insert into systemadmins(admin_name,admin_password,admin_role) values ($1,$2,$3)
`;

const POST_UNIVERSITY_ADMIN = `
Insert into systemadmins(admin_name,admin_password,admin_role,university_id) values ($1,$2,$3,$4)
`;

const POST_FACULTY_ADMIN = `
Insert into systemadmins(admin_name,admin_password,admin_role,faculty_id) values ($1,$2,$3,$4)
`;

const UPDATE_ADMIN = `
update systemadmins set admin_name = $1, admin_password = $2 where admin_id = $3
`;

const DELETE_ADMIN = `
Delete from systemadmins where admin_id = $1
`;

const allAdmins = () => fetchData(ALL_ADMINS);

const postSuperAdmin = (name, password, role) =>
  fetchData(POST_SUPER_ADMIN, name, password, role);
const postUniversityAdmin = (name, password, role, universityId) =>
  fetchData(POST_UNIVERSITY_ADMIN, name, password, role, universityId);
const postFacultyAdmin = (name, password, role, facultyId) =>
  fetchData(POST_FACULTY_ADMIN, name, password, role, facultyId);
const updateAdmin = (name, password, id) =>
  fetchData(UPDATE_ADMIN, name, password, id);
const deleteAdmin = (id) => fetchData(DELETE_ADMIN, id);

module.exports = {
  allAdmins,
  postSuperAdmin,
  postUniversityAdmin,
  postFacultyAdmin,
  updateAdmin,
  deleteAdmin,
};
