const { fetchData } = require("../../utils/postgres");

const ALL_COURSE = `
    Select * from courses
`;

const allCourse = () => fetchData(ALL_COURSE);
module.exports = {
    allCourse

};