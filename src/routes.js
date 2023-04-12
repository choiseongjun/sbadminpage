import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import TableList from "views/TableList.js";
import ClientList from "views/ClientList.js";
import Boards from "views/Boards";
import BoardWrite from "views/BoardWrite";
import BoardDetail from "views/BoardDetail";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "대시보드",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/table",
    name: "히스토리",
    icon: "nc-icon nc-notes",
    component: TableList,
    layout: "/admin",
  },
  {
    path: "/clientlist",
    name: "고객리스트",
    icon: "nc-icon nc-notes",
    component: ClientList,
    layout: "/admin",
  },
  {
    path: "/boards",
    name: "게시판",
    icon: "nc-icon nc-notes",
    component: Boards,
    layout: "/admin",
  },
  {
    name: "글쓰기",
    path: "/boards/write",
    component: BoardWrite,
    layout: "/admin/detail",
  },
  {
    name: "글쓰기",
    path: "/boards/:detail",
    component: BoardDetail,
    layout: "/admin/detail",
  },
];

export default dashboardRoutes;
