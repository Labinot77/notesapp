import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { SelectSeparator } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

async function getData() {
  // noStore();
  const data = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
      },
  });

  return data;
}


const OtherProfiles = async ({params}: {params: { id: string }}) => 
{
  const data = await getData()

  
  return (
    <div className="flex flex-col items-start gap-y-8 mb-5">
    <div className="flex items-center w-full justify-between px-2 flex-col sm:flex-row">
      <div className="grid gap-1">
        <h1 className="text-3xl md:text-4xl text-center sm:text-start">Profiles</h1>
        <p className="text-lg text-muted-foreground">
          Here you can search for other peoples profiles
        </p>
      </div>

   
    </div >
    <div className="flex px-3 w-96">
        <Input
         className="w-full"
         placeholder="Pora Levsko" />
    </div>
    <Separator className="" />
    <h1>asdsadsad</h1>
    </div>
  )
}

export default OtherProfiles