import Sidebar from "@/layouts/Sidebar";
import HomeFiltering from "@/pages/Home/HomeFiltering";

function Header({ title }) {
  return (
    <header style={{ backgroundColor: "#daeeffff" }}>
      <h1>{title}</h1>

      {title === "Home" && <HomeFiltering />}

      <Sidebar />
    </header>
  );
}

export default Header;
