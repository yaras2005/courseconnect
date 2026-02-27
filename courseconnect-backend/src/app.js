// src/app.js
const express = require("express");
const cors = require("cors");

const coursesRoutes = require("./routes/courses.routes");
const questionsRoutes = require("./routes/questions.routes");
const resourcesRoutes = require("./routes/resources.routes");
const enrollmentsRoutes = require("./routes/enrollments.routes");
const app = express();

app.get("/", (req, res) => {
  res.send("CourseConnect API is running 🚀");
});

app.use(cors());
app.use(express.json());
const authRoutes = require("./routes/auth.routes");

app.use("/", enrollmentsRoutes);
app.use("/courses", coursesRoutes);
app.use("/", questionsRoutes);
app.use("/", resourcesRoutes);
app.use("/auth", authRoutes);
module.exports = app;