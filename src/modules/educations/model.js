const { fetchData } = require("../../utils/postgres");

const ALL_EDUCATION = `
    Select * from education
`;


const allEducation = () => fetchData(ALL_EDUCATION);


module.exports = {
    allEducation

};