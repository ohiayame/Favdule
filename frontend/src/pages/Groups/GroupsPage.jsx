import Layout from "@/layouts/Layout";
import GroupChannels from "@/pages/Groups/GroupChannels";
import { useEffect, useState } from "react";
import { getUserGroups } from "@/api/groupsApi";

function GroupsPage() {
  const [groups, setGroups] = useState([]);
  const [groupId, setGroupId] = useState(1);
  const id = 1;

  // 사용자 그룹 조회
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const resGroups = await getUserGroups(id);
        console.log(resGroups);
        setGroups(resGroups);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    fetchGroups();
  }, [id]);

  // select에서 value을 groupId에 set
  const handleSelectChange = (e) => {
    setGroupId(Number(e.target.value));
  };

  return (
    <Layout title="Groups">
      <p>Groups</p>
      {/* 사용자의 그룹 출력 */}
      <select value={groupId} onChange={handleSelectChange}>
        {groups.map((group) => (
          <option key={group.id} value={group.id}>
            {group.group_name}
          </option>
        ))}
      </select>

      {/* 해당 그룹의 채널 */}
      <GroupChannels groupId={groupId} />
    </Layout>
  );
}

export default GroupsPage;
