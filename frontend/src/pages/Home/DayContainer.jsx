import VideoCard from "./VideoCard";

function DayContainer({ day, videos, isMobile }) {
  // console.log(day, ": videos", videos);
  const cl = {
    yesterday: "#d8f4ffff",
    today: "#dbd8ffff",
    tomorrow: "#fde8ffff",
  };
  const len = videos.length;
  console.log(len);
  return (
    <div
      style={{
        margin: 5,
        padding: 3,
        backgroundColor: cl[day],
        borderRadius: "6px",
      }}
    >
      <div className="days">
        <h2>
          {day} ({videos[0]?.date})
        </h2>
      </div>
      {/* 영상의 갯수 만큼 카드컨테이너 출력 */}
      {len === 1 ? (
        <VideoCard
          video={null}
          key="x"
          isMobile={isMobile}
          isNull={true}
        />
      ) : (
        videos
          .slice(1)
          .map((video) => (
            <VideoCard
              video={video}
              key={video.title}
              isMobile={isMobile}
              isNull={false}
            />
          ))
      )}
    </div>
  );
}

export default DayContainer;
