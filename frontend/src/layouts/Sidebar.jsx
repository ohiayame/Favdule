import { useState } from "react";
import { Link } from "react-router-dom";
import { RouterData } from "@/routes/RouterData";
import Login from "@/components/Login";

function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(!open)}>메뉴</button>

      {open && (
        <div>
          {/* 로그인 정보 */}
          <Login />

          <nav>
            <ul>
              {RouterData.map(
                (route, idx) =>
                  route.title && (
                    <li key={idx}>
                      <Link to={route.link}>{route.title}</Link>
                    </li>
                  )
              )}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
