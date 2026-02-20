const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET = "supersecretkey"; // later move to .env

async function register(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      `INSERT INTO users (name, email, password)
       VALUES (?, ?, ?)`,
      [name, email, hashedPassword]
    );

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Email already exists" });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  const [rows] = await db.query(
    `SELECT * FROM users WHERE email = ?`,
    [email]
  );

  if (rows.length === 0) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  const user = rows[0];

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token });
}

module.exports = { register, login };
