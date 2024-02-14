'use client'

import { navItems } from "@/constants"
import { cn } from "@/lib/utils"
import { revalidatePath } from "next/cache"
import Link from "next/link"
import { usePathname } from "next/navigation"
import prisma from "../lib/db"




const DashboardNav = () => {
  const pathname = usePathname()
  return (
    <nav className='grid items-start gap-2'>
      {navItems.map((item, i) => (
        <Link
        key={i}
        href={item.href}>
          <span className={cn(
            'group flex items-center rounded-sm px-3 py-3 text-lg font-medium hover:bg-accent hover:text-accent-foreground', pathname === item.href ? (
              "bg-accent"
            ) : (
              "bg-transparent"
            )
          )}>
        <item.icon className="mr-2 h-4 w-4 text-primary"/>
          <span>{item.name}</span>
          </span>
        </Link>
      ))}
    </nav>
  )
}

export default DashboardNav