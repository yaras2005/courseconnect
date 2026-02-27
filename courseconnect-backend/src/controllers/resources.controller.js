const db = require("../db");

async function getCourseIdFromCrn(crn) {
  // your courses table uses "code" as CRN
  const [rows] = await db.query(`SELECT id FROM courses WHERE code = ?`, [crn]);
  return rows[0]?.id || null;
}
// GET /courses/:courseId/resources
async function getCourseResourcesByCrn(req, res) {
  const crn = String(req.params.crn);

  try {
    const courseId = await getCourseIdFromCrn(crn);
    if (!courseId) return res.status(404).json({ error: "Course not found" });

    const [rows] = await db.query(
      `
      SELECT
        r.id,
        ? AS crn,
        r.course_id,
        r.user_id,
        r.title,
        r.category,
        r.file_name AS fileName,
        r.mime_type AS mimeType,
        r.size,
        r.uri,
        r.uploaded_at AS uploadedAt,
        COUNT(rc.id) AS commentsCount
      FROM resources r
      LEFT JOIN resource_comments rc ON rc.resource_id = r.id
      WHERE r.course_id = ?
      GROUP BY r.id
      ORDER BY r.uploaded_at DESC
      `,
      [crn, courseId]
    );

    res.json(rows.map(r => ({ ...r, commentsCount: Number(r.commentsCount) })));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

// POST /courses/:courseId/resources
async function createCourseResourceByCrn(req, res) {
  const crn = String(req.params.crn); 
  const userId = req.user.id;
  const { title, category, fileName, mimeType, size, uri } = req.body;

  if (!title || !category || !fileName || !uri) {
    return res.status(400).json({ error: "title, category, fileName, uri are required" });
  }

  try {
    const courseId = await getCourseIdFromCrn(crn);
    if (!courseId) return res.status(404).json({ error: "Course not found" });
    const [result] = await db.query(
      `
      INSERT INTO resources (course_id, user_id, title, category, file_name, mime_type, size, uri)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [courseId, userId, title, category, fileName, mimeType || null, size || null, uri]
    );

    const insertedId = result.insertId;

    const [rows] = await db.query(
      `
      SELECT
        id, ? AS crn, title, category,
        file_name AS fileName, mime_type AS mimeType, size, uri,
        uploaded_at AS uploadedAt
      FROM resources
      WHERE id = ?
      `,
      [crn, insertedId]
    );

    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

// GET /resources/:id
async function getResourceDetails(req, res) {
  const id = Number(req.params.id);

  try {
    const [rRows] = await db.query(
      `
      SELECT
        id, course_id, user_id, title, category,
        file_name AS fileName, mime_type AS mimeType, size, uri,
        uploaded_at AS uploadedAt
      FROM resources
      WHERE id = ?
      `,
      [id]
    );

    if (rRows.length === 0) {
      return res.status(404).json({ error: "Resource not found" });
    }

    const [cRows] = await db.query(
      `
      SELECT id, resource_id, user_id, text, author, created_at
      FROM resource_comments
      WHERE resource_id = ?
      ORDER BY created_at ASC
      `,
      [id]
    );

    res.json({ ...rRows[0], comments: cRows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

// POST /resources/:id/comments
async function addResourceComment(req, res) {
  const resourceId = Number(req.params.id);
  const userId = req.user.id;
  const { text } = req.body;

  if (!text) return res.status(400).json({ error: "text is required" });

  try {
    const [uRows] = await db.query(`SELECT name FROM users WHERE id = ?`, [userId]);
    const authorName = uRows[0]?.name || "Unknown";

    const [result] = await db.query(
      `
      INSERT INTO resource_comments (resource_id, user_id, text, author)
      VALUES (?, ?, ?, ?)
      `,
      [resourceId, userId, text, authorName]
    );

    const insertedId = result.insertId;

    const [rows] = await db.query(
      `
      SELECT id, resource_id, user_id, text, author, created_at
      FROM resource_comments
      WHERE id = ?
      `,
      [insertedId]
    );

    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  getCourseResourcesByCrn,
  createCourseResourceByCrn,
  getResourceDetails,
  addResourceComment,
};