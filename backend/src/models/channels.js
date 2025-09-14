import db from "../config/db.js";

// 특정 그룹의 채널 조회
async function GetChannels(groupId) {
  console.log("groupId: ", groupId);
  try {
    const [rows] = await db.query(
      "SELECT c.id, c.name AS channel_name, c.channelId\
        FROM group_channels gc\
        JOIN channels c ON gc.channel_id = c.id\
        WHERE gc.group_id = ?",
      [groupId]
    );
    console.log(rows);
    return rows;
  } catch (err) {
    console.error("DB Error:", err);
  }
}

export default GetChannels;
