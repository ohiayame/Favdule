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
