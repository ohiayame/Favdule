import express from "express";
import { getUserGroups } from "../controllers/groupController.js";

const router = express.Router();

// 사용자의 그룹 조회
router.get("/user/:userId", getUserGroups);

export default router;
