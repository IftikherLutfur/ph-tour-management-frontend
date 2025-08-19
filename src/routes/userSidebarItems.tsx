import { TourBooking } from "../pages/tourBooking";
import type { ISidebarItem } from "../types";

export const userSidebarItems: ISidebarItem[] = [
   
    {
      title: "History",
      items: [
        {
          title: "Tour Booking",
          url: "/user/booking",
          component: TourBooking
        },
      ], 
    },
  
  ]