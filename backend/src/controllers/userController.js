import { GetUserData, AddUser } from "../models/user.js";

export const postLogin = async (req, res) => {
  const user_token = req.body.token;
  console.log(req.body);
  // 프로필 정보 조회
  const profRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
    headers: { Authorization: `Bearer ${user_token}` },
  });

  const profileData = await profRes.json();
  console.log(profileData);

  // 사용자가 존재하는지 조회
  let user = await GetUserData(profileData.id);

  // 등록이 없으면 추가
  if (user?.length <= 0) {
    // 저장 데이터
    const setData = {
      google_id: profileData.id,
      email: profileData.email,
      name: profileData.name,
      picture_url: profileData.picture,
    };
    // 추가
    user = await AddUser(setData);
  }
  const resUser = user[0];
  console.log("resUser", resUser);
  // 사용자의 구독 정보 조회
  const Subscriptions = await fetchSubscriptions(user_token);

  // console.log("user", user);
  // 사용자 정보 반환
  res.json({ resUser, Subscriptions });
};

// 사용자가 구독 중인 채널 조회
const fetchSubscriptions = async (accessToken) => {
  const res = await fetch(
    "https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&mine=true&maxResults=15",
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  const data = await res.json();
  console.log("data", data.items);
  return data.items || [];
};

export const getUser = async (req, res) => {
  console.log(req.params);
  const { google_id } = req.params;
  const user = await GetUserData(google_id);
  res.json(user[0]);
};
