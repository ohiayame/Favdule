import Layout from "@/layouts/Layout";
import { useState } from "react";
import { getChannels } from "@/api/channelsApi";
import Modal from "react-modal";
import ModalGroup from "@/pages/Search/ModalGroup";

function SearchPage() {
  const [q, setQ] = useState(""); // 검색어
  const [channels, setChannels] = useState([]); // 조회한 채널
  const [isOpen, setIsOpen] = useState(false); // 모달 상태
  const [selectedChannel, setSelectedChannel] = useState();

  // 채널 조회
  const fetchChannels = async () => {
    // console.log(q);
    const resChannels = await getChannels(q);

    // console.log(resChannels);
    setChannels(resChannels);
  };

  // modal 닫기
  const handleClose = () => setIsOpen(false);

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
              <button
                onClick={() => {
                  setSelectedChannel(channel);
                  setIsOpen(true);
                }}
              >
                추가
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* 그룹에 추가 */}
      <Modal isOpen={isOpen}>
        {selectedChannel && (
          <ModalGroup channel={selectedChannel} onClose={handleClose} />
        )}
        <button onClick={handleClose}>close</button>
      </Modal>

      {/* 사용자가 구독하고 있는 채널 출력 (SubscChannel.jsx) */}
    </Layout>
  );
}

export default SearchPage;
