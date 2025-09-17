import Sidebar from "@/layouts/Sidebar";
import HomeFiltering from "@/pages/Home/HomeFiltering";

function Header({ title, groupId, onFilterChange }) {
  return (
    <header style={{ backgroundColor: "#daeeffff" }}>
      <h1>{title}</h1>

      {title === "Home" && (
        <HomeFiltering groupId={groupId} onFilterChange={onFilterChange} />
      )}

      <Sidebar />
    </header>
  );
}

export default Header;
