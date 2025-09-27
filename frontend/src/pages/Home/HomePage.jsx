import Layout from "@/layouts/Layout";
import DayContainer from "./DayContainer";
import { useState } from "react";
import { getVideos } from "@/api/groupsApi";
import { useEffect } from "react";

function Home() {
  const [groupId, setGroupId] = useState(null);
  // 영상 정보 저장
  const [yesterday, setYesterday] = useState([]);
  const [today, setToday] = useState([]);
  const [tomorrow, setTomorrow] = useState([]);

  // 채널의 영상 나눠서 조회 후 셋 (어제, 오늘, 내일)
  const fetchVideos = async (g_id = groupId) => {
    const { yesterday, today, tomorrow } = await getVideos(g_id);
    console.log("yesterday", g_id);
    setYesterday(yesterday);
    setToday(today);
    setTomorrow(tomorrow);
  };

  // HomeFiltering에서 groupId 선택후 셋 -> 채널 조회
  const handleGroup = (g_id) => {
    setGroupId(g_id);
    if (g_id) {
      fetchVideos(g_id);
    }
  };
  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <Layout title="Home" groupId={groupId} onFilterChange={handleGroup}>
      <p>home</p>
      <DayContainer day="yesterday" videos={yesterday} />
      <hr />
      <DayContainer day="today" videos={today} />
      <hr />
      <DayContainer day="tomorrow" videos={tomorrow} />
    </Layout>
  );
}

export default Home;
