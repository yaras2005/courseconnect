const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/auth");
const { getEnrollmentCount, enrollInCourse } = require("../controllers/enrollments.controller");

router.get("/courses/:crn/enrollment-count", getEnrollmentCount);
router.post("/courses/:crn/enroll", requireAuth, enrollInCourse);

module.exports = router;