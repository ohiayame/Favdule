import express from "express";
import { searchVideos } from "../controllers/youtubeController.js";

const router = express.Router();

// 영상 검색
router.get("/search", searchVideos);

export default router;
