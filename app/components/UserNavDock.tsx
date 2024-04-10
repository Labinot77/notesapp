"use client"

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import React from 'react'
  import Link from 'next/link'
import { navItems } from '@/constants'
import { DoorClosed } from 'lucide-react'
import {
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import Image from 'next/image'
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from '../lib/db'
import { toast } from '@/components/ui/use-toast'


const UserNavDock = ({data}: {data: { image: string, name: string, email: string,}}) => {

  return (
      <DropdownMenu>
        <DropdownMenuTrigger  asChild>
          <Button variant="ghost" className='relative h-10 w-10 rounded-full'>
          <div className=' hover:p-[2px] hover: rounded-full transition-all'>
            <Avatar className='h-10 w-10 rounded-full '>
              <AvatarImage src={data?.image as string} alt=''/>
              <AvatarFallback>
                <Image
                fill
                alt="asda"
                src="/pfp.jpg"/>
                </AvatarFallback>
            </Avatar>
                </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56' align='end' forceMount>
          <DropdownMenuLabel>
            <div className='flex flex-col space-y-1'> 
              <p className='text-sm font-medium leading-none'>{data?.name}</p>
              <p className='text-xs leading-none text-muted-foreground'>{data?.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator/>
          <DropdownMenuGroup>
            {navItems.map((item, i) => (

              <DropdownMenuItem asChild key={i}>
                <Link
                href={item.href}
                className='w-full flex justify-between items-center cursor-pointer'>
                  {item.name}
                  <span><item.icon className='w-4 h-4'/></span>
                </Link>

              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator/>
          <DropdownMenuItem className='w-full flex justify-between items-center' asChild>
            <LogoutLink onClick={() => {
        toast({
          title: "Logged out"
        })}}>
              Logout{""}
              <span>
                <DoorClosed className='w-4 h-4'/>
                </span>
            </LogoutLink>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

  )
}

export default UserNavDock