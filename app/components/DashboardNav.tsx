'use client'

import { navItems } from "@/constants"
import { cn } from "@/lib/utils"
import { revalidatePath } from "next/cache"
import Link from "next/link"
import { usePathname } from "next/navigation"
import prisma from "../lib/db"


const DashboardNav = ({ accountType }: { accountType: string}) => {
  const pathname = usePathname()
  
  return (
  //   <nav className='grid items-start  gap-2'>
  //   {navItems.map((item, i) => (
  //     // Check user role before rendering the link
  //       <Link key={i} href={item.href}>
  //         <span className={cn(
  //           'group flex items-center rounded-sm px-3 py-3 text-lg font-medium hover:bg-accent backdrop-blur-2xl hover:scale-[1.02] hover:text-accent-foreground transition-all',
  //           pathname === item.href ? "bg-accent" : "bg-transparent",
  //         )}>
  //           <item.icon className="mr-2 h-4 w-4 text-primary"/>
  //           <span>{item.name}</span>
  //         </span>
  //       </Link>

  //   ))}
  // </nav>
  <nav className="grid items-start gap-2">
  {navItems.map((item, i) => (
    // Check user role before rendering the link
    // Only render the Admin link for users with accountType "admin"
    (item.href === '/dashboard/admin' && accountType === 'Admin') ? (
      <Link key={i} href={item.href}>
        <span
          className={cn(
            'group flex items-center rounded-sm px-3 py-3 text-lg font-medium hover:bg-accent backdrop-blur-2xl hover:scale-[1.02] hover:text-accent-foreground transition-all',
            pathname === item.href ? 'bg-accent' : 'bg-transparent',
          )}
        >
          <item.icon className="mr-2 h-4 w-4 text-primary" />
          <span>{item.name}</span>
        </span>
      </Link>
    ) : (
      // Render other links without checking accountType
      <Link key={i} href={item.href}>
        <span
          className={cn(
            'group flex items-center rounded-sm px-3 py-3 text-lg font-medium hover:bg-accent backdrop-blur-2xl hover:scale-[1.02] hover:text-accent-foreground transition-all',
            pathname === item.href ? 'bg-accent' : 'bg-transparent',
          )}
        >
          <item.icon className="mr-2 h-4 w-4 text-primary" />
          <span>{item.name}</span>
        </span>
      </Link>
    )
  ))}
</nav>
);
};

export default DashboardNav