import Layout from "@/layouts/Layout";
import DayContainer from "./DayContainer";
import { useState, useEffect } from "react";
import { getVideos } from "@/api/groupsApi";
import { useAuthStore } from "@/store/auth";

function Home() {
  const [groupId, setGroupId] = useState(null);
  const user = useAuthStore((state) => state.user);
  const groupData = JSON.parse(localStorage.getItem("groupData"));

  // 영상 정보 저장
  const [yesterday, setYesterday] = useState([]);
  const [today, setToday] = useState([]);
  const [tomorrow, setTomorrow] = useState([]);

  // 채널의 영상 나눠서 조회 후 셋 (어제, 오늘, 내일)
  const fetchVideos = async (g_id = groupId) => {
    console.log("fetchVideos", groupData[g_id]);
    let res = null;
    if (user) {
      res = await getVideos(g_id, null);
    } else {
      res = await getVideos(null, groupData[g_id]);
    }
    const { yesterday, today, tomorrow } = res;
    console.log("yesterday", g_id);
    setYesterday(yesterday);
    setToday(today);
    setTomorrow(tomorrow);
  };

  // HomeFiltering에서 groupId 선택후 셋 -> 채널 조회
  const handleGroup = (g_id) => {
    setGroupId(g_id);
    console.log(g_id);

    fetchVideos(g_id);
  };
  // useEffect(() => {
  //   fetchVideos();
  // }, [user]);

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
