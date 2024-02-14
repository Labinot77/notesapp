import { CreditCard, Home, PersonStandingIcon, PresentationIcon, Settings } from "lucide-react";

export const navItems = [
  {
    name: 'Home', 
    href: "/dashboard", 
    icon: Home,
  },
  {
    name: 'My Tickets', 
    href: "/dashboard/mytickets", 
    icon: Home,
  },
  {
    name: 'Profiles', 
    href: "/dashboard/profiles", 
    icon: PresentationIcon,
  },
  {
    name: 'Settings', 
    href: "/dashboard/settings",
     icon: Settings,
  },
  // {
  //   name: 'Billing', 
  //   href: "/dashboard/billing", 
  //   icon: CreditCard,
  // }
]

export const typeColor = [
  {
    name: "Green",
    value: "theme-green"
  },
  {
    name: "Blue",
    value: "theme-blue"
  },
  {
    name: "Violet",
    value: "theme-violet"
  },
  {
    name: "Yellow",
    value: "theme-yellow"
  },
  {
    name: "Orange",
    value: "theme-orange"
  },
  {
    name: "Red",
    value: "theme-red"
  },
  {
    name: "Rose",
    value: "theme-rose"
  }
]

export const TypeOfNote = [
  {
    name: "Work"
  },
  {
    name: "Fitnes"
  },
  {
    name: "Personal"
  },
  {
    name: "Bussiness"
  },
  {
    name: "Other"
  },
]

