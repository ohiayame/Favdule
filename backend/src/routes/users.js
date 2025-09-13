import express from "express";
import { getUser } from "../controllers/userController.js";

const router = express.Router();

// 사용자 정보 조회
router.get("/:userId", getUser);

export default router;
