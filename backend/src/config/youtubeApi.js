import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.YOUTUBE_API_KEY;

const baseURL = "https://www.googleapis.com/youtube/v3/";

export const searchChannelsApi = axios.create({
  baseURL: baseURL,
  params: {
    part: "snippet",
    maxResults: 10,
    key: API_KEY,
    type: "channel",
  },
});

export const SearchVideoApi = axios.create({
  baseURL: baseURL,
  params: {
    part: "snippet",
    maxResults: 10,
    key: API_KEY,
    type: "video",
  },
});
