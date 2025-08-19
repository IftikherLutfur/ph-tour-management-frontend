import { createBrowserRouter, Navigate } from "react-router";
import App from "../App";
import about from "../pages/about";
import Login from "../pages/login";
import Register from "../pages/register";
import { Verify } from "../pages/verify";
import DashboardLayout from "../components/layout/DashboardLayout";
import { generateRoutes } from "../utils/generateRoute";
import { adminSidebarItems } from "./adminSidebarItems";
import { userSidebarItems } from "./userSidebarItems";
import { withAuth } from "../utils/withAuth";
import { Unauthorized } from "../pages/Unauthorized";
import { role } from "../constants/role";
import type { TRole } from "../types";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: withAuth(about),
        path: "/about"
      }
    ]
  },

  // Admin route
  {
    Component: withAuth(DashboardLayout, role.admin as TRole),
    path: "/admin",
    children: [{ index: true, element: <Navigate to="/admin/statistic" /> }, ...generateRoutes(adminSidebarItems)]
  },

  {
    Component: withAuth(DashboardLayout, role.user as TRole),
    path: "/user",
    children: [...generateRoutes(userSidebarItems)]
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
  {
    Component: Unauthorized,
    path: "/unauthorize",
  },

]);
