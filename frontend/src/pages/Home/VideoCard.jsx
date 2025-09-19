// 하나의 영상 정보 출력 카드
function VideoCard({ video }) {
  // console.log("video", video);
  return (
    <div style={{ backgroundColor: "#fbffdaff" }}>
      {/* 제목 */}
      <h3>{video.title}</h3>
      {/* 시간 추가예정 */}
      {/* 썸네일 */}
      <img src={video.thumbnails.medium.url} alt={video.title} />
    </div>
  );
}

export default VideoCard;
