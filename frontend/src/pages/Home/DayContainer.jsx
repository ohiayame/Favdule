import VideoCard from "./VideoCard";

function DayContainer({ day, videos, isMobile }) {
  console.log(day, ": videos", videos);
  return (
    <div style={{ margin: 5, backgroundColor: "#d8ffe4ff" }}>
      <h2>
        {day} ({videos[0]?.date})
      </h2>
      {/* 영상의 갯수 만큼 카드컨테이너 출력 */}
      {videos &&
        videos
          .slice(1)
          .map((video) => (
            <VideoCard video={video} key={video.title} isMobile={isMobile} />
          ))}
    </div>
  );
}

export default DayContainer;
