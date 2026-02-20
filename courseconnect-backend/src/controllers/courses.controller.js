const db = require("../db");

async function getCourses(req, res) {
  try {
    const [rows] = await db.query(
      "SELECT id, code, title, created_at FROM courses ORDER BY id ASC"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = { getCourses };