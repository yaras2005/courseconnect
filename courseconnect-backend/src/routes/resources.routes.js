const express = require("express");
const router = express.Router();

const { requireAuth } = require("../middleware/auth");
const {
  getCourseResourcesByCrn,
  createCourseResourceByCrn,
  getResourceDetails,
  addResourceComment,
} = require("../controllers/resources.controller");

// list resources for a course + commentsCount
router.get("/courses/:crn/resources", getCourseResourcesByCrn);

// create resource (metadata) under course
router.post("/courses/:crn/resources", requireAuth, createCourseResourceByCrn);

// get one resource + comments
router.get("/resources/:id", getResourceDetails);

// add comment to resource
router.post("/resources/:id/comments", requireAuth, addResourceComment);

module.exports = router;