const { requireAuth } = require("../middleware/auth");
const express = require("express");

const router = express.Router();
const {
  getCourseQuestionsByCrn,
  createCourseQuestionByCrn,
  getQuestionDetails,
  addQuestionComment,
} = require("../controllers/questions.controller");

// List questions for a course + commentsCount
router.get("/courses/:crn/questions", getCourseQuestionsByCrn);

// Create a new question
router.post("/courses/:crn/questions", requireAuth, createCourseQuestionByCrn);

// Get one question + comments
router.get("/questions/:id", getQuestionDetails);

// Add comment to question
router.post("/questions/:id/comments", requireAuth, addQuestionComment);

module.exports = router;