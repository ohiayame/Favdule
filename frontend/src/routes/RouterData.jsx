import HomePage from "@/pages/Home/HomePage";
import GroupsPage from "@/pages/Groups/GroupsPage";
import SearchPage from "@/pages/Search/SearchPage";
import CallbackPage from "@/components/CallbackPage";

import HomeIcon from "@mui/icons-material/Home";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";

export const RouterData = [
  {
    // main
    title: "Home",
    element: <HomePage />,
    link: "/",
    icon: <HomeIcon />,
  },
  {
    // grouping
    title: "Groups",
    element: <GroupsPage />,
    link: "/groups",
    icon: <ListAltIcon />,
  },
  {
    // Searching Channels
    title: "Search",
    element: <SearchPage />,
    link: "/search",
    icon: <ManageSearchIcon />,
  },
  {
    // GoogleLogin callback
    element: <CallbackPage />,
    link: "/callback",
  },
];
