import Layout from "@/layouts/Layout";
import DayContainer from "./DayContainer";
import { useState } from "react";
import { getVideos } from "@/api/groupsApi";
import { useAuthStore } from "@/store/auth";

import { useTheme, useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [groupId, setGroupId] = useState(null);
  const user = useAuthStore((state) => state.user);
  const groupData = JSON.parse(localStorage.getItem("groupData"));
  const dayList = ["yesterday", "today", "tomorrow"];

  // 영상 정보 저장
  const [videos, setVideos] = useState({
    yesterday: [],
    today: [],
    tomorrow: [],
  });

  // 채널의 영상 나눠서 조회 후 셋 (어제, 오늘, 내일)
  const fetchVideos = async (g_id = groupId) => {
    // console.log("fetchVideos", groupData[g_id]);
    let res = null;
    if (user) {
      res = await getVideos(g_id, null);
    } else {
      res = await getVideos(null, groupData[g_id]);
    }
    const { yesterday, today, tomorrow } = res;
    // console.log("yesterday", g_id);

    // TEST =========================================================
    // localStorage.setItem(
    //   "videos",
    //   JSON.stringify({ yesterday, today, tomorrow })
    // );
    // const storedVideos = JSON.parse(localStorage.getItem("videos"));
    // const { yesterday: y, today: t, tomorrow: m } = storedVideos;
    // setVideos({
    //   yesterday: y,
    //   today: t,
    //   tomorrow: m,
    // });
    // ===============================================================
    setVideos({
      yesterday: yesterday,
      today: today,
      tomorrow: tomorrow,
    });
  };

  // HomeFiltering에서 groupId 선택후 셋 -> 채널 조회
  const handleGroup = (g_id) => {
    setGroupId(g_id);
    // console.log(g_id);

    fetchVideos(g_id);
  };
  // useEffect(() => {
  //   fetchVideos();
  // }, [user]);

  return (
    <Layout title="Home" groupId={groupId} onFilterChange={handleGroup}>
      <Grid
        container
        rowSpacing={1}
        sx={{
          justifyContent: "space-evenly",
        }}
      >
        {dayList.map((d, idx) => (
          <>
            <Grid
              item
              xs={isMobile ? 12 : false}
              sx={!isMobile ? { flex: 1 } : { maxWidth: "100%" }}
            >
              <DayContainer day={d} videos={videos[d]} isMobile={isMobile} />
            </Grid>
            {idx != 2 && <Divider orientation="vertical" flexItem />}
          </>
        ))}
      </Grid>
    </Layout>
  );
}

export default Home;
