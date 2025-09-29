import Layout from "@/layouts/Layout";
import { useState, useEffect } from "react";
import { getChannels } from "@/api/channelsApi";
import Modal from "react-modal";
import ModalGroup from "@/pages/Search/ModalGroup";
import { useSubscStore } from "@/store/auth";

function SearchPage() {
  const [q, setQ] = useState(""); // 검색어
  const [channels, setChannels] = useState([]); // 조회한 채널
  const [isOpen, setIsOpen] = useState(false); // 모달 상태
  const [selectedChannel, setSelectedChannel] = useState();

  const subsc = useSubscStore((state) => state.subsc);
  console.log(subsc);

  // 채널 조회
  const fetchChannels = async () => {
    if (q == "") setChannels(subsc);
    else {
      const resChannels = await getChannels(q);

      console.log(resChannels);
      setChannels(resChannels);
    }
  };

  useEffect(() => {
    fetchChannels();
  }, [subsc]);

  // modal 닫기
  const handleClose = () => setIsOpen(false);

  return (
    <Layout title="Groups">
      <p>Search</p>

      {/* 채널 검색 */}
      <input type="text" value={q} onChange={(e) => setQ(e.target.value)} />
      <button onClick={fetchChannels}>갬색</button>

      {/* 검색 결과 출력 */}
      <div>
        {channels && channels.length > 0 && (
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
                <tr key={channel.id?.channelId ?? channel.id}>
                  <td>
                    <img
                      src={channel.snippet.thumbnails.medium.url}
                      alt={channel.snippet.title}
                    />
                  </td>
                  <td>{channel.snippet.title}</td>
                  <td>
                    <button
                      onClick={() => {
                        setSelectedChannel(channel);
                        setIsOpen(true);
                      }}
                    >
                      추가
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* 그룹에 추가 */}
      <Modal isOpen={isOpen}>
        {selectedChannel && (
          <ModalGroup channel={selectedChannel} onClose={handleClose} />
        )}
        <button onClick={handleClose}>close</button>
      </Modal>
    </Layout>
  );
}

export default SearchPage;
