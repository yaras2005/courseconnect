const db = require("../db");

// GET /courses/:courseId/questions
async function getCourseQuestions(req, res) {
  const courseId = Number(req.params.courseId);

  try {
    const [rows] = await db.query(
      `
      SELECT 
        q.id,
        q.course_id,
        q.title,
        q.body,
        q.author,
        q.created_at,
        COUNT(qc.id) AS commentsCount
      FROM questions q
      LEFT JOIN question_comments qc ON qc.question_id = q.id
      WHERE q.course_id = ?
      GROUP BY q.id
      ORDER BY q.created_at DESC
      `,
      [courseId]
    );

    // mysql returns COUNT as string sometimes; convert to number
    const normalized = rows.map(r => ({ ...r, commentsCount: Number(r.commentsCount) }));
    res.json(normalized);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

// POST /courses/:courseId/questions
async function createCourseQuestion(req, res) {
  const courseId = Number(req.params.courseId);
  const { title, body, author } = req.body;

  if (!title || !body || !author) {
    return res.status(400).json({ error: "title, body, author are required" });
  }

  try {
    const [result] = await db.query(
      `
      INSERT INTO questions (course_id, title, body, author)
      VALUES (?, ?, ?, ?)
      `,
      [courseId, title, body, author]
    );

    const insertedId = result.insertId;

    const [rows] = await db.query(
      `SELECT id, course_id, title, body, author, created_at
       FROM questions WHERE id = ?`,
      [insertedId]
    );

    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

// GET /questions/:id
async function getQuestionDetails(req, res) {
  const id = Number(req.params.id);

  try {
    const [qRows] = await db.query(
      `SELECT id, course_id, title, body, author, created_at
       FROM questions WHERE id = ?`,
      [id]
    );

    if (qRows.length === 0) {
      return res.status(404).json({ error: "Question not found" });
    }

    const [cRows] = await db.query(
      `SELECT id, question_id, text, author, created_at
       FROM question_comments
       WHERE question_id = ?
       ORDER BY created_at ASC`,
      [id]
    );

    res.json({
      ...qRows[0],
      comments: cRows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

// POST /questions/:id/comments
async function addQuestionComment(req, res) {
  const id = Number(req.params.id);
  const { text, author } = req.body;

  if (!text || !author) {
    return res.status(400).json({ error: "text and author are required" });
  }

  try {
    const [result] = await db.query(
      `INSERT INTO question_comments (question_id, text, author)
       VALUES (?, ?, ?)`,
      [id, text, author]
    );

    const insertedId = result.insertId;

    const [rows] = await db.query(
      `SELECT id, question_id, text, author, created_at
       FROM question_comments WHERE id = ?`,
      [insertedId]
    );

    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  getCourseQuestions,
  createCourseQuestion,
  getQuestionDetails,
  addQuestionComment,
};