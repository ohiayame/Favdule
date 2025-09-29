import { useEffect, useState } from "react";
import { getUserGroups } from "@/api/groupsApi";
import { useAuthStore } from "@/store/auth";

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
      <select value={groupId} onChange={handleSelectChange}>
        {groups.map((group, idx) => (
          <option key={user ? group.id : idx} value={user ? group.id : idx}>
            {user ? group.group_name : group}
          </option>
        ))}
      </select>
    </div>
  );
}

export default HomeFiltering;
