import { userLogin } from "@/api/googleLogin";
import { useAuthStore } from "@/store/auth";

function Login() {
  // 사용자 정보 조회
  const user = useAuthStore((state) => state.user);
  console.log("user", user);
  const logout = useAuthStore((state) => state.logout);

  // 로그인 / 로그아웃
  const handleUser = async () => {
    if (user) {
      await logout();
    } else {
      await userLogin();
    }
  };

  return (
    <div>
      {user && (
        <div>
          회원정보
          <p>이름 {user.name}</p>
          <img src={user.picture_url} alt={user.id} />
          <button onClick={handleUser}>로그아웃</button>
        </div>
      )}
      {!user && (
        <div>
          로그인 해주세요^^
          <button onClick={handleUser}>로그인</button>
        </div>
      )}
    </div>
  );
}

export default Login;
