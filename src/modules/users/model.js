const { fetchData } =  require('../../utils/postgres')


const ALL_USERS = `
    Select * from users
`
const allUsers = () => fetchData(ALL_USERS)

module.exports = {
    allUsers
}