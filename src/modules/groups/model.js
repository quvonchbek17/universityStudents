const { fetchData } =  require('../../utils/postgres')


const ALL_GROUPS = `
    Select * from groups
`

const SELECTED_GROUP = `
    Select * from groups where group_id = $1
`

const POST_GROUP = `
    Insert into groups(group_name, university_id, faculty_id, direction_id) values($1, $2, $3, $4)
`

const allGroups = () => fetchData(ALL_GROUPS)
const selectedGroup = (groupId) => fetchData(SELECTED_GROUP, groupId)
const postGroup = async(name, universityId, facultyId , directionId) => {
   const created = await fetchData(`Select * from groups where group_name = $1 and university_id = $2 and faculty_id = $3 and direction_id = $4 `, name, universityId, facultyId, directionId)
   if(created.length > 0){
    return null
   } else {
    return fetchData(POST_GROUP, name, universityId, facultyId, directionId)
   }
}

module.exports = {
    allGroups,
    selectedGroup,
    postGroup
}