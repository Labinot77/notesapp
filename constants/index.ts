import { CreditCard, Home, PresentationIcon, Settings } from "lucide-react";

export const navItems = [
  {
    name: 'Home', 
    href: "/dashboard", 
    icon: Home,
    role: "User"
  },
  {
    name: 'My Tickets', 
    href: "/dashboard/mytickets", 
    icon: Home,
    role: "User"
  },
  {
    name: 'Profiles', 
    href: "/dashboard/profiles", 
    icon: PresentationIcon,
    role: "User"
  },
  {
    name: 'Settings', 
    href: "/dashboard/settings",
    icon: Settings,
    role: "User"
  },
  {
    name: 'Admin', 
    href: "/dashboard/admin", 
    icon: CreditCard,
    role: "Admin"
  }
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

