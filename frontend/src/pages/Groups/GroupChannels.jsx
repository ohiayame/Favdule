import { useState, useEffect } from "react";
import { getGroupChannels, deleteChannel } from "@/api/groupsApi";
import { Navigate } from "react-router-dom";

function GroupChannels({ groupId }) {
  const [channels, setChannels] = useState([]);
  const [isClick, setClick] = useState(false);

  // 해당 그룹의 채널 조회
  const fetchChannels = async () => {
    const resChannels = await getGroupChannels(groupId);
    console.log(resChannels);
    setChannels(resChannels);
  };

  useEffect(() => {
    fetchChannels();
  }, [groupId]);

  // 채널 삭제
  const handleDeleteChannel = async (channel_id) => {
    const isDelete = await deleteChannel(groupId, channel_id);
    console.log(isDelete);
    if (isDelete) {
      fetchChannels();
    }
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
            {channels.map((channel) => (
              <tr key={channel.id}>
                <td>
                  <img src={channel.img} alt={channel.channel_name} />
                </td>
                <td>{channel.channel_name}</td>
                <td>
                  <button onClick={() => handleDeleteChannel(channel.id)}>
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
