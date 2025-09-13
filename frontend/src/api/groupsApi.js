import api from "./apiClient";

// 사용자 그룹 정보
export const getUserGroups = async (id) => {
  const res = await api.get(`/groups/user/${id}`);
  return res.data;
};
