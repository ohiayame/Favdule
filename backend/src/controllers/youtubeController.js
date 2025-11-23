import * as ytService from "../service/youtube-service.js";

// 검색어로 channel 찾기
export const searchChannels = async (req, res) => {
  const search_q = req.query.query;
  const channels = await ytService.searchChannels(search_q);

  res.json(channels.data.items);
};
