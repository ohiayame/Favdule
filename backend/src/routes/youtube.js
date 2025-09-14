import express from "express";
import { searchChannels } from "../controllers/youtubeController.js";

const router = express.Router();

// 영상 검색
router.get("/search", searchChannels);

export default router;
