import VideoCard from "./VideoCard";

function DayContainer({ day, videos }) {
  console.log(day, ": videos", videos);
  return (
    <div style={{ backgroundColor: "#d8ffe4ff" }}>
      <p>
        {day} - {videos[0]?.date} -
      </p>
      {/* 영상의 갯수 만큼 카드컨테이너 출력 */}
      {videos &&
        videos
          .slice(1)
          .map((video) => <VideoCard video={video} key={video.title} />)}
    </div>
  );
}

export default DayContainer;
