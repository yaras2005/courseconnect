const db = require("../db");
async function getCourseIdFromCrn(crn) {
  const [rows] = await db.query(`SELECT id FROM courses WHERE code = ?`, [crn]);
  return rows[0]?.id || null;
}
// GET /courses/:courseId/questions
async function getCourseQuestionsByCrn(req, res) {
  const crn = String(req.params.crn);

  try {
    const courseId = await getCourseIdFromCrn(crn);
    if (!courseId) return res.status(404).json({ error: "Course not found" });
    const [rows] = await db.query(
      `
      SELECT 
        q.id,
        ? AS crn,
        q.course_id,
        q.user_id,
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
      [crn, courseId]
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
async function createCourseQuestionByCrn(req, res) {
  const crn = String(req.params.crn);
  const { title, body } = req.body;

  if (!title || !body) {
    return res.status(400).json({ error: "title and body are required" });
  }

  const userId = req.user.id;

  try {
     const courseId = await getCourseIdFromCrn(crn);
    if (!courseId) return res.status(404).json({ error: "Course not found" });
    // get author's display name from users table
    const [uRows] = await db.query(`SELECT name FROM users WHERE id = ?`, [userId]);
    const authorName = uRows[0]?.name || "Unknown";

    const [result] = await db.query(
      `
      INSERT INTO questions (course_id, user_id, title, body, author)
      VALUES (?, ?, ?, ?, ?)
      `,
      [courseId, userId, title, body, authorName]
    );

    const insertedId = result.insertId;

    const [rows] = await db.query(
      `SELECT id, course_id, user_id, title, body, author, created_at
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
  const questionId = Number(req.params.id);
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "text is required" });
  }

  const userId = req.user.id;

  try {
    // get author's display name from users table
    const [uRows] = await db.query(`SELECT name FROM users WHERE id = ?`, [userId]);
    const authorName = uRows[0]?.name || "Unknown";

    const [result] = await db.query(
      `INSERT INTO question_comments (question_id, user_id, text, author)
       VALUES (?, ?, ?, ?)`,
      [questionId, userId, text, authorName]
    );

    const insertedId = result.insertId;

    const [rows] = await db.query(
      `SELECT id, question_id, user_id, text, author, created_at
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
  getCourseQuestionsByCrn,
  createCourseQuestionByCrn,
  getQuestionDetails,
  addQuestionComment,
};