import VideoCard from "./VideoCard";

function DayContainer({ day }) {
  return (
    <div style={{ backgroundColor: "#d8ffe4ff" }}>
      날짜 - {day} -
      <VideoCard />
    </div>
  );
}

export default DayContainer;
