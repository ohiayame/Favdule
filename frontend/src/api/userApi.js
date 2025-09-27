import api from "./apiClient";

// 사용자 정보
export const getUser = async (google_id) => {
  const res = await api.get(`/users/${google_id}`);
  console.log("user", res.data);
  return res.data;
};

// 로그인
export const getLogin = async (token) => {
  console.log(token);
  const res = await api.post(`/users`, { token });
  return res.data;
};
