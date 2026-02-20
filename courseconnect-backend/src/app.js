// src/app.js
const express = require("express");
const cors = require("cors");

const coursesRoutes = require("./routes/courses.routes");
const questionsRoutes = require("./routes/questions.routes");

const app = express();

app.use(cors());
app.use(express.json());
const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

app.use("/courses", coursesRoutes);
app.use("/", questionsRoutes);

module.exports = app;