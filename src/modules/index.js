const express = require("express");
const router = express.Router();

const universities = require("./universities/universities");
const faculties = require("./faculties/faculties");
const directions = require("./directions/directions");
const groups = require("./groups/groups");
const schedules = require("./schedules/schedules");
const users = require("./users/users");
const courses = require("./courses/course");
const sciences = require("./sciences/sciences");
const teachers = require("./teachers/teacher");
const admin = require("./admins/admins");
const login = require("./login/login");
const education = require("./educations/education");
const times = require("./starttimes/starttime");

router
  .get("/universities", universities.GetAll)
  .get("/faculties", faculties.GetAll)
  .get("/faculties/:universityId", faculties.GETFaculties)
  .get("/directions", directions.GetAll)
  .get("/directions/:token", directions.GetDirections)
  .get("/schedules", schedules.GetAll)
  .get("/schedules/:groupId", schedules.GetSchedules)
  .get("/groups", groups.GetAll)
  .get("/sciences", sciences.GetAll)
  .get("/times", times.GetAll)
  .get("/sciences/:facultyId", sciences.GETSciences)
  .get("/times/:facultyId", times.GETTimes)
  .get("/educations", education.GetAll)
  .get("/courses", courses.GetAll)
  .get("/groups/:directionId", groups.GetGroups)
  .get("/users", users.GetAll)
  .get("/teachers", teachers.Get)
  .get("/teachers/:scienceId", teachers.Get_By_Science)
  .get("admins", admin.Get)
  .post("/login", login.token)
  .post("/universities", universities.Post)
  .post("/faculties", faculties.Post)
  .post("/directions", directions.Post)
  .post("/groups", groups.Post)
  .post("/sciences", sciences.Post)
  .post("/times", times.Post)
  .post("/schedules", schedules.Post)
  .post("/teachers", teachers.Post)
  .post("/admins", admin.Post)
  .put("/schedules", schedules.Update)
  .put("/directions", directions.Update)
  .put("/faculties", faculties.Update)
  .put("/universities", universities.Update)
  .put("/groups", groups.Update)
  .put("/sciences", sciences.Update)
  .put("/teachers", teachers.Update)
  .put("/admins", admin.Update)
  .put("/times", times.Update)
  .delete("/schedules", schedules.Delete)
  .delete("/directions", directions.Delete)
  .delete("/faculties", faculties.Delete)
  .delete("/universities", universities.Delete)
  .delete("/groups", groups.Delete)
  .delete("/sciences", sciences.Delete)
  .delete("/teachers", teachers.Delete)
  .delete("/admins", admin.Delete)
  .delete("/sciences", sciences.Delete)
  .delete("/times", times.Delete);

module.exports = router;
