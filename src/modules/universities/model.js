const { fetchData } = require('../../utils/postgres')

const ALL_UNIVERSITIES = `
    Select * from universities
`

const SELECTED_UNIVERSITY = `
    Select * from universities where university_id = $1
`

const POST_UNIVERSITY = `
    Insert into universities(university_name) values($1)
`


const allUniversities = () => fetchData(ALL_UNIVERSITIES)
const selectedUniversities = (universityId) => fetchData(SELECTED_UNIVERSITY, universityId)
const postUniversity = async(name) => {
   const created = await fetchData(`Select * from universities where university_name = $1`, name)
   if(created.length > 0){
    return null
   } else {
    return fetchData(POST_UNIVERSITY, name)
   }
}


module.exports = {
    allUniversities,
    selectedUniversities,
    postUniversity
}