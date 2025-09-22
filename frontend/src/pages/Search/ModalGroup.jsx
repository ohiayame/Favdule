import { useEffect, useState } from "react";
import { getChannelsIdANDGroup, postGroupsChannel } from "@/api/groupsApi";

function ModalGroup({ channel, onClose }) {
  const [groups, setGroups] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [channel_id, setChannel_id] = useState();
  const id = 1;

  // 1) 사용자 그룹 조회
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const resGroups = await getChannelsIdANDGroup(id, channel);
        // console.log(resGroups);
        setGroups(resGroups.groups);
        setChannel_id(resGroups.channel_id);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };
    fetchGroups();
  }, [id]);

  // 2) 추가하는 그룹 설정
  const handleCbChange = (e) => {
    // checkbox의 value값
    const value = Number(e.target.value);
    // checked가 true면 setSelectedGroups에 추가
    if (e.target.checked) {
      setSelectedGroups((prev) => [...prev, value]);
      console.log("추가!!!");
    } else {
      // value값 외의 값만 저장
      setSelectedGroups((prev) => prev.filter((id) => id !== value));
      console.log("삭제");
    }
  };

  // 3) 지정한 그룹에 채널 추가
  const handleSubmit = async () => {
    console.log("선택된 그룹:", selectedGroups);
    const res = await postGroupsChannel(selectedGroups, channel_id);
    console.log(res.success);
    if (res.success) {
      // 모달 닫기
      onClose();
    }
  };

  return (
    <>
      <p>Groups</p>

      {groups.length === 0 && <p>추가 가능한 그룹 없음</p>}
      <div>
        {/* 사용자의 그룹 출력 */}
        {groups.map((group) => (
          <div key={group.id}>
            <input
              type="checkbox"
              id={group.id}
              value={group.id}
              onChange={handleCbChange}
              // selectedGroups에 id가 있으면 true
              checked={selectedGroups.includes(group.id)}
            />
            <label>{group.group_name}</label>
          </div>
        ))}
        <button onClick={handleSubmit}>추가</button>
      </div>
    </>
  );
}

export default ModalGroup;
