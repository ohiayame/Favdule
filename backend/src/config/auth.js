// 프로필 정보 조회
export const getProfile = async (user_token) => {
  const profRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
    headers: { Authorization: `Bearer ${user_token}` },
  });
  return await profRes.json();
};
