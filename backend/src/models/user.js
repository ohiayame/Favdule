import db from "../config/db.js";

// ---------------------------------------------------------
// GET : 사용자 정보 조회
// ---------------------------------------------------------
export const GetUserData = async (google_id) => {
  // console.log("id:", id);
  try {
    const [rows] = await db.query("SELECT * FROM users WHERE google_id = ?", [
      google_id,
    ]);
    // console.log(rows);
    return rows;
  } catch (err) {
    console.error("DB Error:", err);
  }
};

// ---------------------------------------------------------
// Add: 사용자 정보 추가 후 정보 조회
// ---------------------------------------------------------
export const AddUser = async (data) => {
  const google_id = data.google_id;
  const email = data.email;
  const name = data.name;
  const picture_url = data.picture_url;

  try {
    await db.query(
      "INSERT INTO users (google_id, email, name, picture_url) VALUES (?, ?, ?, ?)",
      [google_id, email, name, picture_url]
    );
    // 등록 정보 조회
    const resData = GetUserData(google_id);
    return resData;
  } catch (err) {
    console.error("DB Error:", err);
  }
};
