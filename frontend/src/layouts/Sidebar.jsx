import { useState } from "react";
import { Link } from "react-router-dom";
import { RouterData } from "@/routes/RouterData";
import Login from "@/components/Login";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";

function Sidebar() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      {/* 로그인 정보 */}
      {/* <Login />
      <Divider /> */}
      <nav>
        <List>
          {RouterData.map(
            (route, idx) =>
              route.title && (
                <ListItem key={idx} disablePadding>
                  <ListItemButton component={Link} to={route.link}>
                    <ListItemIcon>{route.icon}</ListItemIcon>
                    <ListItemText primary={route.title} />
                  </ListItemButton>
                </ListItem>
              )
          )}
        </List>
      </nav>
    </Box>
  );

  return (
    <div>
      <div onClick={toggleDrawer(true)}>
        <MenuIcon fontSize="large" />
      </div>

      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}

export default Sidebar;
