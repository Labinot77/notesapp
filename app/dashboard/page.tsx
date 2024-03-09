import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import { DialogDemo } from "../components/DeleteNoteModal";
import Link from "next/link";
import { Edit } from "lucide-react";
import { Card } from "@/components/ui/card";
import prisma from "../lib/db";

async function getData(userId: string) {
  // noStore();
  const data = await prisma.user.findUnique({
    where: {
        id: userId
    },
    select: {
      email: true,
      name: true,
      Notes: {
          select: {
            title: true,
            id: true,
            description: true,
            createdAt: true,
            type: true
            },
          orderBy: {
            createdAt: "desc",
          },
        }
      },
  });

  return data;
}


const Home = async ({ 
  email, 
  id, 
  firstName, 
  lastName, 
  profileImage
}:{ 
  email: string, 
  id: string, 
  firstName: string | undefined | null,
  lastName: string | undefined | null,
  profileImage: string | undefined | null,}) => {
    const { getUser } = getKindeServerSession()
    const user = await getUser()
    const data = await getData(user?.id as string);

  return (
    <section>
      <div className='flex flex-col backdrop-blur-lg p-3 rounded-2xl w-full'>
        <div className="flex-col flex sm:flex-row justify-between ">
          <div className="flex space-x-7">
        <Avatar className='p-1 h-32 w-32 bg-accent rounded-full'>
              <AvatarImage className="rounded-full" src={user?.picture as string} alt=''/>
              <AvatarFallback>
                <Image
                src='/pfp.jpg'
                alt="asdsa"
                fill/>
              </AvatarFallback>
            </Avatar>
        <div className="mt-3 flex flex-col space-y-1">
        <h2 className="text-3xl">{data?.name}</h2>
        <p className="text-base text-muted-foreground">{user?.email}</p>
        </div>
          </div>
        <div>
          <Link
          href="/dashboard/settings">
          <Button
            className="mt-5"
            >
            Edit Profile
          </Button>
          </Link>
        </div>
        </div>
        <Separator className="mt-5" />

        <div className="mt-10 flex flex-col gap-y-4">
        {data?.Notes.map((item) => (
          <Card
            key={item.id}
            className="flex items-center justify-between p-4 cursor-pointer"
          >
            <div className="flex items-center justify-between w-full mr-0 sm:mr-10">
              <div>
              <h2 className="font-semibold text-xl text-primary">
                {item.title}
              </h2>
              <h2 className="text-base text-card-foreground">
                {item.description}
              </h2>
              <p className="text-card-foreground text-sm">
                {new Intl.DateTimeFormat("en-US", {
                  dateStyle: "full",
                }).format(new Date(item.createdAt))}
              </p>
              </div>

                <div className="p-2 bg-primary rounded-full">
              <p className="text-slate-100 text-xs">
                {item.type}
              </p>
                </div>
              </div>
          </Card>
        ))}
      </div>
  </div>
    </section>
  )
}

export default Home