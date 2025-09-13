import api from "./apiClient";

// 사용자 정보
export const getUser = async (id) => {
  const res = await api.get(`/users/${id}`);
  console.log("user", res.data);
  return res.data;
};
