import { lazy } from "react";
const Statistics = lazy(()=>import("../pages/admin/statistic"))
import type { ISidebarItem } from "../types";
import {AddTourType} from "../pages/admin/AddTourType";
import AddTour from "../pages/admin/AddTour";

export const adminSidebarItems: ISidebarItem[] = [
   
    {
      title: "Dashboard",
      items: [
        {
          title: "Statistic",
          url: "/admin/statistic",
          component: Statistics
        },
        {
          title: "Add Tour Type",
          url: "/admin/addTourType",
          component: AddTourType
        },
        {
          title: "Add Tour",
          url: "/admin/addTour",
          component: AddTour
        },
      ], 
    },
    
  
  ]