const express = require("express");
const router = express.Router();
const {
  getCourseQuestions,
  createCourseQuestion,
  getQuestionDetails,
  addQuestionComment,
} = require("../controllers/questions.controller");

// List questions for a course + commentsCount
router.get("/courses/:courseId/questions", getCourseQuestions);

// Create a new question
router.post("/courses/:courseId/questions", createCourseQuestion);

// Get one question + comments
router.get("/questions/:id", getQuestionDetails);

// Add comment to question
router.post("/questions/:id/comments", addQuestionComment);

module.exports = router;