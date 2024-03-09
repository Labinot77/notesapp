import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { SelectSeparator } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import InputMenu from "@/app/components/OtherProfiles";

async function getData(loggedInUserId: any) {
  const data = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      accountType: true,
      image: true
    },
    where: {
      id: {
        not: loggedInUserId,
      },
    },
  });

  return data;
}

async function getForUserData(userId: any) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      accountType: true,
      image: true
    },
  });

  return data;
}


  
const OtherProfiles = async () => {
  const {getUser} = getKindeServerSession()
  const user = await getUser()
  const userData = await getForUserData(user?.id as string)
  const loggedInUserId = user?.id;

  const data = await getData(loggedInUserId)

  return (
    <div className="flex flex-col items-start p-1 backdrop:blur-2xl rounded-lg gap-y-8 mb-5">
    <div className="flex items-center w-full justify-between px-2 flex-col sm:flex-row">
      <div className="grid gap-1">
        <h1 className="text-3xl md:text-4xl text-center sm:text-start">Profiles</h1>
        <p className="text-lg text-muted-foreground">
          Here you can search for other peoples profiles
        </p>
      </div>
    </div >
    <InputMenu userData={userData} data={data}/>
    </div>
  )
}

export default OtherProfiles