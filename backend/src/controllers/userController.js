import * as userService from "../service/user-service.js";
import { getProfile } from "../config/auth.js";

export const postLogin = async (req, res) => {
  const user_token = req.body.token;
  
  // 사용자 정보 조회
  const profileData = getProfile(user_token);
  // 사용자가 DB에 존재하는지 조회 -> 없으면 추가
  const resUser = await userService.GetUserData(profileData);
  // 사용자의 구독 정보 조회
  const Subscriptions = await userService.fetchSubscriptions(user_token);

  // 사용자 정보 반환
  res.json({ resUser, Subscriptions });
};

export const getUser = async (req, res) => {
  const { google_id } = req.params;
  const resUser = await userService.GetUserData(google_id);
  res.json(resUser);
};
