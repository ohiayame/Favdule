import express from "express";
import { postLogin, getUser } from "../controllers/userController.js";

const router = express.Router();

// 로그인
router.post("/", postLogin);

// 사용자 정보 조회
router.get("/:google_id", getUser);

export default router;
