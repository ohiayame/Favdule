import Layout from "@/layouts/Layout";
import GroupChannels from "@/pages/Groups/GroupChannels";
import { useEffect, useState } from "react";
import { getUserGroups, setGroupName } from "@/api/groupsApi";
import { useAuthStore } from "@/store/auth";

function GroupsPage() {
  const [groups, setGroups] = useState([]); // 사용자 그룹
  const [groupId, setGroupId] = useState(null); // 그룹 ID
  const [groupName, setGroupname] = useState(""); // 그룹 이름
  const user = useAuthStore((state) => state.user);

  // -----------------------
  // 사용자 그룹 조회
  // -----------------------
  const fetchGroups = async () => {
    try {
      const resGroups = await getUserGroups(user.id);
      console.log("resGroups", resGroups);
      setGroups(resGroups);

      //  그룹 이름 초기화
      if (groupId) {
        const g_name = resGroups.find((g) => g.id === groupId);
        console.log("g_name", g_name);
        setGroupname(g_name.group_name);
      } else {
        setGroupId(resGroups[0]?.id ?? null);
        setGroupname(resGroups[0]?.group_name ?? "");
      }
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  // ------------------------------------
  // select에서 groupId와 group_name set
  // ------------------------------------
  const handleSelectChange = (e) => {
    const val = e.target.value ? Number(e.target.value) : null;
    console.log(val);
    setGroupId(val);

    // group_name 저장
    const selectedGroup = groups.find((g) => g.id === val);
    setGroupname(selectedGroup?.group_name ?? "");
  };

  // ------------------------------------
  // 그룹 이름 수정
  // ------------------------------------
  const handlePatchGroupName = async () => {
    console.log("handlePatchGroupName");
    const newGroup_name = await setGroupName(groupId, groupName, user.id);
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
        <option key="" value="">
          새로운 그룹 추가
        </option>
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
