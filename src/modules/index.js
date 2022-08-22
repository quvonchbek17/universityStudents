const express = require("express");
const router = express.Router();

const universities = require("./universities/universities");
const faculties = require("./faculties/faculties");
const directions = require("./directions/directions");
const groups = require("./groups/groups");
const schedules = require("./schedules/schedules");
const users = require("./users/users");
const login = require("./login/login")
const education = require("./educations/education")
const courses = require("./courses/course")

router
  .get("/universities", universities.GetAll)
  .get("/faculties", faculties.GetAll)
  .get("/faculties/:universityId", faculties.GETFaculties)
  .get("/directions", directions.GetAll)
  .get("/directions/:token", directions.GetDirections)
  .get("/schedules", schedules.GetAll)
  .get("/groups", groups.GetAll)
  .get("/educations", education.GetAll)
  .get("/courses", courses.GetAll)
  .get("/groups/:directionId", groups.GetGroups)
  .get("/users", users.GetAll)
  .post("/login", login.token)
  .post("/universities", universities.Post)
  .post("/faculties", faculties.Post)
  .post("/directions", directions.Post)
  .post("/groups", groups.Post)
  .post("/schedules", schedules.Post)
  .put("/schedules", schedules.Update)
  .put("/directions", directions.Update)
  .put("/faculties", faculties.Update)
  .put("/universities", universities.Update)
  .put("/groups", groups.Update)
  .delete("/schedules", schedules.Delete)
  .delete("/directions", directions.Delete)
  .delete("/faculties", faculties.Delete)
  .delete("/universities", universities.Delete)
  .delete("/groups", groups.Delete);

module.exports = router;
