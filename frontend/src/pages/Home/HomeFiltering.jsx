import { useEffect, useState } from "react";
import { getUserGroups } from "@/api/groupsApi";

function HomeFiltering({ groupId, onFilterChange }) {
  const [groups, setGroups] = useState([]);
  const id = 1;

  // ------------------------------------
  // 사용자 그룹 조회
  // ------------------------------------
  const fetchGroups = async () => {
    try {
      const resGroups = await getUserGroups(id);
      console.log(resGroups);
      setGroups(resGroups);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, [id]);

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
