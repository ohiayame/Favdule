// 하나의 영상 정보 출력 카드
function VideoCard({ video }) {
  // console.log("video", video);
  const Vtime = video.time.time;
  return (
    <div style={{ backgroundColor: "#fbffdaff" }}>
      {/* 제목 */}
      <h3>
        {Vtime} -{video.title}
      </h3>
      {/* 썸네일 */}
      <p>{video.channelTitle}</p>
      <img src={video.thumbnails} alt={video.title} />
    </div>
  );
}

export default VideoCard;
