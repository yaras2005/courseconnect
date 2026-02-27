const db = require("../db");

async function getCourseIdFromCrn(crn) {
  const normalized = String(crn).trim().toUpperCase();
  const [rows] = await db.query(`SELECT id FROM courses WHERE code = ?`, [normalized]);
  return rows[0]?.id || null;
}

async function getEnrollmentCount(req, res) {
  const crn = String(req.params.crn).trim().toUpperCase();

  try {
    const courseId = await getCourseIdFromCrn(crn);
    if (!courseId) return res.status(404).json({ error: "Course not found" });

    const [rows] = await db.query(
      `SELECT COUNT(*) AS count FROM course_enrollments WHERE course_id = ?`,
      [courseId]
    );

    res.json({ crn, count: Number(rows[0].count) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

async function enrollInCourse(req, res) {
  const crn = String(req.params.crn).trim().toUpperCase();
  const userId = req.user.id;

  try {
    const courseId = await getCourseIdFromCrn(crn);
    if (!courseId) return res.status(404).json({ error: "Course not found" });

    await db.query(
      `INSERT INTO course_enrollments (course_id, user_id) VALUES (?, ?)`,
      [courseId, userId]
    );

    res.status(201).json({ message: "Enrolled", crn });
  } catch (err) {
    // already enrolled
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(200).json({ message: "Already enrolled", crn });
    }
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
async function getMyCourses(req, res) {
  const userId = req.user.id;

  try {
    const [rows] = await db.query(
      `
      SELECT 
        c.id,
        c.code,
        c.title,
        ce.role,
        ce.enrolled_at
      FROM course_enrollments ce
      JOIN courses c ON c.id = ce.course_id
      WHERE ce.user_id = ?
      ORDER BY c.code
      `,
      [userId]
    );

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
module.exports = { getEnrollmentCount, enrollInCourse, getMyCourses };