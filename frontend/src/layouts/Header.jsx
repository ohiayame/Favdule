import Sidebar from "@/layouts/Sidebar";
import HomeFiltering from "@/pages/Home/HomeFiltering";
import { Link } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

function Header({ title, groupId, onFilterChange }) {
  return (
    <header>
      <Grid container sx={{ justifyContent: "center" }}>
        <Grid container size={6}>
          <Link to="/">
            <img
              src="/favdule_logo.png"
              alt="logo"
              style={{
                width: "auto",
                height: "34px",
                margin: "4px",
                mt: "30px",
              }}
            />
          </Link>
          <Tooltip placement="left-start">
            <h1>{title}</h1>
          </Tooltip>
        </Grid>
        <Grid container justifyContent="flex-end" alignItems="center" size={6}>
          <Link to="/help">
            <HelpOutlineIcon color="action" sx={{ marginRight: "4px" }} />
          </Link>
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
