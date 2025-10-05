import Sidebar from "@/layouts/Sidebar";
import HomeFiltering from "@/pages/Home/HomeFiltering";

import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";

function Header({ title, groupId, onFilterChange }) {
  return (
    <header>
      <Grid container sx={{ justifyContent: "center" }}>
        <Grid container size={6}>
          <Tooltip placement="left-start">
            <h1>{title}</h1>
          </Tooltip>
        </Grid>
        <Grid container justifyContent="flex-end" alignItems="center" size={6}>
          {title === "Home" && (
            <HomeFiltering groupId={groupId} onFilterChange={onFilterChange} />
          )}
          <Tooltip placement="right-start">
            <Sidebar />
          </Tooltip>
        </Grid>
      </Grid>
    </header>
  );
}

export default Header;
