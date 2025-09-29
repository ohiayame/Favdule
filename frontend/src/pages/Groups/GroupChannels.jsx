import { useState, useEffect } from "react";
import { getGroupChannels, deleteChannel } from "@/api/groupsApi";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth";

function GroupChannels({ groupId }) {
  const user = useAuthStore((state) => state.user);
  const groupData = JSON.parse(localStorage.getItem("groupData"));
  const [channels, setChannels] = useState([]);
  const [isClick, setClick] = useState(false);

  // 해당 그룹의 채널 조회
  const fetchChannels = async () => {
    let resChannels = null;
    if (!user) {
      resChannels = groupData[groupId];
      console.log(groupData[groupId]);
    } else {
      resChannels = await getGroupChannels(groupId);
      console.log("resChannels", resChannels);
    }
    setChannels(resChannels);
  };

  useEffect(() => {
    fetchChannels();
  }, [groupId]);

  // 채널 삭제
  const handleDeleteChannel = async (channel_id) => {
    if (!user) {
      console.log(groupId, channel_id);
      groupData[groupId] = groupData[groupId].filter(
        (_, idx) => idx != channel_id
      );
      console.log(groupData);
      localStorage.setItem("groupData", JSON.stringify(groupData));
    } else {
      const isDelete = await deleteChannel(groupId, channel_id);
      console.log(isDelete);
    }
    fetchChannels();
  };

  const handleSearch = () => {
    setClick(true);
  };

  return (
    <div>
      {/* 채널 출력 */}
      {channels && channels.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>이미지</th>
              <th>이름</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            {channels.map((channel, idx) => (
              <tr key={idx}>
                <td>
                  <img src={channel.img} alt={channel.channelTitle} />
                </td>
                <td>{channel.channelTitle}</td>
                <td>
                  <button
                    onClick={() => handleDeleteChannel(user ? channel.id : idx)}
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>등록된 채널 없음</p>
      )}
      <button onClick={handleSearch}>채널 추가</button>
      {isClick && <Navigate to="/search" replace />}
    </div>
  );
}

export default GroupChannels;
