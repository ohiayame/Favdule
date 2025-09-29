import Layout from "@/layouts/Layout";
import GroupChannels from "@/pages/Groups/GroupChannels";
import { useEffect, useState } from "react";
import { getUserGroups, setGroupName, deleteGroup } from "@/api/groupsApi";
import { useAuthStore } from "@/store/auth";

function GroupsPage() {
  const [groups, setGroups] = useState([]); // 사용자 그룹
  const [groupId, setGroupId] = useState(null); // 그룹 ID
  const [groupName, setGroupname] = useState(""); // 그룹 이름
  const user = useAuthStore((state) => state.user);
  const groupData = JSON.parse(localStorage.getItem("groupData"));
  // -----------------------
  // 사용자 그룹 조회
  // -----------------------
  const fetchGroups = async () => {
    try {
      let resGroups = null;
      if (!user) {
        console.log(groupData);
        resGroups = groupData.groupsName;
        // 초기화
        setGroupId(0);
        setGroupname(groupData.groupsName[0]);
      } else {
        resGroups = await getUserGroups(user.id);
        console.log("groupId", groupId);
        //  그룹 이름 초기화
        if (groupId) {
          const g_name = resGroups.find((g) => g.id === groupId);
          console.log(g_name);
          if (g_name) {
            console.log("g_name", g_name);
            setGroupname(g_name.group_name);
          } else {
            setGroupId(resGroups[0]?.id ?? null);
            setGroupname(resGroups[0]?.group_name ?? "");
          }
        } else {
          setGroupId(resGroups[0]?.id ?? null);
          setGroupname(resGroups[0]?.group_name ?? "");
        }
      }
      setGroups(resGroups);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  useEffect(() => {
    fetchGroups();
    console.log(groupName);
  }, []);

  // ------------------------------------
  // select에서 groupId와 group_name set
  // ------------------------------------
  const handleSelectChange = (e) => {
    const val = e.target.value ? Number(e.target.value) : null;
    console.log("groupId", val);
    setGroupId(val);

    // group_name 저장
    if (!user) {
      setGroupname(groupData.groupsName[val]);
    } else {
      const selectedGroup = groups.find((g) => g.id === val);
      setGroupname(selectedGroup?.group_name ?? "");
    }
  };

  // ------------------------------------
  // 그룹 이름 수정
  // ------------------------------------
  const handlePatchGroupName = async () => {
    console.log("handlePatchGroupName");
    if (!user) {
      // 해당 index의 이름 재정의
      groupData.groupsName[groupId] = groupName;
      localStorage.setItem("groupData", JSON.stringify(groupData));
    } else {
      await setGroupName(groupId, groupName, user.id);
    }
    await fetchGroups();
  };

  // 그룹 삭제 (로그인 시만 사용)
  const handleDelete = async () => {
    if (confirm("이 그룹을 삭제하겠습니까?")) {
      const deleted = await deleteGroup(groupId);
      setGroupId(null);
      if (deleted) {
        console.log("삭제 됨");
        await fetchGroups();
      }
    }
  };

  return (
    <Layout title="Groups">
      <p>Groups</p>

      {/* 사용자의 그룹 출력 */}
      <select value={groupId} onChange={handleSelectChange}>
        {/* 로그인 상태면 id, 아니면 index */}
        {groups.map((group, idx) => (
          <option key={idx} value={user ? group.id : idx}>
            {user ? group.group_name : group}
          </option>
        ))}
        {/* 로그인 시 가능 */}
        <option key="null" value="">
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

      {/* 그룹 삭제 (로그인시 가능) */}
      {groupId != null && user && (
        <button onClick={handleDelete}>그룹 삭제</button>
      )}

      {/* 해당 그룹의 채널 */}
      <GroupChannels groupId={groupId} />
    </Layout>
  );
}

export default GroupsPage;
