import Layout from "@/layouts/Layout";
import DayContainer from "./DayContainer";

function Home() {
  return (
    <Layout title="Home">
      <p>home</p>
      <DayContainer day="어제" />
      <hr />
      <DayContainer day="오늘" />
      <hr />
      <DayContainer day="내일" />
    </Layout>
  );
}

export default Home;
