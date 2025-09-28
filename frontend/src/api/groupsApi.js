import api from "./apiClient";

// ============================= GET =============================
// --------------------
// 사용자 그룹 정보 조회
// --------------------
export const getUserGroups = async (id) => {
  const res = await api.get(`/groups/user/${id}`);
  return res.data;
};

// --------------------
// 해딩 그룹의 채널 조회
// --------------------
export const getGroupChannels = async (groupId) => {
  const res = await api.get(`/groups/${groupId}/channels`);
  return res.data;
};

// --------------------
// 해딩 그룹의 영상 조회
// --------------------
export const getVideos = async (groupId) => {
  const res = await api.get(`/groups/${groupId}/channels/videos`);
  return res.data;
};

// ========================== POST ===============================
// --------------------------------
// 채널 추가/ id, 추가 가능 그룹 조회
// --------------------------------
export const getChannelsIdANDGroup = async (user_id, channel) => {
  const res = await api.post(`/groups/user/channel`, {
    user_id,
    channel: {
      channelId: channel.id.channelId,
      thumbnail: channel.snippet.thumbnails.medium.url,
      title: channel.snippet.title,
    },
  });
  return res.data;
};

// ----------------
// 그룹에 채널 추가
// ----------------
export const postGroupsChannel = async (groupIds, channel_id) => {
  const res = await api.post(`/groups/channel`, { groupIds, channel_id });
  return res.data;
};

// ========================== PATCH ===============================
//-----------------------
// 그룹 이름 셋 / 그룹 추가
//-----------------------
export const setGroupName = async (groupId, name, user_id) => {
  const res = await api.patch(`/groups/${groupId}`, { name, user_id });
  return res.data;
};

// ========================== DELETE ===============================
// ----------------
// 그룹의 채널 삭제
// ----------------
export const deleteChannel = async (groupId, channel_id) => {
  const res = await api.delete(`/groups/${groupId}/channels/${channel_id}`);
  return res.data;
};
// ----------------
// 그룹 삭제
// ----------------
export const deleteGroup = async (groupId) => {
  const res = await api.delete(`/groups/${groupId}`);
  return res.data;
};