import Layout from "@/layouts/Layout";
import DayContainer from "./DayContainer";
import { useState, Fragment } from "react";
import { useVideosStore } from "@/store/video";

import { useTheme, useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [groupId, setGroupId] = useState(null);
  const { getVideos } = useVideosStore();
  const dayList = ["yesterday", "today", "tomorrow"];

  // 영상 정보 저장
  const [videos, setVideos] = useState({
    yesterday: [],
    today: [],
    tomorrow: [],
  });

  // 채널의 영상 나눠서 조회 후 셋 (어제, 오늘, 내일)
  const fetchVideos = async (g_id = groupId) => {
    // store로 관리 새로고침하면 다시 로딩됨
    const { yesterday, today, tomorrow } = await getVideos(g_id);
    setVideos({ yesterday, today, tomorrow });
  };

  // HomeFiltering에서 groupId 선택후 셋 -> 채널 조회
  const handleGroup = (g_id) => {
    setGroupId(g_id);
    fetchVideos(g_id);
  };

  return (
    <Layout title="Home" groupId={groupId} onFilterChange={handleGroup}>
      <Typography
        gutterBottom
        variant="body2"
        sx={{
          marginTop: "5px",
          padding: 0,
          color: "text.secondary",
        }}
      >
        Youtuber를 등록해서 스케줄을 확인해 볼까요?
      </Typography>

      <Grid
        container
        rowSpacing={1}
        sx={{
          flexDirection: { xs: "column", sm: "row" }, // xs에서는 세로, sm 이상에서는 가로
          justifyContent: "space-evenly",
        }}
      >
        {dayList.map((d, idx) => (
          <Fragment key={idx}>
            <Grid
              item
              xs={isMobile ? 12 : false}
              sx={!isMobile ? { flex: 1 } : { maxWidth: "100%" }}
            >
              <DayContainer day={d} videos={videos[d]} isMobile={isMobile} />
            </Grid>
            {idx !== 2 && (
              <Divider
                orientation={isMobile ? "horizontal" : "vertical"}
                flexItem
              />
            )}
          </Fragment>
        ))}
      </Grid>
    </Layout>
  );
}

export default Home;
