import { GetUserData, AddUser } from "../models/user.js";
import { AddGroup } from "../models/groups.js";

export const GetUserData = async (profileData) => {
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
    await AddGroup(user[0].id, "newGroup");
  }

  return user[0];
};

// 사용자가 구독 중인 채널 조회
export const fetchSubscriptions = async (accessToken) => {
  const res = await fetch(
    "https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&mine=true&maxResults=15",
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  const data = await res.json();
  return data.items || [];
};
