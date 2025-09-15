import express from "express";
import {
  getUserGroups,
  getGroupChannels,
  getOrCreateChannelsIdANDgetGroups,
  postGroupsChannel,
} from "../controllers/groupController.js";

const router = express.Router();

// 사용자의 전체 그룹 조회
router.get("/user/:userId", getUserGroups);

// 그룹의 채널 조회
router.get("/:groupId/channels", getGroupChannels);

// 채널 추가 / id, 추가 가능 그룹 조회
router.post("/user/channel", getOrCreateChannelsIdANDgetGroups);

// 채널을 그룹에 추가
router.post("/channel", postGroupsChannel);

export default router;
