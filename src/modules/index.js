const express = require('express')
const router = express.Router()

const universities = require('./universities/universities')
const faculties = require('./faculties/faculties')
const directions = require('./directions/directions')
const groups = require('./groups/groups')
const schedules = require('./schedules/schedules')
const users = require('./users/users')

router
    .get('/universities', universities.GetAll)
    .get('/faculties', faculties.GetAll)
    .get('/directions', directions.GetAll)
    .get('/schedules', schedules.GetAll)
    .get('/groups', groups.GetAll)
    .get('/users', users.GetAll)
    .post('/selecteduniversity', universities.GetSelected)
    .post('/selectedfaculty', faculties.GetSelected)
    .post('/selecteddirection', directions.GetSelected)
    .post('/selectedgroup', groups.GetSelected)
    .post('/selectedlesson', schedules.GetSelected)
    .post('/universities', universities.Post)
    .post('/faculties', faculties.Post)
    .post('/directions', directions.Post)
    .post('/groups', groups.Post)
    .post('/schedules', schedules.Post)
    .put('/schedules', schedules.Update)



module.exports = router