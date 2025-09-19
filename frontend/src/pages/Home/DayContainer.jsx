import VideoCard from "./VideoCard";

function DayContainer({ day, videos }) {
  console.log(day, ": videos", videos);
  return (
    <div style={{ backgroundColor: "#d8ffe4ff" }}>
      <p>날짜 - {day} -</p>
      {/* 영상의 갯수 만큼 카드컨테이너 출력 */}
      {videos && videos.map((video) => <VideoCard video={video.snippet} />)}
    </div>
  );
}

export default DayContainer;
