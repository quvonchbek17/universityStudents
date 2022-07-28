const model = require('./model')

module.exports = {
    
    GetAll: async(req, res) => {
        try {
            res.json(await model.allGroups())
        } catch(err) {
            res.sendStatus(500)
        }
    },
    GetSelected: async(req, res) => {
        const { groupId } = req.body
        try {
            res.json(await model.selectedGroup(groupId))
        } catch(err) {
            res.sendStatus(500)
        }
    },
    Post: async(req, res) => {
        try {
            const { name, universityId, facultyId, directionId } = req.body

            const createdGroup = await model.postGroup(name, universityId, facultyId, directionId)

            if(createdGroup){
                res.json(
                    {
                        status: 200,
                        message: "Created"
                    }
                )
            } else {
                res.json(
                    {
                        status: 500,
                        message: "Not created"
                    }
                )
            }

        } catch (err) {
            res.sendStatus(500)
        }
    }

}