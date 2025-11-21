import db from "../config/db.js";

// ---------------------------------------------------------
// GET : 사용자 정보 조회
// ---------------------------------------------------------
export const GetUserData = async (google_id) => {
  try {
    const [rows] = await db.query("SELECT * FROM users WHERE google_id = ?", [
      google_id,
    ]);
    return rows;
  } catch (err) {
    console.error("DB Error:", err);
  }
};

// ---------------------------------------------------------
// Add: 사용자 정보 추가 후 정보 조회
// ---------------------------------------------------------
export const AddUser = async (data) => {
  try {
    const { google_id, email, name, picture_url } = data;

    await db.query(
      "INSERT INTO users (google_id, email, name, picture_url) VALUES (?, ?, ?, ?)",
      [google_id, email, name, picture_url]
    );
    // 등록 정보 조회
    const resData = await GetUserData(google_id);
    return resData;
  } catch (err) {
    console.error("DB Error:", err);
  }
};
