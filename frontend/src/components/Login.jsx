import { userLogin } from "@/api/googleLogin";
import { useAuthStore } from "@/store/auth";

import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";

function Login() {
  // 사용자 정보 조회
  const user = useAuthStore((state) => state.user);
  // console.log("user", user);
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
          <ListItem
            secondaryAction={
              <IconButton edge="end" aria-label="logout" onClick={handleUser}>
                <LogoutIcon />
              </IconButton>
            }
          >
            <ListItemAvatar sx={{ minWidth: 72 }}>
              <Avatar
                src={user.picture_url}
                alt={user.id}
                sx={{ width: 56, height: 56 }}
              />
            </ListItemAvatar>
            <ListItemText primary={user.name + " 님"} />
          </ListItem>
        </div>
      )}
      {!user && (
        <div className="container">
          <a onClick={handleUser} className="lgbtn lgbtn-2">
            로그인하기
          </a>
        </div>
      )}
    </div>
  );
}

export default Login;
