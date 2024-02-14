import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/app/lib/db";
import { Edit, File } from "lucide-react";
import { Card } from "@/components/ui/card";
import { revalidatePath } from "next/cache";
import { DialogDemo } from "@/app/components/DeleteNoteModal";


async function getData(userId: string) {
  // noStore();
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
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



const DashboardPage = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData(user?.id as string);


  return (
    <div className="grid items-start gap-y-8 mb-5z">
    <div className="flex items-center justify-between px-2 flex-col sm:flex-row">
      <div className="grid gap-1">
        <h1 className="text-3xl md:text-4xl text-center sm:text-start">Your Notes</h1>
        <p className="text-lg text-muted-foreground">
          Here you can see and create new notes
        </p>
      </div>

   
        <Button className="mt-7 sm:mt-0 " asChild>
          <Link href="/dashboard/new">Create a new Note</Link>
        </Button>

    </div>

    {data?.Notes.length == 0 ? (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <File className="w-10 h-10 text-primary" />
        </div>

        <h2 className="mt-6 text-xl font-semibold">
          You dont have any notes created
        </h2>
        <p className="mb-8 mt-2 text-center text-sm leading-6 text-muted-foreground max-w-sm mx-auto">
          You currently dont have any notes. please create some so that you
          can see them right here.
        </p>
      </div>
    ) : (
      <div className="flex flex-col gap-y-4">
        {data?.Notes.map((item) => (
          <Card
            key={item.id}
            className="flex items-center justify-between p-4"
          >
            <div className="flex items-center justify-between w-full mr-0 sm:mr-10">
              <div>
              <h2 className="font-semibold text-xl text-primary">
                {item.title}
              </h2>
              <h2 className="text-sm text-card-foreground">
                {item.description}
              </h2>
              <p>
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
            <div className="flex gap-x-4">
              <Link href={`/dashboard/new/${item.id}`}>
                <Button variant="outline" size="icon">
                  <Edit className="w-4 h-4" />
                </Button>
              </Link>
              {/* <form action={DialogDemo}>
                <input type="hidden" name="noteId" value={item.id} />
                <TrashDelete />
              </form> */}
              <DialogDemo />
            </div>
          </Card>
        ))}
      </div>
    )}
  </div>
);
}

export default DashboardPage