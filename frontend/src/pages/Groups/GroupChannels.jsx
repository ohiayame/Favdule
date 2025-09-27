import { useState } from "react";
import { getGroupChannels, deleteChannel } from "@/api/groupsApi";
import { useEffect } from "react";

function GroupChannels({ groupId }) {
  const [channels, setChannels] = useState([]);

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

  return (
    <div>
      {/* 채널 출력 */}
      {channels && (
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
      )}
    </div>
  );
}

export default GroupChannels;
