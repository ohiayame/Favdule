import HomePage from "@/pages/Home/HomePage";
import GroupsPage from "@/pages/Groups/GroupsPage";
import SearchPage from "@/pages/Search/SearchPage";

export const RouterData = [
  {
    title: "Home",
    element: <HomePage />,
    link: "/",
  },
  {
    title: "Groups",
    element: <GroupsPage />,
    link: "/groups",
  },
  {
    title: "Search",
    element: <SearchPage />,
    link: "/search",
  },
];
