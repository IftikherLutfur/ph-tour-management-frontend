import { lazy } from "react";
const Statistics = lazy(()=>import("../pages/statistic"))
import type { ISidebarItem } from "../types";

export const adminSidebarItems: ISidebarItem[] = [
   
    {
      title: "Dashboard",
      items: [
        {
          title: "Statistic",
          url: "/admin/statistic",
          component: Statistics
        },
      ], 
    },
    // {
    //   title: "Tour Management",
    //   items: [
    //     {
    //       title: "Add tour type",
    //       url: "/admin/add-tour-type",
    //       component:
    //     },
    //     {
    //       title: "Add tour",
    //       url: "/admin/add-tour",
    //       component:
    //     },
    //   ], 
    // }
  
  ]