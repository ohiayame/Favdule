import db from "../config/db.js";

// 특정 유저 조회
async function GetGroups(id) {
  console.log(id);
  try {
    const [rows] = await db.query(
      "SELECT g.id, g.name AS group_name \
            FROM user_groups g \
            WHERE g.user_id = ? ORDER BY g.id ASC; ",
      [id]
    );
    console.log(rows);
    return rows;
  } catch (err) {
    console.error("DB Error:", err);
  }
}

export default GetGroups;
