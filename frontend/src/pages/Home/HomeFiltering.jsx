import { useEffect, useState } from "react";
import { getUserGroups } from "@/api/groupsApi";
import { useAuthStore } from "@/store/auth";

import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

function HomeFiltering({ groupId, onFilterChange }) {
  const [groups, setGroups] = useState([]);
  const user = useAuthStore((state) => state.user);
  const id = user?.id;
  const groupData = JSON.parse(localStorage.getItem("groupData"));

  // ------------------------------------
  // 사용자 그룹 조회
  // ------------------------------------
  const fetchGroups = async () => {
    try {
      if (!user) {
        setGroups(groupData.groupsName);
        onFilterChange(0);
      } else {
        const resGroups = await getUserGroups(id);
        console.log(resGroups);
        setGroups(resGroups);
        onFilterChange(resGroups[0].id);
      }
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  // ------------------------------------
  // select에서 groupId set
  // ------------------------------------
  const handleSelectChange = (e) => {
    onFilterChange(Number(e.target.value));
  };

  return (
    <div>
      <FormControl sx={{ minWidth: 80, height: 20 }} size="small">
        <Select
          value={groupId}
          onChange={handleSelectChange}
          sx={{ height: 20 }}
          MenuProps={{
            PaperProps: {
              sx: {
                // 드롭다운 박스 전체 높이/폰트 줄이기
                "& .MuiMenuItem-root": {
                  fontSize: "0.8rem",
                  minHeight: "28px",
                  padding: "2px 8px",
                },
              },
            },
          }}
        >
          {/* 로그인 상태면 id, 아니면 index */}
          {groups.map((group, idx) => (
            <MenuItem key={idx} value={user ? group.id : idx}>
              {user ? group.group_name : group}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default HomeFiltering;
