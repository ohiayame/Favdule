import { useState } from "react";

function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(!open)}>메뉴</button>

      {open && (
        <div style={{ background: "#ddd" }}>
          <p>홈</p>
          <p>그룹</p>
          <p>검색</p>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
