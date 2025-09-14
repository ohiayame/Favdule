import { useState } from "react";
import { getGroupChannels } from "@/api/groupsApi";
import { useEffect } from "react";

function GroupChannels({ groupId }) {
  const [channels, setChannels] = useState([]);

  // 해당 그룹의 채널 조회
  useEffect(() => {
    const fetchChannels = async () => {
      const resChannels = await getGroupChannels(groupId);
      console.log(resChannels);
      setChannels(resChannels);
    };
    fetchChannels();
  }, [groupId]);

  return (
    <div>
      {/* 채널 출력 */}
      {channels && (
        <ul>
          {channels.map((channel) => (
            <li key={channel.id}>
              <p>{channel.channel_name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default GroupChannels;
