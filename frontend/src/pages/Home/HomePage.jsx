import Layout from "@/layouts/Layout";
import DayContainer from "./DayContainer";
import { useState } from "react";
import { getGroupChannels } from "@/api/groupsApi";
import { useEffect } from "react";

function Home() {
  const [groupId, setGroupId] = useState(1);
  const [channels, setChannels] = useState([]);

  // 채널 조회
  const fetchChannels = async () => {
    const resChannels = await getGroupChannels(groupId);
    console.log("groupId:", groupId, " channel:", resChannels);
    setChannels(resChannels);
  };

  // HomeFiltering에서 groupId 선택후 셋 -> 채널 조회
  const handleGroup = (g_id) => {
    setGroupId(g_id);
    if (g_id) {
      fetchChannels();
    }
  };
  useEffect(() => {
    fetchChannels();
  }, []);

  return (
    <Layout title="Home" groupId={groupId} onFilterChange={handleGroup}>
      <p>home</p>
      <DayContainer day="어제" />
      <hr />
      <DayContainer day="오늘" />
      <hr />
      <DayContainer day="내일" />
    </Layout>
  );
}

export default Home;
