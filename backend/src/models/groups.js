import db from "../config/db.js";

// --------------------------
// 특정 유저의 그룹 조회 (모두)
// --------------------------
export const GetUserGroups = async (id) => {
  // console.log("id:", id);
  try {
    const [rows] = await db.query(
      "SELECT g.id, g.name AS group_name \
            FROM user_groups g \
            WHERE g.user_id = ? ORDER BY g.id ASC; ",
      [id]
    );
    // console.log(rows);
    return rows;
  } catch (err) {
    console.error("DB Error:", err);
  }
};

// ------------------------------------------------------
// 특정 유저의 그룹 조회 (channel이 저장되어 있는 그룹 제외)
// ------------------------------------------------------
export const GetSelectGroups = async (user_id, channel_Id) => {
  try {
    const [rows] = await db.query(
      "SELECT g.id, g.name AS group_name \
        FROM user_groups g \
        LEFT JOIN group_channels gc \
        ON gc.group_id = g.id AND gc.channel_id = ? \
        WHERE g.user_id = ? AND gc.group_id IS NULL \
        ORDER BY g.id ASC;",
      [channel_Id, user_id]
    );
    console.log("rows: ", rows);
    return rows;
  } catch (err) {
    console.error("DB Error:", err);
  }
};
