import { createBrowserRouter } from "react-router";
import App from "../App";
import about from "../pages/about";
import Statistics from "../pages/statistic";
import Login from "../pages/login";
import Register from "../pages/register";
import { Verify } from "../pages/verify";
import  DashboardLayout  from "../components/layout/DashboardLayout";
import { generateRoutes } from "../utils/generateRoute";
import { adminSidebarItems } from "./adminSidebarItems";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: about,
        path: "/about"
      }
    ]
  },

  // Admin route
  {
    Component: DashboardLayout,
    path: "/admin",
    children: [...generateRoutes(adminSidebarItems)]
  },

  {
    Component: DashboardLayout,
    path: "/user",
    children: [
      {
        Component: Statistics,
        path: "tour-list"
      }
    ]
  },

  {
    Component: Register,
    path: "/register",
  },
  {
    Component: Login,
    path: "/login",
  },
  {
    Component: Verify,
    path: "/verify",
  },

]);
