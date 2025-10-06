import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Box from "@mui/material/Box";

// 하나의 영상 정보 출력 카드
function VideoCard({ video, isMobile }) {
  // console.log("video", video);
  const Vtime = video.time.time;
  return (
    <Card
      sx={
        isMobile
          ? { display: "flex", margin: 1, height: "85px" }
          : { margin: 1 }
      }
      onClick={() =>
        window.open(`https://www.youtube.com/watch?v=${video.id}`, "_blank")
      }
    >
      <CardActionArea>
        {!isMobile && (
          // {/* 썸네일 */}
          <CardMedia
            component="img"
            image={video.thumbnails}
            alt={video.title}
            sx={{
              aspectRatio: "16/9",
            }}
          />
        )}

        <CardContent sx={{ flex: 1, padding: 0.5 }}>
          {!isMobile ? (
            <>
              {/* 시간 */}
              <Typography gutterBottom variant="h6" sx={{ margin: "0" }}>
                {Vtime}
              </Typography>
              {/* 채널 명 */}
              <Typography gutterBottom variant="caption" noWrap>
                {video.channelTitle}
              </Typography>
            </>
          ) : (
            <>
              <Typography gutterBottom variant="subtitle2" sx={{ margin: "0" }}>
                {Vtime}
              </Typography>
              <Typography
                gutterBottom
                variant="caption"
                sx={{ margin: "0" }}
                noWrap
              >
                {video.channelTitle}
              </Typography>
            </>
          )}

          {/* 내용 */}
          <Typography
            variant="body2"
            sx={
              isMobile
                ? {
                    fontSize: "12px",
                    color: "text.secondary",
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                  }
                : {
                    padding: 0,
                    color: "text.secondary",
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                  }
            }
          >
            {video.title}
          </Typography>
        </CardContent>
      </CardActionArea>

      {isMobile && (
        <Box
          sx={{
            flex: "0 0 120px",
            minWidth: 120,
            maxWidth: 120,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: "3px",
          }}
        >
          {/* 썸네일 */}
          <CardMedia
            component="img"
            image={video.thumbnails}
            alt={video.title}
            sx={{
              aspectRatio: "16/9",
            }}
          />
        </Box>
      )}
    </Card>
  );
}

export default VideoCard;
