import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// 하나의 영상 정보 출력 카드
function VideoCard({ video, isMobile, isNull }) {
  console.log("isNull", isNull);
  const Vtime = video?.time.time;
  return (
    <Card
      sx={
        isMobile
          ? { display: "flex", margin: 1, height: "85px", minWidth: 0 }
          : { margin: 1 }
      }
      onClick={() =>
        window.open(`https://www.youtube.com/watch?v=${video.id}`, "_blank")
      }
    >
      {!isMobile && (
        // {/* 썸네일 */}
        <CardMedia
          component="img"
          image={isNull ? "/favdule_logo.png" : video.thumbnails}
          alt={isNull ? "x" : video.title}
          sx={
            isNull
              ? {
                  aspectRatio: "16/9",
                  objectFit: "contain",
                }
              : {
                  aspectRatio: "16/9",
                }
          }
        />
      )}

      <CardContent sx={{ flex: 1, padding: 0.5, minWidth: 0 }}>
        {isNull ? (
          <Typography gutterBottom variant="body1" sx={{ margin: "0" }}>
            영상이 없습니다.
          </Typography>
        ) : (
          <>
            {!isMobile ? (
              <>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {/* 시간 */}
                  <Typography gutterBottom variant="h6" sx={{ margin: "0" }}>
                    {Vtime}
                  </Typography>

                  <CardMedia
                    component="img"
                    image={"/yt_icon_red_digital.png"}
                    alt="youtube logo"
                    sx={{ height: "30px", width: "auto" }}
                  />
                </Box>

                {/* 채널 명 */}
                <Typography
                  gutterBottom
                  variant="caption"
                  sx={{
                    margin: "0",
                    display: "block",
                  }}
                  noWrap
                >
                  {video.channelTitle}
                </Typography>
              </>
            ) : (
              <>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {/* 시간 */}
                  <Typography
                    gutterBottom
                    variant="subtitle"
                    sx={{ margin: "0" }}
                  >
                    {Vtime}
                  </Typography>

                  <CardMedia
                    component="img"
                    image={"/yt_icon_red_digital.png"}
                    alt="youtube logo"
                    sx={{ height: "25px", width: "auto" }}
                  />
                </Box>
                <Typography
                  gutterBottom
                  variant="caption"
                  sx={{
                    margin: "0",
                    display: "block",
                  }}
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
          </>
        )}
      </CardContent>

      {isMobile && (
        <Box
          sx={{
            flexShrink: 0,
            flex: "0 0 120px",
            width: 120,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: "3px",
          }}
        >
          {/* 썸네일 */}
          <CardMedia
            component="img"
            image={isNull ? "/favdule_logo.png" : video.thumbnails}
            alt={isNull ? "x" : video.title}
            sx={
              isNull
                ? {
                    aspectRatio: "14/9",
                    objectFit: "contain",
                  }
                : { aspectRatio: "16/9" }
            }
          />
        </Box>
      )}
    </Card>
  );
}

export default VideoCard;
