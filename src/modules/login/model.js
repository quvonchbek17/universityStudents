const { fetchData } = require("../../utils/postgres");

const ADMIN = `
    Select * from systemadmins where admin_name = $1 and admin_password = $2
`;



const admin = (adminName, password) => fetchData(ADMIN, adminName, password);

module.exports = {
    admin
};
