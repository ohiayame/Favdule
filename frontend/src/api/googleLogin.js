// OAuth 클라이언트 ID
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
// Gooogle Cloud에서 등록한 리디렉션 URI
console.log("Redirect URI:", import.meta.env.VITE_GOOGLE_REDIRECT_URI);
const REDIRECT_URI = import.meta.env.VITE_GOOGLE_REDIRECT_URI;
const SCOPE = "profile email https://www.googleapis.com/auth/youtube.readonly";

// 로그인 버튼 클릭 시 Google OAuth로 리디렉션
export const userLogin = () => {
  const authUrl =
    `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}` +
    `&response_type=token&scope=${encodeURIComponent(SCOPE)}`;
  console.log("Redirect URI:", REDIRECT_URI);
  window.location.href = authUrl;
};
