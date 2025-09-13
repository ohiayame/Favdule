import { useState } from "react";
import { getUser } from "../api/userApi";

function Login() {
  const [isLogin, setLogin] = useState(false);
  const [user, setUser] = useState([]);

  const handleUser = async () => {
    setLogin(!isLogin);
    const id = 1;
    const user = await getUser(id);
    setUser(user);
  };

  return (
    <div>
      {isLogin && (
        <div>
          회원정보
          <p>이름 {user.name}</p>
          <p>pic: {user.picture_url}</p>
        </div>
      )}
      {!isLogin && (
        <div>
          로그인 해주세요^^
          <button onClick={handleUser}>로그인</button>
        </div>
      )}
    </div>
  );
}

export default Login;
