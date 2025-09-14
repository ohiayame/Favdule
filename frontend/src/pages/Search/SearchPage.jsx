import Layout from "@/layouts/Layout";
import { useState } from "react";
import { getChannels } from "@/api/channelsApi";

function SearchPage() {
  const [q, setQ] = useState("");
  const [channels, setChannels] = useState([]);

  const fetchChannels = async () => {
    console.log(q);
    const resChannels = await getChannels(q);
    console.log(resChannels);
    setChannels(resChannels);
  };

  return (
    <Layout title="Groups">
      <p>Search</p>

      {/* 채널 검색 */}
      <input type="text" value={q} onChange={(e) => setQ(e.target.value)} />
      <button onClick={fetchChannels}>갬색</button>

      {/* 검색 결과 출력 */}
      {channels && (
        <ul>
          {channels.map((channel) => (
            <li key={channel.id.channelId}>
              <img
                src={channel.snippet.thumbnails.medium.url}
                alt={channel.snippet.title}
              />
              <p>{channel.snippet.title}</p>
            </li>
          ))}
        </ul>
      )}

      {/* 사용자가 구독하고 있는 채널 출력 */}
    </Layout>
  );
}

export default SearchPage;
