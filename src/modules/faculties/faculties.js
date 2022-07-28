const model = require('./model')

module.exports = {
    GetAll: async(req, res) => {
        try {
            res.json(await model.allFaculties())
        } catch(err) {
            res.sendStatus(500)
        }
    },
    GetSelected: async(req, res) => {
        const { facultyId } = req.body
        try {
            res.json(await model.selectedFaculty(facultyId))
        } catch(err) {
            res.sendStatus(500)
        }
    },
    Post: async(req, res) => {
        try {
            const { name, universityId } = req.body


            const createdFaculty = await model.postFaculty(name, universityId)
            console.log(createdFaculty);

            if(createdFaculty){
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