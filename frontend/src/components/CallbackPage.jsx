import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { getLogin } from "@/api/userApi";
import { useAuthStore, useSubscStore } from "../store/auth";

function CallbackPage() {
  // store
  const setUser = useAuthStore((state) => state.setUser);
  const user = useAuthStore((state) => state.user);
  const setSubsc = useSubscStore((state) => state.setSubsc);
  const subsc = useSubscStore((state) => state.subsc);

  // user정보 저장되면 true
  const [done, setDone] = useState(false);

  // URL 해시에서 access_token 추출
  // -> 백앤드에서 사용자 정보 조회
  useEffect(() => {
    const handleAuth = async () => {
      if (window.location.hash) {
        const params = new URLSearchParams(window.location.hash.substring(1));
        const token = params.get("access_token");
        if (token) {
          //   localStorage.setItem("access_token", token);
          //   console.log(token);
          // 사용지 정보 조회 (추가)
          const { resUser, Subscriptions } = await getLogin(token);
          // console.log("로그인된 사용자:", resUser);
          // useAuthStore에 저장
          setUser(resUser);
          setSubsc(Subscriptions);
        }
      }
    };

    handleAuth();
  }, [setUser]);

  // user정보 갱신되면 실행
  useEffect(() => {
    if (user) {
      // console.log("상태가 갱신된 사용자:", user);
      // console.log("subsc", subsc);
      setDone(true);
    }
  }, [user]);

  // user정보있으면 메인에 이동
  if (done && user) return <Navigate to="/" replace />;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <img src="/loading.gif" alt="loading" style={{ width: "50%" }} />
    </div>
  );
}

export default CallbackPage;
