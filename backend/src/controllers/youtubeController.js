import {
  searchChannelsApi,
  SearchVideoApi,
  SearchVideoInfoApi,
} from "../config/youtubeApi.js";

export const searchChannels = async (req, res) => {
  //   console.log(req.query);
  const search_q = req.query.query;
  console.log("search_q: ", search_q);

  const channels = await searchChannelsApi.get("/search", {
    params: {
      q: search_q,
    },
  });

  //   console.log(channels.data.items);
  res.json(channels.data.items);
};

// 해당 채널의 최근 영상 조회
export const searchVideos = async (channelId) => {
  // console.log(channelId, afterTime, beforeTime);

  const videos = await SearchVideoApi.get("/search", {
    params: {
      channelId: channelId,
    },
  });

  // console.log(videos.data.items);
  return videos.data.items;
};

// videoId로 liveStreamingDetails정보 조회
export const v_info = async (v_Ids) => {
  const videos = await SearchVideoInfoApi.get("/videos", {
    params: {
      id: v_Ids.join(","),
    },
  });

  // console.log(videos.data.items);
  return videos.data.items;
};
