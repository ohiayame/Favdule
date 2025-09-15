import api from "./apiClient";

// 사용자 그룹 정보 조회
export const getUserGroups = async (id) => {
  const res = await api.get(`/groups/user/${id}`);
  return res.data;
};

// 해딩 그룹의 채널 조회
export const getGroupChannels = async (groupId) => {
  const res = await api.get(`/groups/${groupId}/channels`);
  return res.data;
};

// 채널 추가/ id, 추가 가능 그룹 조회
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

// 그룹에 채널 추가
export const postGroupsChannel = async (groupIds, channel_id) => {
  const res = await api.post(`/groups/channel`, { groupIds, channel_id });
  return res.data;
};
