import { useEffect, useState } from "react";
import { getChannelsIdANDGroup, postGroupsChannel } from "@/api/groupsApi";
import { useAuthStore } from "@/store/auth";

import Button from "@mui/material/Button";

function ModalGroup({ channel, onClose }) {
  const [groups, setGroups] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [channel_id, setChannel_id] = useState();
  const user = useAuthStore((state) => state.user);
  const groupData = JSON.parse(localStorage.getItem("groupData"));

  // 1) 사용자 그룹 조회
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        let resGroups = null;
        if (!user) {
          resGroups = Object.values(groupData).map((row) =>
            row.filter((item) => item?.channelId != channel.snippet.channelId)
          );
          setGroups(resGroups.slice(0, 4));
        } else {
          console.log(channel);
          resGroups = await getChannelsIdANDGroup(user.id, channel);
          console.log(resGroups);
          setGroups(resGroups.groups);
          setChannel_id(resGroups.channel_id);
        }
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };
    fetchGroups();
  }, [user]);

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
    if (!user) {
      selectedGroups.forEach((group) => {
        groupData[group].push({
          channelTitle: channel.snippet.channelTitle,
          channelId: channel.snippet.channelId,
          img: channel.snippet.thumbnails.medium.url,
        });
        localStorage.setItem("groupData", JSON.stringify(groupData));
      });

      onClose();
    } else {
      const res = await postGroupsChannel(selectedGroups, channel_id);
      console.log(res.success);
      if (res.success) {
        // 모달 닫기
        onClose();
      }
    }
  };

  return (
    <>
      <p>Group에 추가</p>

      {groups.length === 0 && <p>추가 가능한 그룹 없음</p>}
      {groups.length > 0 && (
        <div>
          {/* 사용자의 그룹 출력 */}
          {groups.map((group, idx) => (
            <div key={idx}>
              <input
                type="checkbox"
                id={user ? group.id : idx}
                value={user ? group.id : idx}
                onChange={handleCbChange}
                // selectedGroups에 id가 있으면 true
                checked={selectedGroups.includes(user ? group.id : idx)}
              />
              <label>
                {user ? group.group_name : groupData.groupsName[idx]}
              </label>
            </div>
          ))}
          <Button
            size="medium"
            variant="outlined"
            sx={{
              minWidth: "auto",
              padding: "0px 8px",
              marginLeft: "75%",
            }}
            onClick={handleSubmit}
          >
            추가
          </Button>
        </div>
      )}
    </>
  );
}

export default ModalGroup;
