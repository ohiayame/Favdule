import express from "express";
import {
  getUserGroups,
  getGroupChannels,
  getOrCreateChannelsIdANDgetGroups,
  postGroupsChannel,
  patchGroupName,
  deleteChannel,
  getGroupVideos,
} from "../controllers/groupController.js";

const router = express.Router();

// ============================= GET =============================
// 1) 사용자의 전체 그룹 조회
router.get("/user/:userId", getUserGroups);

// 2) 그룹의 채널 조회
router.get("/:groupId/channels", getGroupChannels);

// 3) 그룹의 영상 조회
router.get("/:groupId/channels/videos", getGroupVideos);

// ========================== POST ===============================
// 1) 채널 추가 / id, 추가 가능한 그룹 조회
router.post("/user/channel", getOrCreateChannelsIdANDgetGroups);

// 2) 채널을 그룹에 추가
router.post("/channel", postGroupsChannel);

// ========================== PATCH ===============================
// 1) 그룹 이름 수정
router.patch("/:groupId", patchGroupName);

// ========================== DELETE ===============================
// 1) 그룹의 채널 삭제
router.delete("/:groupId/channels/:channel_id", deleteChannel);

export default router;
