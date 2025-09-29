import db from "../config/db.js";

// ---------------------------------------------------------
// 특정 그룹의 채널 조회
// ---------------------------------------------------------
export const GetChannels = async (groupId) => {
  console.log("groupId: ", groupId);
  try {
    const [rows] = await db.query(
      "SELECT c.id, c.name AS channelTitle, c.channelId, c.img\
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
};

// ---------------------------------------------------------
// group_channels에 추가
// ---------------------------------------------------------
export const AddGroupChannels = async (g_id, c_id) => {
  try {
    await db.query(
      "INSERT INTO group_channels (group_id, channel_id) VALUES (?, ?)",
      [g_id, c_id]
    );
    // success 전달
    return { success: true };
  } catch (err) {
    console.error("DB Error:", err);
  }
};

// ---------------------------------------------------------
// channels테이블에 id 조회 (channel이 존재하는지)
// ---------------------------------------------------------
export const GetChannelsId = async (channelId) => {
  console.log("channelId: ", channelId);
  try {
    const [rows] = await db.query(
      "SELECT id FROM channels WHERE channelId = ?",
      [channelId]
    );
    // console.log("rows.id: ", rows[0].id ?? []);
    return rows?.[0]?.id ?? rows;
  } catch (err) {
    console.error("DB Error:", err);
  }
};

// ---------------------------------------------------------
// channel 정보를 channels테이블에 추가
// ---------------------------------------------------------
export const AddChannel = async (channel) => {
  const channelId = channel.channelId;
  const name = channel.title;
  const img = channel.thumbnail;

  try {
    const [result] = await db.query(
      "INSERT INTO channels (channelId, name, img) VALUES (?, ?, ?)",
      [channelId, name, img]
    );
    // id값 반환
    return result.insertId;
  } catch (err) {
    console.error("DB Error:", err);
  }
};

// ---------------------------------------------------------
// group_channels에서 삭제
// ---------------------------------------------------------
export const DeleteGroupChannel = async (groupId, channel_id) => {
  try {
    await db.query(
      "DELETE FROM group_channels WHERE group_id = ? AND channel_id = ?",
      [groupId, channel_id]
    );
    return true;
  } catch (err) {
    console.error("DB Error:", err);
  }
};
