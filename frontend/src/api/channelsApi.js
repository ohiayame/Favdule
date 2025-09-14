import api from "./apiClient";

// 채널 검색
export const getChannels = async (q) => {
  const res = await api.get(`/youtube/search?query=${q}`);
  return res.data;
};
