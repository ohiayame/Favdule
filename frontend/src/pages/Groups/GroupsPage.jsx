import Layout from "@/layouts/Layout";
import GroupChannels from "@/pages/Groups/GroupChannels";
import { useEffect, useState } from "react";
import { getUserGroups, patchGroupName } from "@/api/groupsApi";

function GroupsPage() {
  const [groups, setGroups] = useState([]); // 사용자 그룹
  const [groupId, setGroupId] = useState(1); // 그룹 ID
  const [groupName, setGroupname] = useState(""); // 그룹 이름
  const id = 1; // 사용자 ID

  // -----------------------
  // 사용자 그룹 조회
  // -----------------------
  const fetchGroups = async () => {
    try {
      const resGroups = await getUserGroups(id);
      console.log(resGroups);
      setGroups(resGroups);

      //  그룹 이름 초기화
      const g_name = resGroups.find((g) => g.id === groupId);
      setGroupname(g_name.group_name);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, [id]);

  // ------------------------------------
  // select에서 groupId와 group_name set
  // ------------------------------------
  const handleSelectChange = (e) => {
    const val = Number(e.target.value);
    setGroupId(val);

    // group_name 저장
    const selectedGroup = groups.find((g) => g.id === val);
    setGroupname(selectedGroup.group_name);
  };

  // ------------------------------------
  // 그룹 이름 수정
  // ------------------------------------
  const handlePatchGroupName = async () => {
    console.log("handlePatchGroupName");
    const newGroup_name = await patchGroupName(groupId, groupName);
    // 그룹정보 다시 불러오기
    if (newGroup_name === groupName) {
      console.log("그룹정보 다시 불러오기");
      await fetchGroups();
    }
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

      {/* 그룹 이름 수정 */}
      <div>
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupname(e.target.value)}
        />
        <button onClick={handlePatchGroupName}>이름 저장</button>
      </div>

      {/* 해당 그룹의 채널 */}
      <GroupChannels groupId={groupId} />
    </Layout>
  );
}

export default GroupsPage;
