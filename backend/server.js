import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MySQL 연결 풀 생성
const db = await mysql.createPool({
  host: process.env.DB_HOST || "db", // docker-compose 서비스 이름
  user: "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "myapp",
});

// ✅ API 엔드포인트
app.get("/", (req, res) => {
  res.send("🚀 Backend is running!");
});

app.get("/api/users", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM users");
    res.json(rows);
  } catch (err) {
    console.error("DB Error:", err.message);
    res.status(500).json({ error: "DB 연결 실패" });
  }
});

// ✅ 서버 실행
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Backend server running on port ${PORT}`);
});
