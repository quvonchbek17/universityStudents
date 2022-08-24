const { fetchData } = require("../../utils/postgres");

const ALL_ADMINS = `
    Select * from systemadmins
`;

const allAdmins = () => fetchData(ALL_ADMINS);


module.exports = {
    allAdmins
};
