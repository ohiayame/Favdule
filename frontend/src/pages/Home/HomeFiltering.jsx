import { useEffect, useState } from "react";
import { getUserGroups } from "@/api/groupsApi";
import { useAuthStore } from "@/store/auth";

function HomeFiltering({ groupId, onFilterChange }) {
  const [groups, setGroups] = useState([]);
  const user = useAuthStore((state) => state.user);
  const id = user.id;

  // ------------------------------------
  // 사용자 그룹 조회
  // ------------------------------------
  const fetchGroups = async () => {
    try {
      const resGroups = await getUserGroups(id);
      console.log(resGroups);
      setGroups(resGroups);
      onFilterChange(resGroups[0].id);
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
      {/* 사용자의 그룹 출력 */}
      <select value={groupId} onChange={handleSelectChange}>
        {groups.map((group) => (
          <option key={group.id} value={group.id}>
            {group.group_name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default HomeFiltering;
