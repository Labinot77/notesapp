"use client"

import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import React, { useState } from 'react'

interface DataTypes {
    data: Array<{ // Define the type of data prop
      id: string;
      accountType: string
      name: string | undefined | null;
      email: string;
      image: string;
    }>;
  };


const InputMenu = ({ data }: DataTypes) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.toLowerCase();
    setSearchValue(inputValue);
  };

  // Filter data based on the searchValue
  const filteredData = data.filter(
    (item: any) => item.email.toLowerCase().includes(searchValue)
  );

  return (
    <>
      <div className="flex px-3 w-full">
        <Input placeholder='John Doe' onChange={(e) => handleSearch(e)}/>
      </div>
      <Separator/>
      {filteredData.map((item: any) => (
       <Card className="w-full flex p-2 items-center">
         <Avatar className='p-1 h-20 w-20 bg-accent rounded-full'>
              <AvatarImage className="rounded-full" src={item.image} alt=''/>
            </Avatar>
       <CardHeader>
         <CardTitle>{item.name}</CardTitle>
         <CardDescription>{item.email}</CardDescription>
       </CardHeader>
       <CardFooter className="flex justify-between">
         <Link href={`/dashboard/profiles/${item.id}`}>Message</Link>
       </CardFooter>
     </Card>
    ))} 
    </>
  )
}

export default InputMenu