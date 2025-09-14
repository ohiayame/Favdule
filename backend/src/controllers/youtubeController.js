import { searchChannelsApi } from "../config/youtubeApi.js";

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
